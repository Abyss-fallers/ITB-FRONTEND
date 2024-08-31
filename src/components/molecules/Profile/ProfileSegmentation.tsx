'use client'

import Atom from '@/components/atoms'
import React, { useState } from 'react'
import EditSection from './EditSection'
import { Certification, Education, Language, Skill } from './interfaces'
import styles from './ProfileSegmentation.module.css'

export const ProfileSegmentation: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const [isEditing, setIsEditing] = useState({
    description: false,
    languages: false,
    skills: false,
    education: false,
    certification: false,
  })

  const [description, setDescription] = useState<string>('')
  const [languages, setLanguages] = useState<Language[]>([
    { name: '', level: '' },
  ])
  const [skills, setSkills] = useState<Skill[]>([{ name: '', experience: '' }])
  const [education, setEducation] = useState<Education[]>([
    { country: '', university: '', title: '', major: '', year: currentYear },
  ])
  const [certification, setCertification] = useState<Certification[]>([
    { certificate: '', certifiedFrom: '', year: currentYear },
  ])

  const toggleEdit = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const saveDescription = () => toggleEdit('description')
  const saveLanguages = () => toggleEdit('languages')
  const saveSkills = () => toggleEdit('skills')
  const saveEducation = () => toggleEdit('education')
  const saveCertification = () => toggleEdit('certification')

  return (
    <>
      <div className={styles.container}>
        <h3>Описание</h3>
        {isEditing.description ? (
          <form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                saveDescription()
              }
            }}
            onSubmit={(e) => e.preventDefault()}
            className={styles.edit__container}
          >
            <Atom.InputField
              id="description"
              label="Описание"
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {}}
              error={null}
              touched={false}
            />
            <Atom.Button
              variant="primary"
              onClick={saveDescription}
              type="submit"
            >
              Сохранить
            </Atom.Button>
          </form>
        ) : (
          <div>
            <p>{description || 'Добавьте ваше описание.'}</p>
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('description')}
              type="button"
            >
              {description ? 'Редактировать описание' : 'Добавить описание'}
            </Atom.Button>
          </div>
        )}
      </div>

      <EditSection
        label="Языки"
        items={languages}
        fieldNames={['name', 'level']}
        fieldLabels={['Язык', 'Уровень']}
        stateSetter={setLanguages}
        isEditMode={isEditing.languages}
        onSave={saveLanguages}
        toggleEdit={() => toggleEdit('languages')}
      />
      <EditSection
        label="Навыки"
        items={skills}
        fieldNames={['name', 'experience']}
        fieldLabels={['Навык', 'Уровень опыта']}
        stateSetter={setSkills}
        isEditMode={isEditing.skills}
        onSave={saveSkills}
        toggleEdit={() => toggleEdit('skills')}
      />
      <EditSection
        label="Образование"
        items={education}
        fieldNames={['country', 'university', 'title', 'major', 'year']}
        fieldLabels={[
          'Страна',
          'Университет',
          'Название',
          'Специальность',
          'Год',
        ]}
        stateSetter={setEducation}
        isEditMode={isEditing.education}
        onSave={saveEducation}
        toggleEdit={() => toggleEdit('education')}
      />
      <EditSection
        label="Сертификаты"
        items={certification}
        fieldNames={['certificate', 'certifiedFrom', 'year']}
        fieldLabels={['Сертификат', 'Выдан', 'Год']}
        stateSetter={setCertification}
        isEditMode={isEditing.certification}
        onSave={saveCertification}
        toggleEdit={() => toggleEdit('certification')}
      />
    </>
  )
}
