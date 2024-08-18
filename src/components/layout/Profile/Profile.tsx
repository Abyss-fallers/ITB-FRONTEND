import { getInitialLetter } from '@/utils/getInitialLetter'
import styles from '~/styles/profile/Profile.module.css'

interface ProfileProps {
  name: string
}

const Profile: React.FC<ProfileProps> = ({ name }) => {
  const firstLetter = getInitialLetter(name)

  return (
    <div className={styles.profile__container}>
      <div className={styles.profile__header}>
        <div className={styles.avatar}>{firstLetter}</div>
        <h2 className={styles.profile__name}>{name}</h2>
        <span className={styles.new__badge}>NEW</span>
        <span className={styles.username}>@daniil_smith</span>
      </div>

      <button className={styles.preview__button}>Preview ITB Profile</button>

      <div className={styles.info__section}>
        <div className={styles.info__row}>
          <span>From</span>
          <span>Romania</span>
        </div>
        <div className={styles.info__row}>
          <span>Member since</span>
          <span>Aug 2024</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
