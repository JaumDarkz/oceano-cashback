import Image from 'next/image'

import Navbar from '../Navbar'
import UserSidebar from '../UserSidebar'
import ConfigSidebar from '../ConfigSidebar'
import PointsHistory from './components/PointsHistory'
import BuyHistory from './components/BuyHistory'

import styles from './styles.module.scss'

import coin from '@/public/assets/icons/coin.svg'

import { AccountContext } from '@/contexts/accountContext'
import { useContext, useEffect } from 'react'

const PointsPage = () => {

  const { name, balance, wallet } = useContext(AccountContext)

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <UserSidebar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.navbarContainer}>
          <Navbar />
        </div>

        <div className={styles.historyContainer}>
          <div className={styles.configsidebar}>
            <ConfigSidebar />
          </div>

          <div className={styles.content}>
            <div className={styles.title}>
              Registros
            </div>

            <div className={styles.text}>
              Tellus molestie nunc non blandit massa enim. In iaculis nunc sed augue lacus viverra vitae congue.
            </div>

            <div className={styles.wallet}>
              <div className={styles.icon}>
                <Image src={coin} alt='Sal' />
              </div>

              <div className={styles.sal}>
                Saldo: <span>{wallet} SAL</span>
              </div>
            </div>

            <div className={styles.charts}>

              <div className={styles.chart}>
                <div className={styles.subtitle}>
                  Histórico de pontos
                </div>
                <PointsHistory />
              </div>


              <div className={styles.chart}>
                <div className={styles.subtitle}>
                  Histórico de pontos
                </div>

                <BuyHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointsPage