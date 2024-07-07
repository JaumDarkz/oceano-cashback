import Image from 'next/image'
import { useState } from 'react'

import BuyPopup from '../BuyPopup'

import styles from './styles.module.scss'

import star from '@/public/assets/icons/star.svg'
import liked from '@/public/assets/icons/like.svg'
import notliked from '@/public/assets/icons/notliked.svg'

interface CardData {
  id: string,
  image: string,
  productName: string,
  value: number,
  discountValue: number,
  description: string,
  starsValue: number,
  componentType: string,
  minimumPoints: number
}

const CommerceCard = ({id, image, productName, value, discountValue, description, starsValue, componentType, minimumPoints}: CardData) => {
  const [buyPopup, setBuyPopup] = useState(false)
  const [vote, setVote] = useState(false)

  return (
    <>
      {buyPopup &&
        <BuyPopup
        id={id}
        image={image}
        productName={productName}
        value={value} discountValue={discountValue}
        description={description} starsValue={starsValue}
        closeFunction={(closePopup) => setBuyPopup(closePopup)}
        componentType={componentType}
        minimumPoints={minimumPoints}
        />
      }

      <div className={styles.container}>
        <div className={styles.productImage} onClick={() => setBuyPopup(true)}>
          <Image src={image} alt='Foto do produto' layout='responsive' width={259} height={233} />
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.productName} onClick={() => setBuyPopup(true)}>
            {productName}
          </div>

          <div className={styles.productInfo}>
            {/* <div className={styles.points}>
              <div className={styles.value}>
                <span>{componentType == 'coupon' ? '$' : null}{value} {componentType == 'coupon' ? '-' : null} </span> {componentType == 'normal' ? 'SAL' : null}
              </div>

              {discountValue == 0 ? null :
                <>
                  {componentType == 'normal' ?
                    <div className={styles.discountValue}>
                      {discountValue}
                    </div>
                  :
                    <div className={styles.couponValue}>
                      <span>{discountValue}</span> SAL
                    </div>
                  }
                </>
              }
            </div> */}

            <div className={styles.description}>
              {description.slice(0, 80) + '...'}
            </div>

            <div className={styles.starsAndBuy}>
              <div className={styles.stars}>
                <div className={styles.image}>
                  <Image src={star} alt='Estrelas' />
                </div>

                <div className={styles.starsValue}>
                  {starsValue}
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.buy} onClick={() => setBuyPopup(true)}>
                  {componentType == 'normal' ?
                    `${value} SAL`
                  :
                    `${'$'}${discountValue} - ${value}`
                  }
                  </div>

                <div className={styles.like} onClick={() => setVote(!vote)}>
                  {vote == false ? 
                    <Image src={liked} alt='Curtida' width={40} />
                    :
                    <Image src={notliked} alt='Não curtida' width={40} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommerceCard