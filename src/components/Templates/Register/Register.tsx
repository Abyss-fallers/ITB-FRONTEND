'use client'
import Atom from '@/components/atoms'
import { useAuthForm } from '@/hooks/useAuthForm'
import { useFormField } from '@/hooks/useFormField'
import AuthPageTemplate from '../common/AuthPageTemplate'

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  const formFields = (
    <>
      <Atom.InputField
        id="full-name"
        label="Полное имя"
        placeholder="Иван Иванов"
        value={fullNameField.value}
        error={fullNameError}
        touched={fullNameField.touched}
        onChange={(e) =>
          fullNameField.handleChange(e as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={(e) =>
          fullNameField.handleBlur(e as React.FocusEvent<HTMLInputElement>)
        }
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
        autoComplete="new-password"
      />
      <Atom.InputField
        id="confirm-password"
        label="Подтвердите пароль"
        type="password"
        value={confirmPasswordField.value}
        error={confirmPasswordError}
        touched={confirmPasswordField.touched}
        onChange={(e) =>
          confirmPasswordField.handleChange(
            e as React.ChangeEvent<HTMLInputElement>,
          )
        }
        onBlur={(e) =>
          confirmPasswordField.handleBlur(
            e as React.FocusEvent<HTMLInputElement>,
          )
        }
        autoComplete="new-password"
      />
    </>
  )

  return (
    <AuthPageTemplate
      title="Регистрация"
      subtitle="Создайте аккаунт"
      formFields={formFields}
      submissionError={submissionError}
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      onSubmit={handleFormSubmit}
    />
  )
}

export default Register
