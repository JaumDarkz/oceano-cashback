import Image from 'next/image'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'
import facebook from '@/public/assets/social/facebook.svg'
import twitter from '@/public/assets/social/twitter.svg'
import instagram from '@/public/assets/social/instagram.svg'
import linkedin from '@/public/assets/social/linkedin.svg'
import email from '@/public/assets/icons/email.svg'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.image}>
          <Image src={logo} alt='Logo' width={160} />
        </div>
      </div>

      <div className={styles.column}>
        {/*
        <div className={styles.title}>
          Se inscreva
        </div>

        <div className={styles.description}>
          Insira seu e-mail para receber informações importantes.
        </div>

        <div className={styles.emailInput}>
          <input type="text" className={styles.HTMLinput} placeholder='Insira seu endereço de e-mail' />
          <div className={styles.email}>
            <Image src={email} alt='Email' />
          </div>
        </div>
        */}

        <div className={styles.policy}>
          Política de Privacidade
        </div>

        <div className={styles.registered}>
          © 2023 Oceano
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.socialContainer}>
{/*           <div className={styles.social}>
            <Image src={facebook} alt='Facebook' width={25} />
          </div>

          <div className={styles.social}>
            <Image src={twitter} alt='Twitter' width={25} />
          </div> */}

          <div className={styles.social}>
            <Image src={instagram} alt='Instagram' width={25} />
          </div>

          <div className={styles.social}>
            <Image src={linkedin} alt='Linkedin' width={25} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer