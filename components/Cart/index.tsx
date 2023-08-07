import Image from 'next/image'
import { useEffect, useState } from 'react'

import Product from './components/Product'

import styles from './styles.module.scss'

import close from '@/public/assets/icons/close.svg'
import cart from '@/public/assets/icons/cart.svg'
import BuyLoader from '../BuyLoader'

interface CartState {
  onStateChange: (cartState: boolean) => void
}

const Cart = ({onStateChange}: CartState) => {
  const [cartState, setCartState] = useState(false)

  const [confirmPopup, setConfirmPopup] = useState(false)
  const [loadingPopup, setLoadingPopup] = useState(false)

  const handleClose = () => {
    setCartState(false)
    onStateChange(false)
  }

  const handleConfirm = () => {
    setLoadingPopup(true)
    setConfirmPopup(false)
  }

  const [totalPoints, setTotalPoints] = useState(0)

  const [quantities, setQuantities] = useState<number[]>([0, 0])

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedQuantities = [...quantities]
    updatedQuantities[index] = newQuantity
    setQuantities(updatedQuantities)
  }

  useEffect(() => {
    const calculateTotalPoints = () => {
      let sum = 0
      for (let i = 0; i < quantities.length; i++) {
        sum += quantities[i] * 200 // Phil im suposing that 200 is the value of products
      }
      setTotalPoints(sum)
    }

    calculateTotalPoints()
  }, [quantities])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fillContainer} onClick={handleClose} />

        <div className={styles.cartContainer}>
          <div className={styles.close}>
            <Image src={close} alt="Close" className={styles.image} onClick={handleClose} />
          </div>

          <div className={styles.title}>Carrinho</div>

          <div className={styles.productsContainer}>
            <Product
              productName="Desconto"
              info="Obtenha desconto!"
              value={200 * quantities[0]}
              onQuantityChange={(newQuantity) => handleQuantityChange(0, newQuantity)}
              viewProduct={false}
            />
          </div>

          <div className={styles.subtotal}>
            <div className={styles.title}>Subtotal</div>

            <div className={styles.totalPoints}>{totalPoints} pts</div>
          </div>

          <div className={styles.buyButton} onClick={() => setConfirmPopup(true)}>
            <div className={styles.image}>
              <Image src={cart} alt='Comprar' width={24} />
            </div>

            <div className={styles.text}>
              Comprar
            </div>
          </div>
        </div>
      </div>

      {confirmPopup &&
        <div className={styles.popupContainer}>
          <div className={styles.popup}>
            <div className={styles.titleAndClose}>
              <div className={styles.title}>
                Confirme a compra
              </div>

              <div className={styles.close}>
              <Image src={close} alt="Fechar" className={styles.image} onClick={() => setConfirmPopup(false)} />
              </div>
            </div>

            <div className={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industrk Lorem Ipsum is simply dummy text of the printing and typesetting industrk
            </div>

            <div className={styles.productsContainer}>
              <Product
                productName="Desconto"
                info="Obtenha desconto!"
                value={200 * quantities[1]}
                onQuantityChange={(newQuantity) => handleQuantityChange(1, newQuantity)}
                viewProduct={true}
              />
            </div>

            <div className={styles.subtotal}>
              <div className={styles.totalPoints}>Total: {totalPoints} pts</div>
            </div>

            <div className={styles.buttonsContainer}>
              <div className={styles.cancel} onClick={() => setConfirmPopup(false)}>
                Cancel
              </div>

              <div className={styles.confirm} onClick={handleConfirm}>
                Confirm
              </div>
            </div>
          </div>
        </div>
      }

      {loadingPopup &&
        <div className={styles.popupContainer}>
          <BuyLoader />
        </div>
      }
    </>
  )
}

export default Cart