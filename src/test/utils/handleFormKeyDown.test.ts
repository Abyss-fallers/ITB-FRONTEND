import { handleFormKeyDown } from '../../utils/handleFormKeyDown'

describe('handleFormKeyDown', () => {
  it('should call onSave when Enter key is pressed', () => {
    const onSave = jest.fn()
    const event = {
      key: 'Enter',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLFormElement>

    handleFormKeyDown(event, onSave)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(onSave).toHaveBeenCalled()
  })

  it('should not call onSave when other keys are pressed', () => {
    const onSave = jest.fn()
    const event = {
      key: 'Escape',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLFormElement>

    handleFormKeyDown(event, onSave)

    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(onSave).not.toHaveBeenCalled()
  })
})
