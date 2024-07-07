import { useState } from 'react'
import styles from './styles.module.scss'

interface Data {
  placeholder: string
  password: boolean
  inputData: (inputData: string) => void
  isDisabled?: boolean
}

const TextInput = ({ placeholder, password, inputData, isDisabled }: Data) => {
  const [showPassword, setShowPassword] = useState(false)
  const [componentInputData, setComponentInputData] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComponentInputData(e.target.value)
    inputData(e.target.value)
  }

  return (
    <div className={styles.container}>
      {password === true ? (
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={styles.HTMLinput}
          value={componentInputData}
          onChange={handleChange}
          disabled={isDisabled}
        />
      ) : (
        <input
          type='text'
          placeholder={placeholder}
          className={styles.HTMLinput}
          value={componentInputData}
          onChange={handleChange}
          disabled={isDisabled}
        />
      )}
      {password === true ? (
        <div className={`${styles.switch} ${showPassword ? styles.on : ''}`}>
          <input
            type='checkbox'
            id='toggleSwitch'
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            disabled={isDisabled}
          />
          <label htmlFor='toggleSwitch' className={styles.switchLabel}>
            <span className={styles.switchInner} />
            <span className={styles.switchToggle} />
          </label>
        </div>
      ) : null}
    </div>
  )
}

export default TextInput