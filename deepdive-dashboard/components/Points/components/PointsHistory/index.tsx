import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

import success from '@/public/assets/badges/success.svg'
import pending from '@/public/assets/badges/pending.svg'
import denied from '@/public/assets/badges/denied.svg'
import backarrow from '@/public/assets/pagination/backarrow.svg'
import nextarrow from '@/public/assets/pagination/nextarrow.svg'
import { AccountContext } from '@/contexts/accountContext'
import { getPointsHistory } from '@/services/events'
import { StatusContext } from '@/contexts/statusUpdater'

const PointsHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageData, setCurrentPageData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 8

  const { wallet, data, setData } = useContext(AccountContext)
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext)

  const DeepDiveHub = {
    80001: process.env.HUB_ADDRESS_MUMBAI,
    137: process.env.HUB_ADDRESS_POLYGON
  }

  const RpcUrl = {
    80001: process.env.RPC_URL_MUMBAI,
    137: process.env.RPC_URL_POLYGON
  }

  useEffect(() => {

    async function fetchData() {
      if (process.env.CURRENT_CHAIN_ID === undefined || process.env.DEPLOYMENT_BLOCK === undefined) {
        console.log('Cant Reach API URL')
        return
      }
      const chainId = parseInt(process.env.CURRENT_CHAIN_ID)

      const rpcUrl = RpcUrl[chainId as keyof typeof RpcUrl]
      if (typeof rpcUrl !== 'string') {
        console.log('Cant Reach API URL')
        return
      }
      const hubAddress = DeepDiveHub[chainId as keyof typeof DeepDiveHub]
      if (typeof hubAddress !== 'string') {
        throw new Error('Hub address is not a string')
      }
      const deploymentBlock = parseInt(process.env.DEPLOYMENT_BLOCK)
      if (isNaN(deploymentBlock)) {
        throw new Error('Deployment block is not a number')
      }

      // console.log(wallet)

      getPointsHistory(wallet, rpcUrl, hubAddress, deploymentBlock).then((response) => {
        
        for (let i = 0; i < response.amounts.length; i++) {
          data.push({
            pontos: parseInt(response.amounts[i]),
            data: response.dates[i].date,
            hora: response.dates[i].hour,
            status: 'Concluído'
          }
          )
        }
        setTotalPages(Math.ceil(data.length / itemsPerPage))
        setStatusUpdated(!statusUpdated)
      })
    }

    if(wallet) {
      fetchData()
    }
  }, [wallet])

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    const startIndex = ( currentPage - 1 ) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setCurrentPageData(data.slice(startIndex, endIndex))
  }, [currentPage, totalPages, statusUpdated])

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
        <tbody>{currentPageData.map((item, index) => (
          <tr key={index}>
            <td>{item.pontos}</td>
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

export default PointsHistory