import styles from '~/styles/profile/Profile.module.css'

export const ProfileInfoSection: React.FC = () => {
  return (
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
  )
}
