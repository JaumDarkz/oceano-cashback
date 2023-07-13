import Image from 'next/image'
import { useState } from 'react'

import Navbar from '../Navbar'

import styles from './styles.module.scss'

const DiscountsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.sidebarContainer}>

        </div>

        <div className={styles.commerceContainer}>

        </div>
      </div>
    </div>
  )
}

export default DiscountsPage