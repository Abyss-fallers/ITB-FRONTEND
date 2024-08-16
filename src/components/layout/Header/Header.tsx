'use client'

import { initializeAuth } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Header.module.css'

export const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  // Убедитесь, что состояние инициализируется один раз
  useEffect(() => {
    const token = Cookies.get('token')
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    dispatch(initializeAuth())

    // Если есть токен или состояние в localStorage указывает на авторизацию
    if (token || loggedIn) {
      dispatch(initializeAuth())
    }
  }, [dispatch])

  // Прямое использование состояния isLoggedIn
  return (
    <header className={styles.header}>
      <ul className={styles.header__buttons}>
        <li>
          <Link href="/make-order">Сделать заказ</Link>
        </li>
        {!isLoggedIn && (
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
