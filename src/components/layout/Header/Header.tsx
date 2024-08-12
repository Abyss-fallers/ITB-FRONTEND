'use client'

import { RootState } from '@/redux/store'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styles from './Header.module.css'

export const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}></div>
      <nav>
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
      </nav>
    </header>
  )
}
