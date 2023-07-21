/* eslint-disable quotes */
import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import close from '@/public/assets/icons/close.svg'
import cart from '@/public/assets/icons/cart.svg'

interface PopupData {
  image: string,
  productName: string,
  value: number,
  discountValue: number,
  description: string,
  closeFunction: (closePopup: boolean) => void
}

const BuyPopup = ({image, productName, value, discountValue, description, closeFunction}:PopupData) => {
  const [closePopup, setClosePopup] = useState(false)

  const handleClose = () => {
    setClosePopup(true)
    closeFunction(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.popupContainer}>
        <div className={styles.leftContainer} style={{backgroundImage: `url(${image})`}} />

        <div className={styles.rightContainer}>
          <div className={styles.close} onClick={handleClose}>
            <Image src={close} alt='Fechar' className={styles.image} />
          </div>

          <div className={styles.title}>
            {productName}
          </div>

          <div className={styles.price}>
            <div className={styles.value}>
              {value} <span>pts</span>
            </div>

            <div className={styles.discount}>
              {discountValue} pts
            </div>
          </div>

          <div className={styles.description}>
            {description}
          </div>

          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <div className={styles.image}>
                <Image src={cart} alt='Comprar' />
              </div>

              <div className={styles.text}>
                Adicionar ao carrinho
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyPopup