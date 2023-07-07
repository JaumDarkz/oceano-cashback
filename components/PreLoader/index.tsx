import Image from 'next/image'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'

const Preloader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columnContainer}>
        <div className={styles.logoContainer}>
          <Image className={styles.logo} src={logo} alt='Logo' />
        </div>
      </div>
    </div>
  )
}

export default Preloader