import Image from 'next/image'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/bluelogo.svg'

const Error404Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt='Logo' onClick={() => window.open('/', '_self')} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.title}>
          Página não encontrada
        </div>

        <div className={styles.description}>
          A página que você está procurando não existe, foi movida ou arquivada.
        </div>

        <div className={styles.buttonsContainer}>
          <div className={styles.backButton} onClick={() => window.open('/', '_self')}>
            Voltar
          </div>

          <div className={styles.homeButton} onClick={() => window.open('/', '_self')}>
            Página inicial
          </div>
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.year}>
          © 2023
        </div>

        <div className={styles.cookiesPolicy}>
          Política de cookies
        </div>

        <div className={styles.privacyPolicy}>
          Política de privacidade
        </div>

        <div className={styles.terms}>
          Termos e Condições
        </div>
      </div>
    </div>
  )
}

export default Error404Page