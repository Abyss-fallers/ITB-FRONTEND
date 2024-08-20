import { getInitialLetter } from '../../utils/getInitialLetter'

describe('getInitialLetter', () => {
  it('returns the first letter in uppercase for a full name', () => {
    expect(getInitialLetter('Иван Иванов')).toBe('И')
  })

  it('returns the first letter in uppercase when the name is a single word', () => {
    expect(getInitialLetter('Иван')).toBe('И')
  })

  it('returns an empty string when input is an empty string', () => {
    expect(getInitialLetter('')).toBe('')
  })

  it('returns an empty string when input is null', () => {
    expect(getInitialLetter(null)).toBe('')
  })

  it('returns an empty string when input is undefined', () => {
    expect(getInitialLetter(undefined)).toBe('')
  })

  it('ignores leading spaces and returns the first letter of the name', () => {
    expect(getInitialLetter('  Иван Иванов')).toBe('И')
  })

  it('handles names with digits and special characters correctly', () => {
    expect(getInitialLetter('123Иван Иванов')).toBe('1')
  })

  it('returns the first letter when the name is a single character', () => {
    expect(getInitialLetter('А')).toBe('А')
  })

  it('returns the first letter in uppercase when the input starts with a lowercase letter', () => {
    expect(getInitialLetter('иван')).toBe('И')
  })

  it('returns the first character if it is a special symbol', () => {
    expect(getInitialLetter('#Иван')).toBe('#')
  })
})
