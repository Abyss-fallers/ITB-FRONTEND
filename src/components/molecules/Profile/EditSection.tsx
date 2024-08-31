import Atom from '@/components/atoms'
import { handleFormKeyDown } from '@/utils/handleFormKeyDown'
import React from 'react'
import styles from './ProfileSegmentation.module.css'
import { EditSectionProps } from './interfaces'

const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const EditSection: React.FC<EditSectionProps> = ({
  label,
  items,
  fieldNames,
  fieldLabels,
  stateSetter,
  isEditMode,
  onSave,
  toggleEdit,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: string,
  ) => {
    const value = e.target.value
    stateSetter((prev) => {
      const newState = [...prev]
      newState[index] = { ...newState[index], [field]: value }
      return newState
    })
  }

  const renderInputFields = () => (
    <form
      onKeyDown={(e) => handleFormKeyDown(e, onSave)}
      onSubmit={(e) => e.preventDefault()}
      className={styles.edit__container}
    >
      {items.map((item, index) => (
        <div key={index}>
          {fieldNames.map((field, fieldIndex) => (
            <Atom.InputField
              key={field}
              id={`${label.toLowerCase()}-${field}`}
              label={fieldLabels[fieldIndex]}
              placeholder={fieldLabels[fieldIndex]}
              value={item[field]}
              onChange={(e) => handleInputChange(e, index, field)}
              onBlur={() => {}}
              error={null}
              touched={false}
              type={field === 'level' ? 'select' : 'text'}
              options={field === 'level' ? languageLevels : []}
            />
          ))}
        </div>
      ))}
      <Atom.Button variant="primary" onClick={onSave} type="submit">
        Сохранить
      </Atom.Button>
    </form>
  )

  const renderDisplayFields = () => {
    const allFieldsFilled = items.every((item) =>
      fieldNames.every((field) => item[field] !== '' && item[field] !== 0),
    )

    return (
      <div>
        {allFieldsFilled ? (
          <>
            {items.map((item, index) => (
              <p key={index}>
                {fieldNames
                  .map((field) => item[field])
                  .filter((value) => value !== '' && value !== 0)
                  .join(' - ')}
              </p>
            ))}
            <Atom.Button variant="primary" onClick={toggleEdit} type="button">
              Редактировать
            </Atom.Button>
          </>
        ) : (
          <>
            <p>Добавьте ваши {label.toLowerCase()}.</p>
            <Atom.Button variant="primary" onClick={toggleEdit} type="button">
              Добавить
            </Atom.Button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h3>{label}</h3>
      {isEditMode ? renderInputFields() : renderDisplayFields()}
    </div>
  )
}

export default EditSection
