const cyrillicNameRegex = /^[а-яА-Я\s]+$/

const validateSingleCyrillicName = (
  name: string,
  isFirstName: boolean,
): string => {
  if (!cyrillicNameRegex.test(name)) {
    return 'Имя должно содержать только кириллические буквы и пробелы'
  }
  if (name.trim().length < 2) {
    return isFirstName
      ? 'Имя должно быть не короче 2 символов'
      : 'Фамилия должна быть не короче 2 символов'
  }
  return ''
}

export const validateName = (name: string): string => {
  return validateSingleCyrillicName(name, true)
}

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Неверный формат почты'
  }
  return ''
}

export const validatePassword = (password: string): string => {
  if (password.length < 7) {
    return 'Пароль должен быть не короче 7 символов'
  }
  return ''
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (password !== confirmPassword) {
    return 'Пароли не совпадают'
  }
  return ''
}

export const validateFullName = (fullName: string): string => {
  const parts = fullName.trim().split(' ')
  if (parts.length !== 2) {
    return 'Полное имя должно содержать имя и фамилию, разделенные пробелом'
  }
  const [firstName, lastName] = parts

  const firstNameValidation = validateSingleCyrillicName(firstName, true)
  if (firstNameValidation) {
    return firstNameValidation
  }

  const lastNameValidation = validateSingleCyrillicName(lastName, false)
  if (lastNameValidation) {
    return lastNameValidation
  }

  return ''
}
