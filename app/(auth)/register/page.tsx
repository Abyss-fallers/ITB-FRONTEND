'use client'

import { useValidation } from '@/hooks/useValidation'
import { registerService } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '~/styles/Auth.module.css'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [fullNameTouched, setFullNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

  const router = useRouter()

  const {
    validateForm,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  } = useValidation(email, password, fullName, confirmPassword)

  useEffect(() => {
    if (
      fullNameTouched ||
      emailTouched ||
      passwordTouched ||
      confirmPasswordTouched
    ) {
      setIsFormValid(validateForm())
    }
  }, [
    fullName,
    email,
    password,
    confirmPassword,
    validateForm,
    fullNameTouched,
    emailTouched,
    passwordTouched,
    confirmPasswordTouched,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)
    setSubmissionError('')

    try {
      await registerService(fullName, email, password)
      setIsSubmitted(true)
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

  useEffect(() => {
    if (isSubmitted) {
      router.push('/dashboard')
    }
  }, [isSubmitted, router])

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
        <div className={styles.field}>
          <label htmlFor="full-name">Полное имя</label>
          <input
            id="full-name"
            placeholder="Иван Иванов"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              setFullNameTouched(true)
            }}
            onBlur={() => setFullNameTouched(true)}
            required
            autoComplete="name"
          />
          {fullNameTouched && fullNameError && (
            <span className={styles.error}>{fullNameError}</span>
          )}
        </div>
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
            onBlur={() => setEmailTouched(true)}
            required
            autoComplete="email"
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
            onBlur={() => setPasswordTouched(true)}
            required
            autoComplete="new-password"
          />
          {passwordTouched && passwordError && (
            <span className={styles.error}>{passwordError}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="confirm-password">Подтвердите пароль</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setConfirmPasswordTouched(true)
            }}
            onBlur={() => setConfirmPasswordTouched(true)}
            required
            autoComplete="new-password"
          />
          {confirmPasswordTouched && confirmPasswordError && (
            <span className={styles.error}>{confirmPasswordError}</span>
          )}
        </div>
        {submissionError && (
          <div className={styles.error}>{submissionError}</div>
        )}
        {isSubmitted && (
          <div className={styles.success}>Регистрация успешна!</div>
        )}
        <button
          type="submit"
          className={styles.button}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? <div className={styles.loader}></div> : 'Регистрация'}
        </button>
      </form>
    </div>
  )
}

export default Register
