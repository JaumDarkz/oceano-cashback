import { useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

import TextInput from '../Reusable/TextInput'

import logo from '@/public/assets/brand/bluelogo.svg'
import arrow from '@/public/assets/icons/backarrow.svg'

const RedefinePasswordPage = () => {
  const [currentPage, setCurrentPage] = useState('email')

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt='Logo' />
      </div>

      {currentPage == 'email' ?
        <>
          <div className={styles.emailContainer}>
            <div className={styles.title}>
              Redefina sua senha
            </div>

            <div className={styles.description}>
              Não tenha medo. Enviaremos um e-mail com instruções para redefinir sua senha.
            </div>

            <div className={styles.input}>
              <TextInput password={false} placeholder='E-mail' />
            </div>

            <div className={styles.button}>
              Redefinir senha
            </div>

            <div className={styles.backLogin}>
              <div className={styles.arrow}>
                <Image src={arrow} alt='Back' />
              </div>

              <div className={styles.text}>
                Volte ao login
              </div>
            </div>
          </div>
        </>
      : null}

      <div className={styles.footer}>
        <div className={styles.year}>
          © 2023
        </div>

        <div className={styles.policy}>
          Política de privacidade
        </div>
      </div>
    </div>
  )
}

export default RedefinePasswordPage