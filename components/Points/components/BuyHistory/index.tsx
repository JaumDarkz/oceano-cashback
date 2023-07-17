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
    { compras: 'Air fryer', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Geladeira Electrolux', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Celular', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
    { compras: 'Produto', valor: 829, data: '2023-07-01', hora: '15:30', status: 'Concluído' },
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
        <td>{item.compras}</td>
        <td>{item.valor}</td>
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
            <th>Compras</th>
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