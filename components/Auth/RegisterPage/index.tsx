import Image from 'next/image'
import { useState } from 'react'

import TextInput from '../Reusable/TextInput'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'
import google from '@/public/assets/icons/google.svg'

const RegisterPage = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt='Logo' />
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.title}>
              Crie sua conta
            </div>

            <div className={styles.info}>
              Digite nos campos abaixo para começar
            </div>

            <div className={styles.googleButton}>
              <div className={styles.image}>
                <Image src={google} alt='Google' />
              </div>

              <div className={styles.text}>
                Crie sua conta pelo Google
              </div>
            </div>

            <div className={styles.orContainer}>
              <div className={styles.line} />

              <div className={styles.or}>
                ou
              </div>

              <div className={styles.line} />
            </div>

            <div className={styles.inputsContainer}>
              <div className={styles.nameInput}>
                <TextInput placeholder='Nome' password={false} />
              </div>

              <div className={styles.emailInput}>
                <TextInput placeholder='E-mail' password={false} />
              </div>

              <div className={styles.passwordInput}>
                <TextInput placeholder='Senha' password={true} />
              </div>
            </div>

            <div className={styles.optionsContainer}>
              
            </div>

            <div className={styles.loginButton} onClick={() => window.open('/login', '_self')}>
              Criar conta
            </div>

            <div className={styles.registerCall}>
              Já tem uma conta? <span onClick={() => window.open('/login', '_self')}>Entrar</span>
            </div>
          </div>
        </div>

        <div className={styles.legalContainer}>
          <div className={styles.year}>
            © 2023
          </div>

          <div className={styles.policy}>
            Política de Privacidade
          </div>
        </div>
      </div>

      <div className={styles.rightSide} />
    </div>
  )
}

export default RegisterPage