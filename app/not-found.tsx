import styles from '@/styles/not-found.module.css'
import Image from 'next/image'

const NotFound = () => (
  <main className={styles.main}>
    <h1>четыре ноль четыре</h1>
    <Image
      src="/yomayo.jpeg"
      alt="Где я?"
      loading="lazy"
      width={586}
      height={339}
    />
  </main>
)

export default NotFound
