'use client'
import Atom from '@/components/atoms'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useFormField } from '@/hooks/useFormField'
import AuthPageTemplate from '../common/AuthPageTemplate'

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

  const formFields = (
    <>
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
        onChange={(e) =>
          passwordField.handleChange(e as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={(e) =>
          passwordField.handleBlur(e as React.FocusEvent<HTMLInputElement>)
        }
        autoComplete="current-password"
      />
    </>
  )

  return (
    <AuthPageTemplate
      title="Вход"
      subtitle="Войдите в свой аккаунт"
      formFields={formFields}
      submissionError={submissionError}
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      onSubmit={handleFormSubmit}
    />
  )
}

export default Login
