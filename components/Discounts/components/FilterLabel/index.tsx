import Image from 'next/image'

import styles from './styles.module.scss'

import remove from '@/public/assets/icons/filterremove.svg'

interface Placeholder {
  placeholder: string
}

const FilterLabel = ({placeholder}:Placeholder) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {placeholder}
      </div>

      <div className={styles.image}>
        <Image src={remove} alt='Remover' />
      </div>
    </div>
  )
}

export default FilterLabel