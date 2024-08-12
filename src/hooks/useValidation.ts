import { useState } from 'react'

import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from '@/utils/validation'

export const useValidation = (
  email: string,
  password: string,
  fullName?: string,
  confirmPassword?: string,
) => {
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [fullNameError, setFullNameError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null)

  const validateEmailField = () => {
    setEmailError(validateEmail(email))
  }

  const validatePasswordField = () => {
    setPasswordError(validatePassword(password))
  }

  const validateFullNameField = () => {
    if (fullName) {
      setFullNameError(validateFullName(fullName))
    } else {
      setFullNameError(null)
    }
  }

  const validateConfirmPasswordField = () => {
    if (confirmPassword !== undefined && password) {
      setConfirmPasswordError(
        validateConfirmPassword(password, confirmPassword),
      )
    } else {
      setConfirmPasswordError(null)
    }
  }

  const validateForm = () => {
    validateEmailField()
    validatePasswordField()
    validateFullNameField()
    validateConfirmPasswordField()

    return (
      !emailError && !passwordError && !fullNameError && !confirmPasswordError
    )
  }

  return {
    validateForm,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  }
}
