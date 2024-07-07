import { useState } from 'react'
import Image from 'next/image'

import Navbar from '../Navbar'
import UserSidebar from '../UserSidebar'

import styles from './styles.module.scss'

import adminarrow from '@/public/assets/admin/tablearrow.svg'
import pagback from '@/public/assets/pagination/backarrow.svg'
import pagnext from '@/public/assets/pagination/nextarrow.svg'
import graphimg from '@/public/assets/admin/graphimg.svg'
import downloadicon from '@/public/assets/admin/download.svg'
import docicon from '@/public/assets/admin/doc.svg'
import personicon from '@/public/assets/admin/person.svg'

const fakeData = [
  { id: 1, nome: 'João Vinícius', nomeproduto: 'Porsche 911 Carrera S', data: '01/01/2024', valor: '5000000 SAL', status: 'Ativo'},
  { id: 2, nome: 'Maria Oliveira', nomeproduto: 'Produto A', data: '02/01/2024', valor: '2000 SAL', status: 'Ativo'},
  { id: 3, nome: 'José Silva', nomeproduto: 'Produto B', data: '03/01/2024', valor: '1500 SAL', status: 'Ativo'},
  { id: 4, nome: 'Ana Pereira', nomeproduto: 'Produto C', data: '04/01/2024', valor: '1200 SAL', status: 'Ativo'},
  { id: 5, nome: 'Carlos Santos', nomeproduto: 'Produto D', data: '05/01/2024', valor: '1800 SAL', status: 'Ativo'},
  { id: 6, nome: 'Mariana Lima', nomeproduto: 'Produto E', data: '06/01/2024', valor: '2200 SAL', status: 'Ativo'},
  { id: 7, nome: 'Paulo Costa', nomeproduto: 'Produto F', data: '07/01/2024', valor: '1600 SAL', status: 'Ativo'},
  { id: 8, nome: 'Isabel Rodrigues', nomeproduto: 'Produto G', data: '08/01/2024', valor: '1900 SAL', status: 'Ativo'},
  { id: 9, nome: 'Antônio Almeida', nomeproduto: 'Produto H', data: '09/01/2024', valor: '2100 SAL', status: 'Ativo'},
  { id: 10, nome: 'Amanda Oliveira', nomeproduto: 'Produto I', data: '10/01/2024', valor: '2300 SAL', status: 'Ativo'},
  { id: 11, nome: 'Fernando Silva', nomeproduto: 'Produto J', data: '11/01/2024', valor: '2400 SAL', status: 'Ativo'},
  { id: 12, nome: 'Juliana Pereira', nomeproduto: 'Produto K', data: '12/01/2024', valor: '2500 SAL', status: 'Ativo'},
  { id: 13, nome: 'Roberto Santos', nomeproduto: 'Produto L', data: '13/01/2024', valor: '2600 SAL', status: 'Ativo'},
  { id: 14, nome: 'Carla Lima', nomeproduto: 'Produto M', data: '14/01/2024', valor: '2700 SAL', status: 'Ativo'},
  { id: 15, nome: 'Eduardo Costa', nomeproduto: 'Produto N', data: '15/01/2024', valor: '2800 SAL', status: 'Ativo'},
  { id: 16, nome: 'Marta Rodrigues', nomeproduto: 'Produto O', data: '16/01/2024', valor: '2900 SAL', status: 'Ativo'},
  { id: 17, nome: 'Gustavo Almeida', nomeproduto: 'Produto P', data: '17/01/2024', valor: '3000 SAL', status: 'Ativo'},
  { id: 18, nome: 'Sofia Oliveira', nomeproduto: 'Produto Q', data: '18/01/2024', valor: '3100 SAL', status: 'Ativo'},
  { id: 19, nome: 'Lucas Pereira', nomeproduto: 'Produto R', data: '19/01/2024', valor: '3200 SAL', status: 'Ativo'},
  { id: 20, nome: 'Larissa Silva', nomeproduto: 'Produto S', data: '20/01/2024', valor: '3300 SAL', status: 'Ativo'},
  { id: 21, nome: 'Diego Almeida', nomeproduto: 'Produto T', data: '21/01/2024', valor: '3400 SAL', status: 'Ativo'},
  { id: 22, nome: 'Camila Costa', nomeproduto: 'Produto U', data: '22/01/2024', valor: '3500 SAL', status: 'Ativo'},
  { id: 23, nome: 'Vinícius Oliveira', nomeproduto: 'Produto V', data: '23/01/2024', valor: '3600 SAL', status: 'Ativo'},
  { id: 24, nome: 'Bianca Lima', nomeproduto: 'Produto W', data: '24/01/2024', valor: '3700 SAL', status: 'Ativo'},
  { id: 25, nome: 'Rodrigo Silva', nomeproduto: 'Produto X', data: '25/01/2024', valor: '3800 SAL', status: 'Ativo'},
  { id: 26, nome: 'Aline Pereira', nomeproduto: 'Produto Y', data: '26/01/2024', valor: '3900 SAL', status: 'Ativo'},
  { id: 27, nome: 'Marcos Costa', nomeproduto: 'Produto Z', data: '27/01/2024', valor: '4000 SAL', status: 'Ativo'},
  { id: 28, nome: 'Lívia Almeida', nomeproduto: 'Produto AA', data: '28/01/2024', valor: '4100 SAL', status: 'Ativo'},
  { id: 29, nome: 'Rafael Oliveira', nomeproduto: 'Produto BB', data: '29/01/2024', valor: '4200 SAL', status: 'Ativo'},
  { id: 30, nome: 'Cíntia Silva', nomeproduto: 'Produto CC', data: '30/01/2024', valor: '4300 SAL', status: 'Ativo'},
  { id: 31, nome: 'Hugo Pereira', nomeproduto: 'Produto DD', data: '31/01/2024', valor: '4400 SAL', status: 'Ativo'},
  { id: 32, nome: 'Isabela Lima', nomeproduto: 'Produto EE', data: '01/02/2024', valor: '4500 SAL', status: 'Ativo'},
  { id: 33, nome: 'Henrique Costa', nomeproduto: 'Produto FF', data: '02/02/2024', valor: '4600 SAL', status: 'Ativo'},
]

