'use client'

import { useState } from 'react'

export const useFormField = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  const [touched, setTouched] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setTouched(true)
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return {
    value,
    touched,
    setValue,
    handleChange,
    handleBlur,
  }
}
