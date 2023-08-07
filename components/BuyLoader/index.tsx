import Image from 'next/image'

import styles from './styles.module.scss'

import cart from '@/public/assets/animated/cart.gif'

const BuyLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <Image src={cart} alt='Carregando'  />
      </div>

      <div className={styles.text}>
        Aguarde, sua compra está sendo processada...
      </div>
    </div>
  )
}

export default BuyLoader