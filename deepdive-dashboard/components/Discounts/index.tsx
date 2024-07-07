/* eslint-disable semi */
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import Navbar from '../Navbar';
import CommerceCard from './components/CommerceCard';
import UserSidebar from '../UserSidebar';
import MPFooter from './components/MPFooter';

import styles from './styles.module.scss';

import arrow from '@/public/assets/icons/downarrow.svg';
import backarrow from '@/public/assets/pagination/backarrow.svg'
import nextarrow from '@/public/assets/pagination/nextarrow.svg'
import cleanfilter from '@/public/assets/icons/filter.svg'
import downarrow from '@/public/assets/icons/filterarrow.svg'

// import allCardsData from './data/productsData.json'
import { ProductsContext } from '@/contexts/productContext';

const cardsPerPage = 16;

const DiscountsPage = () => {
  const { products } = useContext(ProductsContext);
  const [allCardsData, setAllCardsData] = useState(products);
  const [searchNResults, setSearchNResults] = useState(0);
  const [userSearch, setUserSearch] = useState('Descontos');
  const [orderDropdown, setOrderDropdown] = useState(false);
  const [orderByState, setOrderByState] = useState('Mais Relevantes');
  const [cleanAllFilters, setCleanAllFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Write a productsData.json file with the products data in the ./data folder

    // const productsData = products.map((product) => {
    //   return {
    //     image: product.image,
    //     productName: product.name,
    //     value: product.value,
    //     discountValue: product.discountValue,
    //     description: product.description,
    //     starsValue: product.starsValue,
    //     componentType: product.componentType,
    //   };
    setAllCardsData(products);
    // console.log(products);
  }, [products]);

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
      <div className={styles.sidebarContainer}>
        <UserSidebar />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.navbarContainer}>
          <Navbar />
        </div>
        <div className={styles.separatorContainer}>
          <div className={styles.commerceContainer}>
            <div className={styles.searchContainer}>
              <div className={styles.leftContainer}>
                <div className={styles.filtersContainer}>
                  <div className={styles.clean}>
                    <Image src={cleanfilter} alt='Limpar' />
                  </div>

                  <div className={styles.filter}>
                    <div className={styles.text}>
                      Categoria
                    </div>

                    <div className={styles.icon}>
                      <Image src={downarrow} alt='Arrow' />
                    </div>
                  </div>

                  <div className={styles.filter}>
                    <div className={styles.text}>
                      Preços
                    </div>

                    <div className={styles.icon}>
                      <Image src={downarrow} alt='Arrow' />
                    </div>
                  </div>

                  <div className={styles.filter}>
                    <div className={styles.text}>
                      Ofertas
                    </div>

                    <div className={styles.icon}>
                      <Image src={downarrow} alt='Arrow' />
                    </div>
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
                      <div className={styles.option} onClick={() => {setOrderByState('Menor Preço'); setOrderDropdown(false)}}>Menor preço</div>

                      <div className={styles.option} onClick={() => {setOrderByState('Maior Preço'); setOrderDropdown(false)}}>Maior Preço</div>

                      <div className={styles.option} onClick={() => {setOrderByState('Em Estoque'); setOrderDropdown(false)}}>Em estoque</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.searchResult}>
              <span>{searchNResults}</span> resultados para{' '}
              <span>&quot;{userSearch}&quot;</span>
            </div>

            <div className={styles.widthLimiter}>
              <div className={styles.commerce}>
                {currentCardsData.map((cardData, index) => (
                  <CommerceCard
                    key={index}
                    id={cardData.id}
                    image={cardData.image}
                    productName={cardData.productName}
                    value={cardData.value}
                    discountValue={cardData.discountValue}
                    description={cardData.description}
                    starsValue={cardData.starsValue}
                    componentType={cardData.componentType}
                    minimumPoints={cardData.minimumOrder}
                  />
                ))}

                <CommerceCard
                  id={'1'}
                  image={'/assets/images/blackfriday.svg'}
                  productName={'Nome do Produto'}
                  value={5000}
                  discountValue={4}
                  description={'Lorem Ipsum is simply dummy text of the printing and typesetting industrk, Lorem Ipsum is simply dummy text of the printing and typesetting industrk, Lorem Ipsum is simply dummy text of the printing and typesetting industrk'}
                  starsValue={5}
                  componentType={'norma'}
                  minimumPoints={5000}
                />

                <CommerceCard
                  id={'1'}
                  image={'/assets/images/blackfriday.svg'}
                  productName={'Nome do Produto'}
                  value={5000}
                  discountValue={4}
                  description={'Lorem Ipsum is simply dummy text of the printing and typesetting industrk, Lorem Ipsum is simply dummy text of the printing and typesetting industrk, Lorem Ipsum is simply dummy text of the printing and typesetting industrk'}
                  starsValue={5}
                  componentType={'normal'}
                  minimumPoints={5000}
                />
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

          <div className={styles.footerContainer}>
            <MPFooter />
          </div>
        </div>
      </div>

    </div>
  )
}

export default DiscountsPage