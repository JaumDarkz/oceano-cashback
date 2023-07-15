import { useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

import success from '@/public/assets/badges/success.svg'
import pending from '@/public/assets/badges/pending.svg'
import denied from '@/public/assets/badges/denied.svg'
import backarrow from '@/public/assets/pagination/backarrow.svg'
import nextarrow from '@/public/assets/pagination/nextarrow.svg'

const BuyHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const data = [
    { pontos: 10, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { pontos: 5, data: '2023-07-02', hora: '09:45', status: 'Pendente' },
    { pontos: 8, data: '2023-07-03', hora: '12:15', status: 'Concluído' },
    { pontos: 3, data: '2023-07-04', hora: '18:20', status: 'Pendente' },
    { pontos: 12, data: '2023-07-05', hora: '11:10', status: 'Concluído' },
    { pontos: 7, data: '2023-07-06', hora: '14:40', status: 'Negado' },
    { pontos: 6, data: '2023-07-07', hora: '16:55', status: 'Concluído' },
    { pontos: 9, data: '2023-07-08', hora: '10:25', status: 'Pendente' },
    { pontos: 4, data: '2023-07-09', hora: '13:35', status: 'Concluído' },
    { pontos: 11, data: '2023-07-10', hora: '19:05', status: 'Pendente' },
    { pontos: 2, data: '2023-07-11', hora: '08:50', status: 'Negado' },
    { pontos: 15, data: '2023-07-12', hora: '17:30', status: 'Pendente' },
    { pontos: 13, data: '2023-07-13', hora: '10:15', status: 'Concluído' },
    { pontos: 7, data: '2023-07-14', hora: '12:45', status: 'Pendente' },
    { pontos: 9, data: '2023-07-15', hora: '14:20', status: 'Concluído' },
  ]

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const renderTableData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageData = data.slice(startIndex, endIndex)

    return currentPageData.map((item, index) => (
      <tr key={index}>
        <td>{item.pontos}</td>
        <td>{item.data}</td>
        <td>{item.hora}</td>
        <td>{item.status == 'Concluído' ? <Image src={success} alt='Sucesso'  /> : item.status == 'Pendente' ? <Image src={pending} alt='Pendente'  /> : item.status == 'Negado' ? <Image src={denied} alt='Negado'  /> : null}</td>
      </tr>
    ))
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.columns}>
            <th>Pontos</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>

      <div className={styles.paginationContainer}>
        <button onClick={handleClickPrev} disabled={currentPage === 1} className={styles.backButton}><Image src={backarrow} alt='Anterior' /></button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleClickNext} disabled={currentPage === totalPages} className={styles.nextButton}><Image src={nextarrow} alt='Próximo' /></button>
      </div>
    </div>
  )
}

export default BuyHistory