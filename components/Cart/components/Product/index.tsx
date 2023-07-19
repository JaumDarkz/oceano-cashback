import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import productImage from '@/public/assets/images/cartblackfriday.svg'

interface ProductData {
  productName: string
  value: number
  info: string
  onQuantityChange: (quantity: number) => void,
  viewProduct: boolean
}

const Product = ({ productName, value, info, onQuantityChange, viewProduct }: ProductData) => {
  const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  useEffect(() => {
    onQuantityChange(count)
    setQuantity(count)
  }, [count, onQuantityChange])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={productImage} alt="Product Image" />
        </div>

        <div className={styles.infoOptions}>
          <div className={styles.info}>
            <div className={styles.productInfo}>
              <div className={styles.name}>{productName}</div>

              <div className={styles.info}>{info}</div>
            </div>

            <div className={styles.points}>{value} pts</div>
          </div>

            <div className={styles.options}>
          {viewProduct == false ?
          <>
              <div className={styles.quantity}>
                <div className={styles.button} onClick={handleDecrement}>
                  -
                </div>
                <div className={styles.count}>{count}</div>
                <div className={styles.button} onClick={handleIncrement}>
                  +
                </div>
              </div>

              <div className={styles.removeButton}>Remove</div>
              </>
              :
              null}
            </div>
        </div>
      </div>
    </>
  )
}

export default Product