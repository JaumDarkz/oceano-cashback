import Image from 'next/image'
import { useState, KeyboardEvent } from 'react'

import TextInput from '../Reusable/TextInput'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'
import PassFormatter from '../Reusable/PassFormatter'

import { register } from '../../../services/api'

const RegisterPage = () => {
  const [nameInputData, setNameInputData] = useState('')
  const [emailInputData, setEmailInputData] = useState('')
  const [passInputData, setPassInputData] = useState('')
  const [error, setError] = useState(0)

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const isStrongPassword = (password: string): boolean => {
    if (password.length < 8) {
      return false
    }

    let hasLowerCase = false
    let hasUpperCase = false
    let hasNumber = false

    for (let i = 0; i < password.length; i++) {
      const char = password[i]

      if (char >= 'a' && char <= 'z') {
        hasLowerCase = true
      } else if (char >= 'A' && char <= 'Z') {
        hasUpperCase = true
      } else if (char >= '0' && char <= '9') {
        hasNumber = true
      }
    }

    return hasLowerCase && hasUpperCase && hasNumber
  }

  const handleRegister = () => {
    if (process.env.API_URL === undefined) {
      alert('Cant Reach API URL')
      return
    }

    if (nameInputData === '' || emailInputData === '' || passInputData === '') {
      setError(2) // Error message should read: Please fill all fields
      return
    }

    if (!validateEmail(emailInputData)) {
      setError(3) // Error message should read: This is not a valid email or Email already exists
      return
    }

    if (!isStrongPassword(passInputData)) {
      setError(1) // Error message should read: Not strong password
      return
    }

    register(nameInputData, emailInputData, passInputData, process.env.API_URL)
      .then(
        (response) => {
          if (response.status === 201) {
            alert('Conta criada com sucesso!')
            window.open('/login', '_self')
          }
        })
      .catch(
        (error) => {
          if (error.response.status === 500) {
            setError(3) // Error message should read: This is not a valid email or Email already exists
          } else if (error.response.status === 400) {
            setError(3) // Error message should read: Not strong password
          }
        })
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

            {/* <div className={styles.googleButton}>
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
            </div> */}

            <div className={styles.inputsContainer}>
              <div className={error === 2 ? styles.nameInputError : styles.nameInput}>
                <TextInput placeholder='Nome' password={false} inputData={(inputData: string) => setNameInputData(inputData)} />
              </div>

              {error === 2 &&
                <>
                  <div className={styles.nameError}>
                    Complete todos os campos
                  </div>
                </>
              }

              <div className={(error === 2 || error === 3) ? styles.emailInputError : styles.emailInput}>
                <TextInput placeholder='E-mail' password={false} inputData={(inputData: string) => setEmailInputData(inputData)} />
              </div>

              {error === 2 &&
                <>
                  <div className={styles.emailError}>
                    Complete todos os campos
                  </div>
                </>
              }
              {error === 3 &&
                <>
                  <div className={styles.emailError}>
                    Email inválido ou já cadastrado
                  </div>
                </>
              }

              <div className={(error === 2 || error === 1) ? styles.passwordInputError : styles.passwordInput}>
                <TextInput placeholder='Senha' password={true} inputData={(inputData: string) => setPassInputData(inputData)} />
              </div>

              {error === 2 &&
                <>
                  <div className={styles.passError}>
                    Complete todos os campos
                  </div>
                </>
              }
              {error === 1 &&
                <>
                  <div className={styles.passError}>
                    A Senha deve preencher todos os requisitos
                  </div>
                </>
              }
            </div>

            <div className={styles.conditionContainer}>
              <PassFormatter password={passInputData} />
            </div>

            <div className={styles.loginButton} onClick={handleRegister} onKeyDown={handleEnter}>
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