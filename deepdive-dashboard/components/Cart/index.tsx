import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import Product from './components/Product'

import styles from './styles.module.scss'

import close from '@/public/assets/icons/close.svg'
import cart from '@/public/assets/icons/cart.svg'
import BuyLoader from '../BuyLoader'
import { CartContext } from '@/contexts/cartContext'
import { checkout } from '@/services/api'

interface CartState {
  onStateChange: (cartState: boolean) => void
}

const Cart = ({ onStateChange }: CartState) => {
  const [cartState, setCartState] = useState(false)

  const [confirmPopup, setConfirmPopup] = useState(false)
  const [loadingPopup, setLoadingPopup] = useState(false)

  const { myProducts, setProducts } = useContext(CartContext)

  const handleClose = () => {
    setCartState(false)
    onStateChange(false)
  }

  const handleConfirm = () => {
    setLoadingPopup(true)
    setConfirmPopup(false)

    const productsIds = myProducts.map((product) => {
      return product.id
    })

    const productsQuantities = myProducts.map((product) => {
      return product.total / product.price
    })

    if(process.env.API_URL === undefined) return
    checkout(process.env.API_URL, productsIds, productsQuantities).then((response) => {
      if (response?.status !== 201) {
        alert('Um dos produtos selecionados está sem estoque!')
        setLoadingPopup(false)
        return
      }
      setLoadingPopup(false)
      setProducts([])
      setCartState(false)
      onStateChange(false)
      window.open('/discounts', '_self')
    }).catch((error) => {
      setLoadingPopup(false)
      alert(error)
    })
  }

  const [totalPoints, setTotalPoints] = useState(0)

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const tempProduct = myProducts[index]
    tempProduct.total = newQuantity * tempProduct.price
    setProducts([...myProducts])
  }

  useEffect(() => {
    let total = 0
    myProducts.forEach((product) => {
      total += product.total
    })
    setTotalPoints(total)
  }, [myProducts])

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
            {myProducts.map((product, index) => {
              return (
                <div key={index}>
                  <Product
                    onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                    isModal={false}
                    product={product}
                  />
                </div>
              )
            })}
          </div>

          <div className={styles.subtotal}>
            <div className={styles.title}>Subtotal</div>

            <div className={styles.totalPoints}>{totalPoints} SAL</div>
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
              Esta é a última etapa da sua compra. Confira os produtos e quantidades e clique em confirmar para finalizar.
            </div>

            <div className={styles.productsContainer}>
              {myProducts.map((product, index) => {

                return (
                  <div key={index}>
                    <Product
                      onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                      isModal={true}
                      product={product}
                    />
                  </div>
                )
              })}
            </div>

            <div className={styles.subtotal}>
              <div className={styles.totalPoints}>Total: {totalPoints} SAL</div>
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