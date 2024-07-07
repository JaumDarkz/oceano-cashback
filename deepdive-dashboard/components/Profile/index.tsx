import Image from 'next/image'
import { useState } from 'react'

import Navbar from '../Navbar'
import TextInput from '../Auth/Reusable/TextInput'

import styles from './styles.module.scss'

import photo from '@/public/assets/images/profilephoto.svg'
import pencil from '@/public/assets/icons/pencil.svg'
import photochange from '@/public/assets/icons/photochange.svg'

import { AccountContext } from '@/contexts/accountContext'

import { updateUserData, changePassword } from '@/services/api'
import UserSidebar from '../UserSidebar'
import ConfigSidebar from '../ConfigSidebar'

const ProfilePage = () => {
  const [nameInputData, setNameInputData] = useState('')
  const [emailInputData, setEmailInputData] = useState('')
  // const [passInputData, setPassInputData] = useState('')

  const [actualPassInputData, setActualPassInputData] = useState('')
  const [newPassInputData, setNewPassInputData] = useState('')
  const [againNewPassInputData, setAgainNewPassInputData] = useState('')

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

  const handlePasswordChange = () => {
    if (process.env.API_URL === undefined) {
      alert('Cant Reach API URL')
      return
    }

    if (!isStrongPassword(newPassInputData)) {
      alert('A senha não preenche todos os requisitos')
      return
    }

    if (newPassInputData !== againNewPassInputData) {
      alert('As senhas não são iguais')
      return
    }

    try {
      changePassword(process.env.API_URL, actualPassInputData, newPassInputData)
      .then(
        (response) => {
          if (response.status === 201) {
            alert('Dados atualizados com sucesso!')
            window.open('/profile', '_self')
          }
        })
      .catch(
        (error) => {
          alert(error)
        })
    } catch (error) {
      alert(error)
    }
  }

  const handleAccountUpdate = () => {
    if (process.env.API_URL === undefined) {
      alert('Sem conexão com URL da API.')
      return
    }

    if (nameInputData === '' && emailInputData === '') {
      alert('Nenhum campo foi preenchido')
      return
    }

    if (!validateEmail(emailInputData) && emailInputData !== '') {
      alert('O email não é um email válido') // Error message should read: This is not a valid email or Email already exists
      return
    }

    try {
      updateUserData(process.env.API_URL, nameInputData, emailInputData)
      .then(
        (response) => {
          if (response.status === 201) {
            alert('Dados atualizados com sucesso!')
            window.open('/profile', '_self')
          }
        })
      .catch(
        (error) => {
          alert(error)
        })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <UserSidebar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.navbarContainer}>
          <Navbar />
        </div>

        <div className={styles.separatorContainer}>
          <div className={styles.sidenav}>
            <ConfigSidebar />
          </div>

          <div className={styles.columnContainer}>
            <div className={styles.firstRow}>
              <div className={styles.profileContainer}>
                <div className={styles.profileImage}>
                  <Image src={photo} alt='Perfil' width={90} />
                  <Image src={photochange} alt='Alterar Foto' className={styles.change} width={35}/>
                </div>

                <div className={styles.name}>
                  Kauan Osvaldo
                </div>

                <div className={styles.number}>
                  +000 1234 1234
                </div>
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.title}>
                  Informações gerais
                </div>

                <div className={styles.nameInput}>
                  <div className={styles.label}>
                    Nome
                  </div>

                  <div className={styles.input}>
                    <TextInput placeholder='Nome' inputData={() => ''} password={false} />
                  </div>
                </div>

                <div className={styles.buttons}>
                  <div className={styles.button}>
                    <div className={styles.text}>
                      Edit
                    </div>

                    <div className={styles.icon}>
                      <Image src={pencil} alt='Editar' />
                    </div>
                  </div>

                  <div className={styles.button}>
                    <div className={styles.text}>
                      Atualizar
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.secondRow}>
              <div className={styles.title}>
                Segurança
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.input}>
                  <div className={styles.label}>
                    E-mail
                  </div>

                  <div className={styles.inputComponent}>
                    <TextInput placeholder='E-mail' inputData={() => ''} password={false} />
                  </div>
                </div>

                <div className={styles.input}>
                  <div className={styles.label}>
                    Senha
                  </div>

                  <div className={styles.inputComponent}>
                    <TextInput placeholder='Senha' inputData={() => ''} password={true} />
                  </div>
                </div>

                <div className={styles.input}>
                  <div className={styles.label}>
                    Celular
                  </div>

                  <div className={styles.inputComponent}>
                    <TextInput placeholder='Celular' inputData={() => ''} password={false} />
                  </div>
                </div>
              </div>

              <div className={styles.buttons}>
                <div className={styles.button}>
                  <div className={styles.text}>
                    Edit
                  </div>

                  <div className={styles.icon}>
                    <Image src={pencil} alt='Editar' />
                  </div>
                </div>

                <div className={styles.button}>
                  <div className={styles.text}>
                    Atualizar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage