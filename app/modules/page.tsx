import Atom from '@/components/atoms'
import { Bell } from 'lucide-react'

const Modules = () => {
  return (
    <div>
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
        ТЕКСТ БЛЯТЬ
      </Atom.Button>
    </div>
  )
}

export default Modules
