import Molecule from '@/components/molecules'
import styles from '@/styles/profile/Profile.module.css'

interface ProfileProps {
  name: string
}

const Profile: React.FC<ProfileProps> = ({ name }) => {
  return (
    <>
      <article className={styles.profile__container}>
        <Molecule.ProfileHeader name={name} />
        <button className={styles.preview__button}>Preview ITB Profile</button>
        <Molecule.ProfileInfoSection />
      </article>
      <article className={styles.profile__container}>
        <Molecule.ProfileSegmentation />
      </article>
    </>
  )
}

export default Profile
