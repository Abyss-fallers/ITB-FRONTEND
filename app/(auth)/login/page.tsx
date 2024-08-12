'use client'

import { useValidation } from '@/hooks/useValidation'
import { login } from '@/redux/slices/authSlice'
import { loginService } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '~/styles/Auth.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const { validateForm, emailError, passwordError } = useValidation(
    email,
    password,
  )

  useEffect(() => {
    if (emailTouched || passwordTouched) {
      setIsFormValid(validateForm())
    }
  }, [email, password, validateForm, emailTouched, passwordTouched])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)
    setSubmissionError('')

    try {
      await loginService(email, password)
      dispatch(login())
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setSubmissionError(error.message)
      } else {
        setSubmissionError('Неизвестная ошибка.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>Войдите в свой аккаунт</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.ru"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailTouched(true)
            }}
            required
            autoComplete="email"
            onBlur={() => setEmailTouched(true)}
          />
          {emailTouched && emailError && (
            <span className={styles.error}>{emailError}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordTouched(true)
            }}
            required
            autoComplete="current-password"
            onBlur={() => setPasswordTouched(true)}
          />
          {passwordTouched && passwordError && (
            <span className={styles.error}>{passwordError}</span>
          )}
        </div>
        {submissionError && (
          <div className={styles.error}>{submissionError}</div>
        )}
        <button
          type="submit"
          className={styles.button}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? <div className={styles.loader}></div> : 'Вход'}
        </button>
      </form>
    </div>
  )
}

export default Login
