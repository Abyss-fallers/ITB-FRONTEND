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
  const router = useRouter()

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
  }, [validateForm]) // Используем validateForm как зависимость

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)
    setSubmissionError('')

    try {
      const data = await authService(authType, formValues)
      dispatch(login())
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
