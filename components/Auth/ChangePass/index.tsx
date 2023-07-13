import { useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

import TextInput from '../Reusable/TextInput'

import logo from '@/public/assets/brand/bluelogo.svg'
import arrow from '@/public/assets/icons/backarrow.svg'
import VerifyPassInput from '../Reusable/VerifyPassInput'

const RedefinePasswordPage = () => {
  const [currentPage, setCurrentPage] = useState('redefineComplete')

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt='Logo' className={styles.logo} />
      </div>

      {currentPage == 'email' ?
        <>
          <div className={styles.emailContainer}>
            <div className={styles.contentContainer}>
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
                  <Image src={arrow} alt='Back' className={styles.icon} />
                </div>

                <div className={styles.text}>
                  Volte ao login
                </div>
              </div>
            </div>
          </div>
        </>
      : currentPage == 'chooseNewPass' ?
        <div className={styles.emailContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.title}>
              Escolha a nova senha
            </div>

            <div className={styles.description}>
              Quase pronto. Digite sua nova senha e está tudo pronto.
            </div>

            <div className={styles.input}>
              <TextInput password={true} placeholder='Nova senha' />
            </div>

            <div className={styles.input}>
              <VerifyPassInput placeholder='Senha novamente' />
            </div>

            <div className={styles.button}>
              Redefinir senha
            </div>

            <div className={styles.backLogin}>
              <div className={styles.arrow}>
                <Image src={arrow} alt='Back' className={styles.icon} />
              </div>

              <div className={styles.text}>
                Volte ao login
              </div>
            </div>
          </div>
        </div>
      : currentPage == 'redefineComplete' ?
        <div className={styles.emailContainer}>
          <div className={styles.contentContainer}>
            <div className={styles.title}>
              Redefinição completa!
            </div>

            <div className={styles.description}>
              Tudo feito! Volte ao login.
            </div>

            <div className={styles.backLogin}>
              <div className={styles.arrow}>
                <Image src={arrow} alt='Back' className={styles.icon} />
              </div>

              <div className={styles.text}>
                Volte ao login
              </div>
            </div>
          </div>
        </div>
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