import styles from './styles.module.scss'

const ConfigSidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.option} onClick={() => window.open('/profile', '_self')}>
        Perfil do usuário
      </div>

      <div className={styles.option} onClick={() => window.open('/points', '_self')}>
        Histórico de transação
      </div>

      <div className={styles.line} />

      <div className={styles.close} onClick={() => window.open('/login', '_self')}>
        Fechar a conta
      </div>
    </div>
  )
}

export default ConfigSidebar