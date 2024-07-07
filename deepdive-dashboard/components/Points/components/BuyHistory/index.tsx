import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

import success from '@/public/assets/badges/success.svg'
import pending from '@/public/assets/badges/pending.svg'
import denied from '@/public/assets/badges/denied.svg'
import backarrow from '@/public/assets/pagination/backarrow.svg'
import nextarrow from '@/public/assets/pagination/nextarrow.svg'

import { getMyOrders, productSearch } from '@/services/api'
import { formatDate } from '@/services/events'
import { AccountContext } from '@/contexts/accountContext'

const BuyHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 8

  const { orders } = useContext(AccountContext)

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {

    if (process.env.API_URL === undefined) {
      console.log('Cant Reach API URL')
      return
    }

    getMyOrders(process.env.API_URL).then((response) => {
      const data = response.data
      data.forEach((order: any) => {
        if (process.env.API_URL === undefined) return
        productSearch(process.env.API_URL, order.productId).then((response) => {
          const { date, hour } = formatDate(order.createdAt)
          const { name, price } = response.data[0]
          const tempData = {
            compras: name,
            valor: price * order.quantity,
            data: date,
            hora: hour,
            status: 'Concluído'
          }         
          orders.push(tempData)
          const startIndex = (currentPage - 1) * itemsPerPage
          const endIndex = startIndex + itemsPerPage
          const sortedOrders = orders.sort((a, b) => {
            const dateTimeA = new Date(`${a.data} ${a.hora}`)
            const dateTimeB = new Date(`${b.data} ${b.hora}`)
            return dateTimeA.getTime() - dateTimeB.getTime()
          })
          setCurrentPageData(sortedOrders.slice(startIndex, endIndex))
          setTotalPages(Math.ceil(orders.length / itemsPerPage))
        })
      }
      )
    })
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setCurrentPageData(orders.slice(startIndex, endIndex))
  }, [currentPage, totalPages])

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
        <tbody>{currentPageData.map((item, index) => (
          <tr key={index}>
            <td>{item.compras}</td>
            <td>{item.valor}</td>
            <td>{item.data}</td>
            <td>{item.hora}</td>
            <td>{item.status == 'Concluído' ? <Image src={success} alt='Sucesso' /> : item.status == 'Pendente' ? <Image src={pending} alt='Pendente' /> : item.status == 'Negado' ? <Image src={denied} alt='Negado' /> : null}</td>
          </tr>
        ))}</tbody>
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