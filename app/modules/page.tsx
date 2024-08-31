'use client'

import Atom from '@/components/atoms'
import { Bell } from 'lucide-react'
import { useState } from 'react'

const ModulesPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [touched, setTouched] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    setTouched(true)
  }

  return (
    <div>
      <section>
        <h3>Размеры кнопок</h3>
        <Atom.Button size="small" variant="primary" type="button">
          Small Primary
        </Atom.Button>
        <Atom.Button size="medium" variant="primary" type="button">
          Medium Primary
        </Atom.Button>
        <Atom.Button size="large" variant="primary" type="button">
          Large Primary
        </Atom.Button>

        <h3>Варианты кнопок</h3>
        <Atom.Button size="medium" variant="primary" type="button">
          Primary
        </Atom.Button>
        <Atom.Button size="medium" variant="secondary" type="button">
          Secondary
        </Atom.Button>
        <Atom.Button size="medium" variant="danger" type="button">
          Danger
        </Atom.Button>

        <h3>Кнопки с иконками</h3>
        <Atom.Button
          iconOnly
          variant="iconOnly"
          aria-label="Notification"
          title="Notification"
          type="button"
        >
          <Bell />
        </Atom.Button>

        <h3>Заблокированная кнопка</h3>
        <Atom.Button variant="primary" disabled type="button">
          Disabled Button
        </Atom.Button>
      </section>
      <section>
        <h2>Текстовые поля</h2>
        <Atom.InputField
          id="example"
          label="Example Input"
          placeholder="Enter some text"
          value={inputValue}
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
          }
          onBlur={handleInputBlur}
          error={touched && inputValue === '' ? 'This field is required' : null}
          touched={touched}
        />
      </section>
    </div>
  )
}

export default ModulesPage
