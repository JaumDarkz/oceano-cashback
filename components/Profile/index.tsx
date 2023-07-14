import Image from 'next/image'

import Navbar from '../Navbar'

import styles from './styles.module.scss'

import photo from '@/public/assets/images/profilephoto.svg'
import TextInput from '../Auth/Reusable/TextInput'

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.title}>
            Informações da conta
          </div>

          <div className={styles.description}>
            Edite seu perfil rapidamente
          </div>

          <div className={styles.photo}>
            <Image width={100} src={photo} alt='Profile photo' className={styles.image} />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.label}>
              Nome
            </div>

            <TextInput password={false} placeholder='Nome' />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.label}>
              E-mail
            </div>

            <TextInput password={false} placeholder='E-mail' />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.label}>
              Celular
            </div>

            <TextInput password={false} placeholder='Celular' />
          </div>

          <div className={styles.button}>
            Atualizar agora
          </div>
        </div>

        <div className={styles.newPassContainer}>
          <div className={styles.title}>
            Senha
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.label}>
              Senha atual
            </div>

            <TextInput password={true} placeholder='Senha atual' />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.label}>
              Nova senha
            </div>

            <TextInput password={false} placeholder='Senha atual' />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.label}>
              Digite novamente a senha
            </div>

            <TextInput password={false} placeholder='Senha atual' />
          </div>

          <div className={styles.button}>
            Salvar
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage