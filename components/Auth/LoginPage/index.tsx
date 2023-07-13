import Image from 'next/image'
import { useState } from 'react'

import TextInput from '../Reusable/TextInput'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'
import google from '@/public/assets/icons/google.svg'
import erroricon from '@/public/assets/icons/error.svg'

const LoginPage = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(true)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt='Logo' className={styles.logo} />
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.title}>
              Entrar na conta
            </div>

            <div className={styles.info}>
              Insira suas credenciais para acessar sua conta
            </div>

            <div className={styles.googleButton}>
              <div className={styles.image}>
                <Image src={google} alt='Google' />
              </div>

              <div className={styles.text}>
                Faça login pelo Google
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
              <div className={styles.emailInput}>
                <TextInput placeholder='E-mail' password={false} />
              </div>

              {isError &&
                <>
                  <div className={styles.emailErrorIcon}>
                    <Image src={erroricon} alt='Error icon' />
                  </div>

                  <div className={styles.emailError}>
                    Endereço de e-mail inválido
                  </div>
                </>
              }

              <div className={styles.passwordInput}>
                <TextInput placeholder='Senha' password={true} />
              </div>

              {isError &&
                <>
                  <div className={styles.passErrorIcon}>
                    <Image src={erroricon} alt='Error icon' />
                  </div>

                  <div className={styles.passError}>
                    Senha inválida
                  </div>
                </>
              }
            </div>

            <div className={styles.optionsContainer}>
              <div className={styles.remember}>
                <div className={styles.checkbox}>
                  <input type="checkbox" onChange={handleChange} checked={isChecked} className={styles.HTMLinput} />
                </div>

                <div className={styles.text}>
                  Lembre-se da máquina por 30 dias
                </div>
              </div>

              <div className={styles.forgive} onClick={() => window.open('/redefine', '_self')}>
                Esqueceu?
              </div>
            </div>

            <div className={styles.loginButton} onClick={() => window.open('/discounts', '_self')}>
              Login
            </div>

            <div className={styles.registerCall}>
              Não é um membro? <span onClick={() => window.open('/register', '_self')}>Criar uma conta</span>
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

export default LoginPage