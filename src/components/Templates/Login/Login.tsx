'use client'

import Atom from '@/components/atoms'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useFormField } from '@/hooks/useFormField'
import styles from '@/styles/(auth)/Auth.module.css'

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        onSubmit={handleFormSubmit}
        autoComplete="on"
        className={styles.form}
      >
        <Atom.InputField
          id="email"
          label="Email"
          type="email"
          placeholder="example@example.ru"
          value={emailField.value}
          error={emailError}
          touched={emailField.touched}
          onChange={(e) =>
            emailField.handleChange(e as React.ChangeEvent<HTMLInputElement>)
          }
          onBlur={(e) =>
            emailField.handleBlur(e as React.FocusEvent<HTMLInputElement>)
          }
          autoComplete="email"
        />
        <Atom.InputField
          id="password"
          label="Пароль"
          type="password"
          value={passwordField.value}
          error={passwordError}
          touched={passwordField.touched}
          onChange={
            passwordField.handleChange as (
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLSelectElement>,
            ) => void
          }
          onBlur={
            passwordField.handleBlur as (
              e:
                | React.FocusEvent<HTMLInputElement>
                | React.FocusEvent<HTMLSelectElement>,
            ) => void
          }
          autoComplete="current-password"
        />
        {submissionError && (
          <div className={styles.error}>{submissionError}</div>
        )}
        <Atom.Button
          variant="primary"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          Вход
        </Atom.Button>
      </form>
    </div>
  )
}

export default Login
