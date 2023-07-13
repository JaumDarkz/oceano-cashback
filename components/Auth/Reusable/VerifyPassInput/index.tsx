import styles from './styles.module.scss'

interface Data {
  placeholder: string
}

const VerifyPassInput = ({ placeholder }: Data) => {
  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder={placeholder}
        className={styles.HTMLinput}
      />
    </div>
  )
}

export default VerifyPassInput