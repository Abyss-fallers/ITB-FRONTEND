import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validateName,
  validatePassword,
} from '../../utils/validation'

describe('validateName', () => {
  it('non-alphabetic characters', () => {
    expect(validateName('Ваня123')).toBe(
      'Имя должно содержать только кириллические буквы и пробелы',
    )
  })

  it('<2 characters', () => {
    expect(validateName('И')).toBe('Имя должно быть не короче 2 символов')
  })

  it('4 characters', () => {
    expect(validateName('Иван')).toBe('')
  })

  it('2 characters', () => {
    expect(validateName('Як')).toBe('')
  })

  it('<2 characters with space', () => {
    expect(validateName('  J  ')).toBe(
      'Имя должно содержать только кириллические буквы и пробелы',
    )
  })
})

describe('validateEmail', () => {
  it('email format is invalid', () => {
    expect(validateEmail('invalidemail')).toBe('Неверный формат почты')
  })

  it('email format is valid', () => {
    expect(validateEmail('example@example.com')).toBe('')
  })

  it('special characters', () => {
    expect(validateEmail('test.email+alex@leetcode.com')).toBe('')
  })
})

describe('validatePassword', () => {
  it('<7 characters', () => {
    expect(validatePassword('short')).toBe(
      'Пароль должен быть не короче 7 символов',
    )
  })

  it('correct password', () => {
    expect(validatePassword('password')).toBe('')
  })
})

describe('validateConfirmPassword', () => {
  it('do not match', () => {
    expect(validateConfirmPassword('password', 'differentpassword')).toBe(
      'Пароли не совпадают',
    )
  })

  it('passwords match', () => {
    expect(validateConfirmPassword('password', 'password')).toBe('')
  })
})

describe('validateFullName', () => {
  it('name without surname', () => {
    expect(validateFullName('Иван')).toBe(
      'Полное имя должно содержать имя и фамилию, разделенные пробелом',
    )
  })

  it('name + surname + some extra', () => {
    expect(validateFullName('Иван Иванович Иванов')).toBe(
      'Полное имя должно содержать имя и фамилию, разделенные пробелом',
    )
  })

  it('name <2', () => {
    expect(validateFullName('И Иванов')).toBe(
      'Имя должно быть не короче 2 символов',
    )
  })

  it('surname <2', () => {
    expect(validateFullName('Иван И')).toBe(
      'Фамилия должна быть не короче 2 символов',
    )
  })

  it('name = 2; surname = 2', () => {
    expect(validateFullName('Ив Ан')).toBe('')
  })

  it('correct fullname', () => {
    expect(validateFullName('Иван Иванов')).toBe('')
  })
})
