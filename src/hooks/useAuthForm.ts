'use client'

import { useValidation } from '@/hooks/useValidation'
import { login } from '@/redux/slices/authSlice'
import { authService, AuthType } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useAuthForm = (
  authType: AuthType,
  formValues: Record<string, string>,
) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dispatch = useDispatch()
  const { replace } = useRouter()

  const isRegistration = authType === 'register'

  const {
    validateForm,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  } = useValidation(
    formValues.email,
    formValues.password,
    formValues.fullName,
    formValues.confirmPassword,
    isRegistration,
  )

  useEffect(() => {
    setIsFormValid(validateForm())
  }, [validateForm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)
    setSubmissionError('')

    try {
      const data = await authService(authType, {
        email: formValues.email,
        password: formValues.password,
        ...(isRegistration && {
          fullName: formValues.fullName,
          confirmPassword: formValues.confirmPassword,
        }),
      })

      if (data.accessToken && data.refreshToken) {
        dispatch(
          login({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        )
        setIsSubmitted(true)
        replace('/dashboard')
      } else {
        throw new Error('Токены не были получены')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Submission error:', error.message)
        setSubmissionError(error.message)
      } else {
        setSubmissionError('Неизвестная ошибка.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isFormValid,
    isSubmitting,
    submissionError,
    isSubmitted,
    handleSubmit,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  }
}
