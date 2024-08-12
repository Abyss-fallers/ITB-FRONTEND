'use client'

import Layout from '@/components/layout/index'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useFormField } from '@/hooks/useFormField'
import React from 'react'
import styles from '~/styles/Auth.module.css'

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
        <Layout.InputField
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
        <Layout.InputField
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
        <Layout.InputField
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
        <Layout.InputField
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
