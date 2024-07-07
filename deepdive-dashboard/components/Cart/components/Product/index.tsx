import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import styles from './styles.module.scss'

// import productImage from '@/public/assets/images/cartblackfriday.svg'
import { CartContext } from '@/contexts/cartContext'

interface ProductData {
  onQuantityChange: (quantity: number) => void
  isModal: boolean
  product: any
}

const Product = ({ product, onQuantityChange, isModal }: ProductData) => {
    
  const [count, setCount] = useState(product.total / product.price)
  const [quantity, setQuantity] = useState(product.total / product.price)
  const  { myProducts, setProducts } = useContext(CartContext)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  const handleRemove = () => {
    const newProducts = myProducts.filter((myProduct) => {
      return myProduct.id != product.id
    })
    setProducts(newProducts)
  }


  useEffect(() => {
    onQuantityChange(count)
    setQuantity(count)
  }, [count])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={product.image} alt="Product Image" width="86" height="86" />
        </div>

        <div className={styles.infoOptions}>
          <div className={styles.info}>
            <div className={styles.productInfo}>
              <div className={styles.name}>{product.productName}</div>
            </div>

            <div className={styles.points}>{product.total} SAL</div>
          </div>

            <div className={styles.options}>
          {isModal == false ?
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

              <div className={styles.removeButton} onClick={handleRemove}>Remove</div>
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