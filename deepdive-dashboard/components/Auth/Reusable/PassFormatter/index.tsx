import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

import falseCondition from '@/public/assets/icons/falsecondition.svg'
import trueCondition from '@/public/assets/icons/truecondition.svg'

interface PassData {
  password: string
}

const PassFormatter = ({password}: PassData) => {
  const [componentPassword, setComponentPassword] = useState('')
  const [hasLowerCase, setHasLowerCase] = useState(false)
  const [hasUpperCase, setHasUpperCase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasMinLength, setHasMinLength] = useState(false)


  const hasLowerCaseCondition = /[a-z]/.test(componentPassword)
  const hasUpperCaseCondition = /[A-Z]/.test(componentPassword)
  const hasNumberCondition = /\d/.test(componentPassword)
  const hasMinLengthCondition = componentPassword.length >= 8

  useEffect(() => {
    setComponentPassword(password)
    setHasLowerCase(hasLowerCaseCondition)
    setHasUpperCase(hasUpperCaseCondition)
    setHasNumber(hasNumberCondition)
    setHasMinLength(hasMinLengthCondition)
  }, [password, hasLowerCaseCondition, hasUpperCaseCondition, hasNumberCondition, hasMinLengthCondition])

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.condition}>
          <div className={styles.image}>
            <Image src={hasLowerCaseCondition == false ? falseCondition : trueCondition} alt='Condição de Senha' />
          </div>

          <div className={hasLowerCaseCondition == false ? styles.text : styles.trueText}>
            Caractere minúsculo
          </div>
        </div>

        <div className={styles.condition}>
          <div className={styles.image}>
            <Image src={hasUpperCaseCondition == false ? falseCondition : trueCondition} alt='Condição de Senha' />
          </div>

          <div className={hasUpperCaseCondition == false ? styles.text : styles.trueText}>
            Caractere maiúsculo
          </div>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.condition}>
          <div className={styles.image}>
            <Image src={hasNumberCondition == false ? falseCondition : trueCondition} alt='Condição de Senha' />
          </div>

          <div className={hasNumberCondition == false ? styles.text : styles.trueText}>
            Número
          </div>
        </div>

        <div className={styles.condition}>
          <div className={styles.image}>
            <Image src={hasMinLengthCondition == false ? falseCondition : trueCondition} alt='Condição de Senha' />
          </div>

          <div className={hasMinLengthCondition == false ? styles.text : styles.trueText}>
            Mínimo de 8 caracteres
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassFormatter