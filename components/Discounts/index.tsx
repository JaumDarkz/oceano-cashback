import Image from 'next/image'
import { useState } from 'react'

import Navbar from '../Navbar'
import Sidebar from './components/Sidebar'

import styles from './styles.module.scss'

import arrow from '@/public/assets/icons/downarrow.svg'
import FilterLabel from './components/FilterLabel'

const DiscountsPage = () => {
  const [searchNResults, setSearchNResults] = useState(0)
  const [userSearch, setUserSearch] = useState('Descontos')

  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <Navbar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>

        <div className={styles.commerceContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.searchResult}>
                <span>{searchNResults}</span> resultados para <span>&quot;{userSearch}&quot;</span>
              </div>

              <div className={styles.filtersContainer}>
                <div className={styles.filters}>
                  <FilterLabel placeholder='Filtro' />
                  <FilterLabel placeholder='Filtro' />
                  <FilterLabel placeholder='Filtro' />
                  <FilterLabel placeholder='Filtro' />
                  <FilterLabel placeholder='Filtro' />
                </div>

                <div className={styles.cleanFilters}>
                  Limpar filtros
                </div>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.orderBy}>
                <div className={styles.text}>
                  Ordenar por
                </div>

                <div className={styles.orderDropdown}>
                  <div className={styles.text}>
                    Mais Relevantes
                  </div>

                  <div className={styles.arrow}>
                    <Image src={arrow} alt='Ordenar por' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscountsPage