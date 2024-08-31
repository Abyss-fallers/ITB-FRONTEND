import styles from '@/styles/profile/Profile.module.css'

export const ProfileInfoSection: React.FC = () => {
  return (
    <div className={styles.info__section}>
      <div className={styles.info__row}>
        <span>Страна</span>
        <span>Румыния</span>
      </div>
      <div className={styles.info__row}>
        <span>Дата регистрации</span>
        <span>Авг 2024</span>
      </div>
    </div>
  )
}
