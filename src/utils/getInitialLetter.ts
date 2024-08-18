export const getInitialLetter = (str: string | null | undefined): string => {
  if (str == null || str.trim() === '') return ''
  return str.trim().charAt(0).toUpperCase()
}