const pageSize = 8

interface TableProps {
  data: Array<{
    id: number;
    nome: string;
    nomeproduto: string;
    data: string;
    valor: string;
    status: string;
  }>;
  handleRemove: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, handleRemove }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Nome <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Nome do produto <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Data <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Valor <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Status <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.nomeproduto}</td>
              <td>{item.data}</td>
              <td>{item.valor}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const showEllipsis = totalPages > 5
  let pagesToDisplay: number[] = []

  if (!showEllipsis) {
    pagesToDisplay = Array.from({ length: totalPages }, (_, i) => i + 1)
  } else {
    if (currentPage <= 3) {
      pagesToDisplay = [1, 2, 3, 4, 5]
    } else if (currentPage >= totalPages - 2) {
      pagesToDisplay = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    } else {
      pagesToDisplay = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Image src={pagback} alt='Anterior' />
      </button>

      {pagesToDisplay.map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${currentPage === page ? styles.activePag : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.pagButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Image src={pagnext} alt='Próximo' />
      </button>
    </div>
  )
}

const SalesDashboardComponent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState(fakeData)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRemove = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id)
    setUsers(updatedUsers)
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = users.slice(startIndex, endIndex)
  const totalPages = Math.ceil(users.length / pageSize)

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
          <div className={styles.rowContainer}>
            <div className={styles.salesGrid}>
              <div className={styles.salesCard}>
                <div className={styles.leftContainer}>
                  <div className={styles.title}>
                    Receita Total
                  </div>

                  <div className={styles.value}>
                    $ 0,00
                  </div>

                  <div className={styles.increase}>
                    <span>+ {'12%'}</span> este mês
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <Image src={graphimg} alt='' />
                </div>
              </div>

              <div className={styles.salesCard}>
                <div className={styles.leftContainer}>
                  <div className={styles.title}>
                    Receita Total
                  </div>

                  <div className={styles.value}>
                    $ 0,00
                  </div>

                  <div className={styles.increase}>
                    <span>+ {'12%'}</span> este mês
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <Image src={graphimg} alt='' />
                </div>
              </div>

              <div className={styles.salesCard}>
                <div className={styles.leftContainer}>
                  <div className={styles.title}>
                    Receita Total
                  </div>

                  <div className={styles.value}>
                    $ 0,00
                  </div>

                  <div className={styles.increase}>
                    <span>+ {'12%'}</span> este mês
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <Image src={graphimg} alt='' />
                </div>
              </div>

              <div className={styles.salesCard}>
                <div className={styles.leftContainer}>
                  <div className={styles.title}>
                    Receita Total
                  </div>

                  <div className={styles.value}>
                    $ 0,00
                  </div>

                  <div className={styles.increase}>
                    <span>+ {'12%'}</span> este mês
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <Image src={graphimg} alt='' />
                </div>
              </div>
            </div>

            <div className={styles.generalCard}>
              <div className={styles.header}>
                <div className={styles.info}>
                  <div className={styles.label}>
                    Total
                  </div>

                  <div className={styles.value}>
                    $ {'0,00'}
                  </div>
                </div>

                <div className={styles.button}>
                  <Image src={downloadicon} alt='Donwload' />
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.label}>
                  SAL
                </div>

                <div className={styles.value}>
                  1.000
                </div>
              </div>

              <div className={styles.buttons}>
                <div className={styles.button} onClick={() => window.open('/salesdashboard', '_self')}>
                  <div className={styles.icon}>
                    <Image src={docicon} alt='Anúncios'/>
                  </div>

                  <div className={styles.text}>
                    Meus Anúncios
                  </div>
                </div>

                <div className={styles.button} onClick={() => window.open('/usermanagement', '_self')}>
                  <div className={styles.icon}>
                    <Image src={personicon} alt='Usuários'/>
                  </div>

                  <div className={styles.text}>
                    Usuários
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <Table data={currentData} handleRemove={() => null} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesDashboardComponent