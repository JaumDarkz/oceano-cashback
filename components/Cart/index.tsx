import Image from 'next/image'
import { useEffect, useState } from 'react'

import Product from './components/Product'

import styles from './styles.module.scss'

import close from '@/public/assets/icons/close.svg'
import cart from '@/public/assets/icons/cart.svg'

interface CartState {
  onStateChange: (cartState: boolean) => void
}

const Cart = ({onStateChange}: CartState) => {
  const [cartState, setCartState] = useState(false)

  const handleClose = () => {
    setCartState(false)
    onStateChange(false)
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
          />
          <Product
            productName="Desconto"
            info="Obtenha desconto!"
            value={200 * quantities[1]}
            onQuantityChange={(newQuantity) => handleQuantityChange(1, newQuantity)}
          />
        </div>

        <div className={styles.subtotal}>
          <div className={styles.title}>Subtotal</div>

          <div className={styles.totalPoints}>{totalPoints}</div>
        </div>

        <div className={styles.buyButton}>
          <div className={styles.image}>
            <Image src={cart} alt='Comprar' width={24} />
          </div>

          <div className={styles.text}>
            Comprar
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart