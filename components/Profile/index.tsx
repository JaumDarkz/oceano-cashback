import Image from 'next/image'

import Navbar from '../Navbar'

import styles from './styles.module.scss'

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>
    </div>
  )
}

export default ProfilePage