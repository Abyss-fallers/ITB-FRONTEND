'use client'

import Components from '@/components/index'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useFormField } from '@/hooks/useFormField'
import styles from '~/styles/Auth.module.css'

const Login = () => {
  const emailField = useFormField('')
  const passwordField = useFormField('')

  const formValues = {
    email: emailField.value,
    password: passwordField.value,
  }

  const {
    isFormValid,
    isSubmitting,
    submissionError,
    handleSubmit,
    emailError,
    passwordError,
  } = useAuthForm('login', formValues)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSubmit(e)
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>Войдите в свой аккаунт</p>
      </div>
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        autoComplete="on"
      >
        <Components.InputField
          id="email"
          label="Email"
          type="email"
          placeholder="example@example.ru"
          value={emailField.value}
          error={emailError}
          touched={emailField.touched}
          onChange={emailField.handleChange}
          onBlur={emailField.handleBlur}
          autoComplete="email"
        />
        <Components.InputField
          id="password"
          label="Пароль"
          type="password"
          value={passwordField.value}
          error={passwordError}
          touched={passwordField.touched}
          onChange={passwordField.handleChange}
          onBlur={passwordField.handleBlur}
          autoComplete="current-password"
        />
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
