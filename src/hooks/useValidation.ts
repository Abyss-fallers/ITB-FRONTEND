import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from '@/utils/validation'
import { useCallback, useState } from 'react'

export const useValidation = (
  email: string,
  password: string,
  fullName?: string,
  confirmPassword?: string,
  isRegistration: boolean = false,
) => {
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [fullNameError, setFullNameError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null)

  const validateEmailField = useCallback((): boolean => {
    const error = validateEmail(email)
    setEmailError(error)
    return !error
  }, [email])

  const validatePasswordField = useCallback((): boolean => {
    const error = validatePassword(password)
    setPasswordError(error)
    return !error
  }, [password])

  const validateFullNameField = useCallback((): boolean => {
    if (fullName) {
      const error = validateFullName(fullName)
      setFullNameError(error)
      return !error
    } else {
      setFullNameError(null)
      return true
    }
  }, [fullName])

  const validateConfirmPasswordField = useCallback((): boolean => {
    if (confirmPassword !== undefined && password) {
      const error = validateConfirmPassword(password, confirmPassword)
      setConfirmPasswordError(error)
      return !error
    } else {
      setConfirmPasswordError(null)
      return true
    }
  }, [confirmPassword, password])

  const validateForm = useCallback((): boolean => {
    const isEmailValid = validateEmailField()
    const isPasswordValid = validatePasswordField()
    const isFullNameValid = isRegistration ? validateFullNameField() : true
    const isConfirmPasswordValid = isRegistration
      ? validateConfirmPasswordField()
      : true

    return (
      isEmailValid &&
      isPasswordValid &&
      isFullNameValid &&
      isConfirmPasswordValid
    )
  }, [
    validateEmailField,
    validatePasswordField,
    validateFullNameField,
    validateConfirmPasswordField,
    isRegistration,
  ])

  return {
    validateForm,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  }
}
