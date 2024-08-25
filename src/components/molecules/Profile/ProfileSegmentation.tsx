'use client'

import Atom from '@/components/atoms'
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
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('description')}
              type="button"
            >
              Update
            </Atom.Button>
          </div>
        ) : (
          <div>
            <p>{description || 'Add your description.'}</p>
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('description')}
              type="button"
            >
              Edit Description
            </Atom.Button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h3>Languages</h3>
        {isEditing.languages ? (
          <div className={styles.edit__container}>
            <input placeholder="Language" />
            <input placeholder="Level" />
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('languages')}
              type="button"
            >
              Add
            </Atom.Button>
          </div>
        ) : (
          <div>
            {languages.map((language, index) => (
              <p key={index}>
                {language.name} - {language.level}
              </p>
            ))}
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('languages')}
              type="button"
            >
              Add New
            </Atom.Button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <h3>Skills</h3>
        {isEditing.skills ? (
          <div className={styles.edit__container}>
            <input placeholder="Skill" />
            <input placeholder="Experience Level" />
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('skills')}
              type="button"
            >
              Add
            </Atom.Button>
          </div>
        ) : (
          <div>
            <p>Add your Skills.</p>
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('skills')}
              type="button"
            >
              Add New
            </Atom.Button>
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
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('education')}
              type="button"
            >
              Add
            </Atom.Button>
          </div>
        ) : (
          <div>
            <p>Add your Education.</p>
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('education')}
              type="button"
            >
              Add New
            </Atom.Button>
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
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('certification')}
              type="button"
            >
              Add
            </Atom.Button>
          </div>
        ) : (
          <div>
            <p>Add your Certification.</p>
            <Atom.Button
              variant="primary"
              onClick={() => toggleEdit('certification')}
              type="button"
            >
              Add New
            </Atom.Button>
          </div>
        )}
      </div>
    </>
  )
}
