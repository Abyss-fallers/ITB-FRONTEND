import Atom from '@/components/atoms'
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
        <Atom.Button variant="primary" type="button">
          Preview ITB Profile
        </Atom.Button>
        <Molecule.ProfileInfoSection />
      </article>
      <article className={styles.profile__container}>
        <Molecule.ProfileSegmentation />
      </article>
    </>
  )
}

export default Profile
