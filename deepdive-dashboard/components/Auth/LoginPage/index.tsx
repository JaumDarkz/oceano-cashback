import Image from 'next/image'
import { useState, KeyboardEvent } from 'react'

import TextInput from '../Reusable/TextInput'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'

import { login } from '../../../services/api'

const LoginPage = () => {
  const [emailInputData, setEmailInputData] = useState('')
  const [passInputData, setPassInputData] = useState('')
  const [error, setError] = useState(0)

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogin = () => {
    if (process.env.API_URL) {
      login(emailInputData, passInputData, process.env.API_URL)
        .then(
          (response) => {
            if (response.status === 201) {
              const userToken = response.data.accessToken
              localStorage?.setItem('userToken', userToken)
              window.open('/discounts', '_self')
            }
          }
        ).catch(
          (error) => {
            if (error.response.status === 404) {
              setError(1)
            }
            if (error.response.status === 401) {
              setError(2)
            }
          }
        )
    } else {
      alert('Cant Reach API URL')
    }
  }

  /* const handleChange = () => {
    setIsChecked(!isChecked)
  } */

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

            {/* <div className={styles.googleButton}>
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
            </div> */}

            <div className={styles.inputsContainer}>
              <div className={error === 1 ? styles.emailInputError : styles.emailInput}>
                <TextInput placeholder='E-mail' password={false} inputData={(inputData:string) => setEmailInputData(inputData)} />
              </div>

              {error === 1 &&
                <>
                  <div className={styles.emailError}>
                    Endereço de e-mail inválido
                  </div>
                </>
              }

              <div className={error === 2 ? styles.passwordInputError : styles.passwordInput} onKeyDown={handleEnter}>
                <TextInput placeholder='Senha' password={true} inputData={(inputData:string) => setPassInputData(inputData)}/>
              </div>

              {error === 2 &&
                <>
                  <div className={styles.passError}>
                    Senha inválida
                  </div>
                </>
              }
            </div>

            {/* <div className={styles.optionsContainer}>
              <div className={styles.remember}>
                <div className={styles.checkbox}>
                  <input type="checkbox" onChange={handleChange} checked={isChecked} className={styles.HTMLinput} />
                </div>

                <div className={styles.text}>
                  Lembre-se da máquina por 30 dias
                </div>
              </div>

              <div className={styles.forgive} onClick={() => window.open('/redefinepassword', '_self')}>
                Esqueceu?
              </div>
            </div> */}

            <div className={styles.loginButton} onClick={handleLogin}>
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