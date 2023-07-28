/* eslint-disable quotes */
import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import close from '@/public/assets/icons/close.svg'
import cart from '@/public/assets/icons/cart.svg'
import star from '@/public/assets/icons/star.svg'

interface PopupData {
  image: string,
  productName: string,
  value: number,
  discountValue: number,
  description: string,
  starsValue: number
  closeFunction: (closePopup: boolean) => void,
  componentType: string
}

const BuyPopup = ({image, productName, value, discountValue, description, closeFunction, starsValue, componentType}:PopupData) => {
  const [closePopup, setClosePopup] = useState(false)
  const [count, setCount] = useState(0)
  const [couponCount, setCouponCount] = useState(5000)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  const handleCouponIncrement = () => {
    setCouponCount((prevCount) => prevCount + 100)
  }

  const handleCouponDecrement = () => {
    if (couponCount > 5000) {
      setCouponCount((prevCount) => prevCount - 100)
    }
  }

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

          <div className={styles.titleAndStars}>
            <div className={styles.title}>
              {productName}
            </div>

            <div className={styles.stars}>
              <div className={styles.image}>
                <Image src={star} alt='Estrelas' />
              </div>

              <div className={styles.value}>
                {starsValue}
              </div>
            </div>
          </div>

          <div className={styles.price}>
            <div className={styles.value}>
              {componentType == 'normal' ?
                <>
                  {value} <span>pts</span>
                </>
                :
                <>
                  ${value}
                </>
              }
            </div>

            {componentType == 'normal' ?
              <div className={styles.discount}>
                {discountValue} pts
              </div>
            : null}
          </div>

          <div className={styles.description}>
            {description}
          </div>

          <div className={styles.buttonsContainer}>
            {componentType == 'normal' ?
              <div className={styles.quantityContainer}>
                <div className={styles.title}>
                  Quantidade
                </div>

                <div className={styles.quantity}>
                  <div className={styles.button} onClick={handleDecrement}>
                    -
                  </div>
                  <div className={styles.count}>{count}</div>
                  <div className={styles.button} onClick={handleIncrement}>
                    +
                  </div>
                </div>
              </div>
              :
              <div className={styles.couponContainer}>
                <div className={styles.text}>
                  Pontuação define valor recebido
                </div>

                <div className={styles.quantity}>
                  <div className={styles.button} onClick={handleCouponDecrement}>
                    -
                  </div>
                  <div className={styles.count}>{couponCount} pts</div>
                  <div className={styles.button} onClick={handleCouponIncrement}>
                    +
                  </div>
                </div>

                <div className={styles.text}>
                  Mínimo de 5000 pts
                </div>
              </div>
            }

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