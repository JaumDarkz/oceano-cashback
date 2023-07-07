import { useState, useRef } from 'react'
import styles from './styles.module.scss'

interface Data {
  placeholder: string
  password: boolean
}

const TextInput = ({ placeholder, password }: Data) => {
  const [isChecked, setIsChecked] = useState(false)
  const passInputRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  const verifyPassword = () => {
    const passInput = passInputRef.current
    if (passInput) {
      const pass = passInput.value

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

      if (regex.test(pass)) {
        passInput.setCustomValidity('')
      } else {
        passInput.setCustomValidity(
          'A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.'
        )
      }
    }
  }

  return (
    <div className={styles.container}>
      {password === true ? (
        <input
          type={isChecked === true ? 'text' : 'password'}
          placeholder={placeholder}
          className={styles.HTMLinput}
          required
          onInput={verifyPassword}
          ref={passInputRef}
        />
      ) : (
        <input
          type='text'
          placeholder={placeholder}
          className={styles.HTMLinput}
        />
      )}
      {password === true ? (
        <div className={`${styles.switch} ${isChecked ? styles.on : ''}`}>
          <input
            type='checkbox'
            id='toggleSwitch'
            checked={isChecked}
            onChange={handleChange}
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