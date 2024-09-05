'use client'

import { initializeAuth } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Header.module.css'

export const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const [showLoginOptions, setShowLoginOptions] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') return

      const accessToken = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')

      if (accessToken && refreshToken) {
        try {
          await dispatch(initializeAuth())
          setShowLoginOptions(false)
        } catch (error) {
          console.error('Ошибка инициализации авторизации:', error)
          setShowLoginOptions(true)
        }
      } else {
        setShowLoginOptions(true)
      }
    }

    checkAuth()
  }, [dispatch])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')

      if (accessToken && refreshToken) {
        setShowLoginOptions(false)
      } else {
        setShowLoginOptions(true)
      }
    }
  }, [isLoggedIn])

  if (showLoginOptions === null) {
    return (
      <header className={styles.header}>
        <ul className={styles.header__buttons}>
          <li>
            <Skeleton width={80} height={16} />
          </li>
          <li>
            <Skeleton width={40} height={16} />
          </li>
          <li>
            <Skeleton width={80} height={16} />
          </li>
        </ul>
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <ul className={styles.header__buttons}>
        <li>
          <Link href="/make-order">Сделать заказ</Link>
        </li>
        {(showLoginOptions || !isLoggedIn) && (
          <>
            <li>
              <Link href="/login">Вход</Link>
            </li>
            <li>
              <Link href="/register">Регистрация</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
