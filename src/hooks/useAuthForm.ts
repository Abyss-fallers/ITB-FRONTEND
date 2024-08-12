'use client'

import { useValidation } from '@/hooks/useValidation'
import { authService, AuthType } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useAuthForm = (
  authType: AuthType,
  formValues: Record<string, string>,
) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const router = useRouter()

  const {
    validateForm,
    emailError,
    passwordError,
    fullNameError,
    confirmPasswordError,
  } = useValidation(
    formValues.email || '',
    formValues.password || '',
    formValues.fullName || '',
    formValues.confirmPassword || '',
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
      await authService(authType, formValues)
      setIsSubmitted(true)
      router.push('/dashboard')
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
