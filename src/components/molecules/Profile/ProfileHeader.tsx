import styles from '@/styles/profile/Profile.module.css'
import { getInitialLetter } from '@/utils/getInitialLetter'

interface ProfileHeaderProps {
  name: string
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name }) => {
  const firstLetter = getInitialLetter(name)

  return (
    <div className={styles.profile__header}>
      <div className={styles.avatar}>{firstLetter}</div>
      <h2 className={styles.profile__name}>{name}</h2>
      <span className={styles.new__badge}>Новичок</span>
      <span className={styles.username}>@daniil_smith</span>
    </div>
  )
}
