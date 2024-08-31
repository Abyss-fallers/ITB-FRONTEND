export const handleFormKeyDown = (
  e: React.KeyboardEvent<HTMLFormElement>,
  onSave: () => void,
) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    onSave()
  }
}
