/* eslint-disable semi */
import Image from 'next/image';
import { useState } from 'react';

import Navbar from '../Navbar';
import Sidebar from './components/Sidebar';
import CommerceCard from './components/CommerceCard';

import styles from './styles.module.scss';

import arrow from '@/public/assets/icons/downarrow.svg';
import FilterLabel from './components/FilterLabel';
import backarrow from '@/public/assets/pagination/backarrow.svg'
import nextarrow from '@/public/assets/pagination/nextarrow.svg'

import allCardsData from './data/productsData.json'

const cardsPerPage = 16;

const DiscountsPage = () => {
  const [searchNResults, setSearchNResults] = useState(0);
  const [userSearch, setUserSearch] = useState('Descontos');
  const [orderDropdown, setOrderDropdown] = useState(false);
  const [orderByState, setOrderByState] = useState('Mais Relevantes');
  const [cleanAllFilters, setCleanAllFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCardsData = allCardsData.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const totalPages = Math.ceil(allCardsData.length / cardsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.active : styles.notActive}
        >
          {i}
        </div>
      );
    }
    return pageNumbers;
  };

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
                <span>{searchNResults}</span> resultados para{' '}
                <span>&quot;{userSearch}&quot;</span>
              </div>

              <div className={styles.filtersContainer}>
                <div className={styles.filters}>
                  {cleanAllFilters == true ? null : (
                    <>
                      <FilterLabel placeholder='Filtro' />
                      <FilterLabel placeholder='Filtro' />
                      <FilterLabel placeholder='Filtro' />
                      <FilterLabel placeholder='Filtro' />
                      <FilterLabel placeholder='Filtro' />
                    </>
                  )}
                </div>

                <div
                  className={styles.cleanFilters}
                  onClick={() => setCleanAllFilters(true)}
                >
                  Limpar filtros
                </div>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.orderBy}>
                <div className={styles.text}>Ordenar por</div>

                <div
                  className={styles.orderDropdown}
                  onClick={() => setOrderDropdown(!orderDropdown)}
                >
                  <div className={styles.text}>{orderByState}</div>

                  <div className={styles.arrow}>
                    <Image src={arrow} alt='Ordenar por' />
                  </div>
                </div>

                {orderDropdown && (
                  <div className={styles.activeOrderDropdown}>
                    <div className={styles.option}>Menor preço</div>

                    <div className={styles.option}>Maior Preço</div>

                    <div className={styles.option}>Em estoque</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.widthLimiter}>
            <div className={styles.commerce}>
              {currentCardsData.map((cardData, index) => (
                <CommerceCard
                  key={index}
                  image={cardData.image}
                  productName={cardData.productName}
                  value={cardData.value}
                  discountValue={cardData.discountValue}
                  description={cardData.description}
                  starsValue={cardData.starsValue}
                />
              ))}
            </div>
          </div>

          <div className={styles.pagination}>
            <div onClick={handlePreviousPage} className={currentPage === 1 ? styles.disabled : styles.arrow}>
              <Image src={backarrow} alt='Anterior' />
            </div>

            {renderPageNumbers()}

            <div onClick={handleNextPage} className={currentPage === totalPages ? styles.disabled : styles.arrow}>
              <Image src={nextarrow} alt='Próximo' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscountsPage
