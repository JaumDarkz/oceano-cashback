/* eslint-disable quotes */
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import { CartContext } from '@/contexts/cartContext'

import styles from './styles.module.scss'

import close from '@/public/assets/icons/close.svg'
import cart from '@/public/assets/icons/cart.svg'
import star from '@/public/assets/icons/star.svg'
import bag from '@/public/assets/icons/Marketplace/bag.svg'

interface PopupData {
  id: string,
  image: string,
  productName: string,
  value: number,
  discountValue: number,
  description: string,
  starsValue: number,
  closeFunction: (closePopup: boolean) => void,
  componentType: string,
  minimumPoints: number
}

const BuyPopup = ({id, image, productName, value, discountValue, description, closeFunction, starsValue, componentType, minimumPoints}:PopupData) => {
  const [closePopup, setClosePopup] = useState(false)
  const [count, setCount] = useState(0)
  const [couponCount, setCouponCount] = useState(minimumPoints)
  const  { myProducts, setProducts } = useContext(CartContext)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  const handleCouponIncrement = () => {
    setCouponCount((prevCount) => prevCount + minimumPoints)
  }

  const handleCouponDecrement = () => {
    if (couponCount > minimumPoints) {
      setCouponCount((prevCount) => prevCount - minimumPoints)
    }
  }

  const handleClose = () => {
    setClosePopup(true)
    closeFunction(false)
  }

  const handleBuy = () => {
    const product = {
      id: id,
      image: image,
      productName: productName,
      price: minimumPoints,
      total: couponCount,
    }

    if ( myProducts == null || myProducts.length == 0 ) {
      setProducts([product])
    } else {
      // check if product.id exist in myProducts
      const productIndex = myProducts.findIndex((product) => product.id == id)
      if (productIndex != -1) {
        const tempProduct = myProducts[productIndex]
        tempProduct.total += couponCount
        // tempProducts.price += minimumPoints
        setProducts([...myProducts])
      } else {
        setProducts([...myProducts, product])
      }
    }
    alert('Produto adicionado ao carrinho')
    setClosePopup(true)
    closeFunction(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.popupContainer}>
        <div className={styles.leftContainer} style={{backgroundImage: `url(${image})`}} />

        <div className={styles.rightContainer}>
          <div className={styles.titleAndClose}>
            <div className={styles.title}>
              {productName}
            </div>

            <div className={styles.close} onClick={handleClose}>
              <Image src={close} alt='Fechar' className={styles.image} />
            </div>
          </div>

          <div className={styles.filterLabels}>
            <div className={styles.label}>
              Caracteristicas
            </div>

            <div className={styles.label}>
              Caracteristicas
            </div>

            <div className={styles.label}>
              Caracteristicas
            </div>
          </div>

          <div className={styles.description}>
            {description}
          </div>

          <div className={styles.buttonsContainer}>
            {componentType == 'normal' ?
              <div className={styles.quantityContainer}>
                <div className={styles.left}>
                  <div className={styles.value}>
                    <div className={styles.title}>
                      Valor
                    </div>

                    <div className={styles.text}>
                      {value} SAL
                    </div>
                  </div>
                </div>

                <div className={styles.right}>
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
              </div>
              :
              <div className={styles.couponContainer}>
                <div className={styles.left}>
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

                  <div className={styles.desc}>
                    $ {discountValue} cada
                  </div>
                </div>

                <div className={styles.right}>
                  <div className={styles.value}>
                    <div className={styles.title}>
                      Valor
                    </div>

                    <div className={styles.text}>
                      $ {discountValue}
                    </div>
                  </div>
                </div>
              </div>
            }

            <div className={styles.buttons}>
              <div className={styles.buyNow}>
                <div className={styles.image}>
                  <Image src={bag} alt='Comprar' />
                </div>

                <div className={styles.text}>
                  Comprar agora
                </div>
              </div>

              <div className={styles.button} onClick={handleBuy}>
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
    </div>
  )
}

export default BuyPopup