import Image from 'next/image'
import { useState, useEffect } from 'react'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'

const NavbarLandingPage = () => {
  const [currentRoute, setCurrentRoute] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentRoute(window.location.pathname)
    }
  }, [currentRoute])

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt='Logo' width={136} />
      </div>

      <div className={styles.optionsContainer}>
        <div className={currentRoute == '/' ? styles.selectedOption : styles.option} onClick={() => window.open('/', '_self')}>Oceano</div>

        <div className={currentRoute == '/about' ? styles.selectedOption : styles.option} onClick={() => window.open('/about', '_self')}>Sobre</div>

        <div className={currentRoute == '/discounts' ? styles.selectedOption : styles.option} onClick={() => window.open('/discounts', '_self')}>Marketplace</div>
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.loginButton} onClick={() => window.open('/login', '_self') }>Login</div>

        <div className={styles.registerButton} onClick={() => window.open('/register', '_self')}>Crie sua conta</div>
      </div>
    </div>
  )
}

export default NavbarLandingPage
