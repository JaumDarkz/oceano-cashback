import Image from 'next/image'

import styles from './styles.module.scss'

import bluelogo from '@/public/assets/brand/bluelogo.svg'
import facebook from '@/public/assets/social/facebook.svg'
import xsocial from '@/public/assets/social/twitter.svg'

const LPFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ctaContainer}>
        <div className={styles.cta}>
          <div className={styles.title}>
            Comece Hoje!
          </div>

          <div className={styles.text}>
            Lorem ipsum dolor sit amet. Et quas magni ut tempora architecto ut perspiciatis sint et saepe obcaecati.
          </div>

          <div className={styles.button}>
            Crie sua conta!
          </div>
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.firstRow}>
          <div className={styles.logo}>
            <Image src={bluelogo} alt='Logo' />
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.option} onClick={() => window.open('/discounts', '_self')}>
              Marketplace
            </div>

            <div className={styles.line} />

            <div className={styles.option} onClick={() => window.open('/about', '_self')}>
              Sobre
            </div>

            <div className={styles.line} />

            <div className={styles.option} onClick={() => window.open('/register', '_self')}>
              Crie sua conta!
            </div>
          </div>
        </div>

        <div className={styles.secondRow}>
          <div className={styles.rights}>
            Direitos Autorais © 2024 Oceano. Todos os direitos reservados.
          </div>

          <div className={styles.social}>
            <div className={styles.email}>
              info@oceano.com
            </div>

            <div className={styles.socialButton}>
              <Image src={facebook} alt='Facebook' />
            </div>

            <div className={styles.socialButton}>
            <Image src={xsocial} alt='X' />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LPFooter