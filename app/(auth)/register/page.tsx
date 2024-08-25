'use client'

import Atom from '@/components/atoms/index'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useFormField } from '@/hooks/useFormField'
import styles from '@/styles/(auth)/Auth.module.css'

const Register = () => {
  const fullNameField = useFormField('')
  const emailField = useFormField('')
  const passwordField = useFormField('')
  const confirmPasswordField = useFormField('')

  const formValues = {
    fullName: fullNameField.value,
    email: emailField.value,
    password: passwordField.value,
    confirmPassword: confirmPasswordField.value,
  }

  const {
    isFormValid,
    isSubmitting,
    submissionError,
    handleSubmit,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  } = useAuthForm('register', formValues)

  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e)
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт</p>
      </div>
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        autoComplete="on"
      >
        <Atom.InputField
          id="full-name"
          label="Полное имя"
          placeholder="Иван Иванов"
          value={fullNameField.value}
          error={fullNameError}
          touched={fullNameField.touched}
          onChange={fullNameField.handleChange}
          onBlur={fullNameField.handleBlur}
          autoComplete="name"
        />
        <Atom.InputField
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
        <Atom.InputField
          id="password"
          label="Пароль"
          type="password"
          value={passwordField.value}
          error={passwordError}
          touched={passwordField.touched}
          onChange={passwordField.handleChange}
          onBlur={passwordField.handleBlur}
          autoComplete="new-password"
        />
        <Atom.InputField
          id="confirm-password"
          label="Подтвердите пароль"
          type="password"
          value={confirmPasswordField.value}
          error={confirmPasswordError}
          touched={confirmPasswordField.touched}
          onChange={confirmPasswordField.handleChange}
          onBlur={confirmPasswordField.handleBlur}
          autoComplete="new-password"
        />
        {submissionError && (
          <div className={styles.error}>{submissionError}</div>
        )}
        <Atom.Button
          variant="primary"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          Регистрация
        </Atom.Button>
      </form>
    </div>
  )
}

export default Register
