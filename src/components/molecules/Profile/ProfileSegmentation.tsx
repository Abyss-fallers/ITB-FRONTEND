'use client'

import { useState } from 'react'
import { Certification, Education, Language, Skill } from './interfaces'
import styles from './ProfileSegmentation.module.css'

export const ProfileSegmentation: React.FC = () => {
  const [isEditing, setIsEditing] = useState({
    description: false,
    languages: false,
    skills: false,
    education: false,
    certification: false,
  })

  const [description, setDescription] = useState<string>('')
  const [languages, setLanguages] = useState<Language[]>([
    { name: 'English', level: 'Basic' },
  ])
  const [skills, setSkills] = useState<Skill[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [certification, setCertification] = useState<Certification[]>([])

  const toggleEdit = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <>
      <div className={styles.container}>
        <h3>Description</h3>
        {isEditing.description ? (
          <div className={styles.edit__container}>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={updateDescription}
            />
            <button
              className={styles.button}
              onClick={() => toggleEdit('description')}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <p>{description || 'Add your description.'}</p>
            <button
              className={styles.button}
              onClick={() => toggleEdit('description')}
            >
              Edit Description
            </button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h3>Languages</h3>
        {isEditing.languages ? (
          <div className={styles.edit__container}>
            <input placeholder="Language" />
            <input placeholder="Level" />
            <button
              className={styles.add__button || styles.button}
              onClick={() => toggleEdit('languages')}
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            {languages.map((language, index) => (
              <p key={index}>
                {language.name} - {language.level}
              </p>
            ))}
            <button
              className={styles.button}
              onClick={() => toggleEdit('languages')}
            >
              Add New
            </button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h3>Skills</h3>
        {isEditing.skills ? (
          <div className={styles.edit__container}>
            <input placeholder="Skill" />
            <input placeholder="Experience Level" />
            <button
              className={styles.add__button || styles.button}
              onClick={() => toggleEdit('skills')}
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            <p>Add your Skills.</p>
            <button
              className={styles.button}
              onClick={() => toggleEdit('skills')}
            >
              Add New
            </button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h3>Education</h3>
        {isEditing.education ? (
          <div className={styles.edit__container}>
            <input placeholder="Country" />
            <input placeholder="University" />
            <input placeholder="Title" />
            <input placeholder="Major" />
            <input placeholder="Year" />
            <button
              className={styles.add__button || styles.button}
              onClick={() => toggleEdit('education')}
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            <p>Add your Education.</p>
            <button
              className={styles.button}
              onClick={() => toggleEdit('education')}
            >
              Add New
            </button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h3>Certification</h3>
        {isEditing.certification ? (
          <div className={styles.edit__container}>
            <input placeholder="Certificate" />
            <input placeholder="Certified From" />
            <input placeholder="Year" />
            <button
              className={styles.add__button || styles.button}
              onClick={() => toggleEdit('certification')}
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            <p>Add your Certification.</p>
            <button
              className={styles.button}
              onClick={() => toggleEdit('certification')}
            >
              Add New
            </button>
          </div>
        )}
      </div>
    </>
  )
}
