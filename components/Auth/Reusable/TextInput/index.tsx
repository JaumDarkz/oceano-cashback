import { useState } from 'react'

import styles from './styles.module.scss'

interface Data {
  placeholder: string,
  password: boolean,
}

const TextInput = ({placeholder, password}:Data) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.container}>
      {password == true ?
        <input type={isChecked == true ? 'text' : 'password'} placeholder={placeholder} className={styles.HTMLinput} />
      :
        <input type="text" placeholder={placeholder} className={styles.HTMLinput} />
      }
      {password == true ?
      <div className={`${styles.switch} ${isChecked ? styles.on : ''}`}>
      <input
        type="checkbox"
        id="toggleSwitch"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor="toggleSwitch" className={styles.switchLabel}>
        <span className={styles.switchInner} />
        <span className={styles.switchToggle} />
      </label>
    </div>
    : null}
    </div>
  )
}

export default TextInput