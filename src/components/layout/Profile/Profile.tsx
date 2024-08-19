import Components from '@/components/index'
import styles from '~/styles/profile/Profile.module.css'

interface ProfileProps {
  name: string
}

const Profile: React.FC<ProfileProps> = ({ name }) => {
  return (
    <>
      <article className={styles.profile__container}>
        <Components.ProfileHeader name={name} />
        <button className={styles.preview__button}>Preview ITB Profile</button>
        <Components.ProfileInfoSection />
      </article>
      <article className={styles.profile__container}>
        <Components.ProfileSegmentation />
      </article>
    </>
  )
}

export default Profile
