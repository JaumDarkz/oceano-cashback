import Image from 'next/image'
import { useState } from 'react'

import styles from './styles.module.scss'

import hamburguer from '@/public/assets/icons/hamburguer.svg'
import arrow from '@/public/assets/icons/downarrow.svg'

const Sidebar = () => {
  const [sliderValue, setSliderValue] = useState(10)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target) {
      const newValue = parseInt((event.target as HTMLInputElement).value)
      setSliderValue(newValue)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <Image src={hamburguer} alt='Categorias' />

        <div className={styles.text}>
          Categorias
        </div>

        <Image src={arrow} alt='Categorias' />
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.title}>
          Filtros
        </div>

        <div className={styles.productType}>
          <div className={styles.title}>
            Tipos de produto
          </div>

          <div className={styles.option}>
            <div className={styles.checkbox}>
              <input type="checkbox" />
            </div>

            <div className={styles.text}>
              Lorem impsum
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.checkbox}>
              <input type="checkbox" />
            </div>

            <div className={styles.text}>
              Lorem impsum
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.checkbox}>
              <input type="checkbox" />
            </div>

            <div className={styles.text}>
              Lorem impsum
            </div>
          </div>
        </div>

        <div className={styles.productType}>
          <div className={styles.title}>
            Tipos de produto
          </div>

          <div className={styles.option}>
            <div className={styles.checkbox}>
              <input type="checkbox" />
            </div>

            <div className={styles.text}>
              Lorem impsum
            </div>
          </div>

          <div className={styles.option}>
            <div className={styles.checkbox}>
              <input type="checkbox" />
            </div>

            <div className={styles.text}>
              Lorem impsum
            </div>
          </div>
        </div>

        <div className={styles.minimumOrder}>
          <div className={styles.title}>
            Ordem mínima
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <input
            type="range"
            min={10}
            max={1000}
            value={sliderValue}
            onChange={handleSliderChange}
            className={styles.slider}
          />
          <div className={styles.value}>{sliderValue} SAL</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar