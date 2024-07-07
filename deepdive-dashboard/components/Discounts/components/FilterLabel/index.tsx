import Image from 'next/image'

import styles from './styles.module.scss'

import remove from '@/public/assets/icons/filterremove.svg'
import { useState } from 'react'

interface Placeholder {
  placeholder: string
}

const FilterLabel = ({placeholder}:Placeholder) => {
  const [show, setShow] = useState(true)

  return (
    <>
      {show &&
        <div className={styles.container} onClick={() => setShow(false)}>
          <div className={styles.text}>
            {placeholder}
          </div>

          <div className={styles.image}>
            <Image src={remove} alt='Remover' />
          </div>
        </div>
      }
    </>
  )
}

export default FilterLabel