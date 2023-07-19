import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

import logo from '@/public/assets/brand/whitelogo.svg'
import magnifier from '@/public/assets/icons/magnifier.svg'
import cart from '@/public/assets/icons/cart.svg'
import profilephoto from '@/public/assets/images/profilephoto.svg'
import profileicon from '@/public/assets/icons/profile.svg'
import pointsicon from '@/public/assets/icons/points.svg'
import logouticon from '@/public/assets/icons/logout.svg'
import Cart from '../Cart'

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const currentUrl = window.location.href

    if (currentUrl.includes('discounts')) {
      setSelectedOption('discounts')
    } else if (currentUrl.includes('about')) {
      setSelectedOption('about')
    }
  }, [])

  return (
    <>
      {cartOpen &&
        <Cart onStateChange={(newState) => setCartOpen(newState)}/>
      }

      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src={logo} alt='Logo' />
        </div>

        <div className={styles.optionsContainer}>
          <div
            className={
              selectedOption == 'discounts'
                ? styles.selectedOption
                : styles.option
            }
            onClick={() => {setSelectedOption('discounts'); window.open('/discounts', '_self')}}
          >
            Descontos
          </div>

          <div
            className={
              selectedOption == 'about' ? styles.selectedOption : styles.option
            }
            // eslint-disable-next-line semi
            onClick={() => {setSelectedOption('about'); window.open('/about', '_self')}}
          >
            Sobre
          </div>
        </div>

        <div className={styles.searchBar}>
          <input type='text' className={styles.HTMLinput} />

          <div className={styles.image}>
            <Image src={magnifier} alt='Search' />
          </div>
        </div>

        <div className={styles.userContainer}>
          <div className={styles.cart} onClick={() => setCartOpen(!cartOpen)}>
            <Image src={cart} alt='Cart' />
          </div>

          <div className={styles.profile} onClick={() => setDropdown(!dropdown)}>
            <div className={styles.photo}><Image src={profilephoto} alt='Profile photo' /></div>

            <div className={styles.infoContainer}>
              <div className={styles.name}>Vinicius</div>

              <div className={styles.points}>PTS: {80000}</div>
            </div>
          </div>

          {dropdown &&
            <div className={styles.dropdownContainer}>
              <div className={styles.option} onClick={() => window.open('/profile', '_self')}>
                <div className={styles.image}>
                  <Image src={profileicon} alt='Profile'/>
                </div>

                <div className={styles.text}>
                  Perfil
                </div>
              </div>

              <div className={styles.option} onClick={() => window.open('/points', '_self')}>
                <div className={styles.image}>
                  <Image src={pointsicon} alt='Profile'/>
                </div>

                <div className={styles.text}>
                  Pontos
                </div>
              </div>

              <div className={styles.line} />

              <div className={styles.option} onClick={() => window.open('/login', '_self')}>
                <div className={styles.image}>
                  <Image src={logouticon} alt='Profile'/>
                </div>

                <div className={styles.text}>
                  Desconectar
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Navbar
