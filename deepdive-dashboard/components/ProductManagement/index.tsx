import { useState } from 'react'
import Image from 'next/image'

import Navbar from '../Navbar'
import UserSidebar from '../UserSidebar'

import styles from './styles.module.scss'

import trashimg from '@/public/assets/admin/trashicon.svg'
import editicon from '@/public/assets/admin/editicon.svg'
import moneyicon from '@/public/assets/admin/moneyicon.svg'
import whitemoneyicon from '@/public/assets/admin/whitemoneyicon.svg'
import mailicon from '@/public/assets/admin/mailicon.svg'
import adminarrow from '@/public/assets/admin/tablearrow.svg'
import rolearrow from '@/public/assets/admin/rolearrow.svg'
import pagback from '@/public/assets/pagination/backarrow.svg'
import pagnext from '@/public/assets/pagination/nextarrow.svg'

const fakeData = [
  { id: 1, nome: 'Geladeira', valor: '3000 SAL', estoque: 1000, vendas: 50, devolucao: 0, status: 'Ativo'},
  { id: 2, nome: 'TV 4K', valor: '2000 SAL', estoque: 500, vendas: 30, devolucao: 2, status: 'Ativo'},
  { id: 3, nome: 'Notebook', valor: '2500 SAL', estoque: 300, vendas: 25, devolucao: 1, status: 'Ativo'},
  { id: 4, nome: 'Máquina de Lavar', valor: '1800 SAL', estoque: 800, vendas: 40, devolucao: 3, status: 'Ativo'},
  { id: 5, nome: 'Ar Condicionado', valor: '3500 SAL', estoque: 200, vendas: 20, devolucao: 0, status: 'Ativo'},
  { id: 6, nome: 'Câmera DSLR', valor: '1200 SAL', estoque: 150, vendas: 15, devolucao: 1, status: 'Ativo'},
  { id: 7, nome: 'Smartphone', valor: '1000 SAL', estoque: 600, vendas: 35, devolucao: 2, status: 'Ativo'},
  { id: 8, nome: 'Forno Elétrico', valor: '800 SAL', estoque: 400, vendas: 20, devolucao: 1, status: 'Ativo'},
  { id: 9, nome: 'Liquidificador', valor: '100 SAL', estoque: 1200, vendas: 60, devolucao: 5, status: 'Ativo'},
  { id: 10, nome: 'Micro-ondas', valor: '200 SAL', estoque: 300, vendas: 15, devolucao: 0, status: 'Ativo'},
  { id: 11, nome: 'Impressora', valor: '300 SAL', estoque: 250, vendas: 10, devolucao: 1, status: 'Ativo'},
  { id: 12, nome: 'Cadeira de Escritório', valor: '150 SAL', estoque: 180, vendas: 18, devolucao: 2, status: 'Ativo'},
  { id: 13, nome: 'Ventilador', valor: '50 SAL', estoque: 500, vendas: 25, devolucao: 3, status: 'Ativo'},
  { id: 14, nome: 'Secador de Cabelo', valor: '70 SAL', estoque: 200, vendas: 10, devolucao: 1, status: 'Ativo'},
  { id: 15, nome: 'Mesa de Jantar', valor: '500 SAL', estoque: 100, vendas: 5, devolucao: 0, status: 'Ativo'},
  { id: 16, nome: 'Teclado Mecânico', valor: '120 SAL', estoque: 80, vendas: 8, devolucao: 1, status: 'Ativo'},
  { id: 17, nome: 'Mouse sem Fio', valor: '80 SAL', estoque: 150, vendas: 12, devolucao: 2, status: 'Ativo'},
  { id: 18, nome: 'Tapete', valor: '30 SAL', estoque: 300, vendas: 15, devolucao: 1, status: 'Ativo'},
  { id: 19, nome: 'Fogão a Gás', valor: '400 SAL', estoque: 120, vendas: 6, devolucao: 0, status: 'Ativo'},
  { id: 20, nome: 'Cafeteira', valor: '60 SAL', estoque: 250, vendas: 20, devolucao: 2, status: 'Ativo'},
  { id: 21, nome: 'Sofá', valor: '800 SAL', estoque: 70, vendas: 7, devolucao: 0, status: 'Ativo'},
  { id: 22, nome: 'Panela Elétrica', valor: '100 SAL', estoque: 180, vendas: 18, devolucao: 1, status: 'Ativo'},
  { id: 23, nome: 'Batedeira', valor: '80 SAL', estoque: 100, vendas: 5, devolucao: 0, status: 'Ativo'},
  { id: 24, nome: 'Aspirador de Pó', valor: '150 SAL', estoque: 120, vendas: 10, devolucao: 1, status: 'Ativo'},
  { id: 25, nome: 'Caixa de Som Bluetooth', valor: '50 SAL', estoque: 300, vendas: 15, devolucao: 2, status: 'Ativo'},
  { id: 26, nome: 'Relógio de Parede', valor: '30 SAL', estoque: 250, vendas: 25, devolucao: 1, status: 'Ativo'},
  { id: 27, nome: 'Fone de Ouvido', valor: '40 SAL', estoque: 200, vendas: 20, devolucao: 1, status: 'Ativo'},
  { id: 28, nome: 'Pipoqueira', valor: '80 SAL', estoque: 150, vendas: 10, devolucao: 0, status: 'Ativo'},
  { id: 29, nome: 'Aparelho de Jantar', valor: '120 SAL', estoque: 80, vendas: 8, devolucao: 1, status: 'Ativo'},
  { id: 30, nome: 'Cortina', valor: '40 SAL', estoque: 200, vendas: 10, devolucao: 0, status: 'Ativo'},
  { id: 31, nome: 'Escova Elétrica', valor: '50 SAL', estoque: 150, vendas: 15, devolucao: 1, status: 'Ativo'},
]
const pageSize = 8

interface TableProps {
  data: Array<{
    id: number;
    nome: string;
    valor: string;
    estoque: number;
    vendas: number;
    devolucao: number;
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
            <th>Nome do Produto <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Valor <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Estoque <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Vendas <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Devolução <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Status <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.valor}</td>
              <td>{item.estoque}</td>
              <td>{item.vendas}</td>
              <td>{item.devolucao}</td>
              <td>{item.status}</td>
              <td className={styles.controlButtons}>
                <div onClick={() => handleRemove(item.id)}><Image src={trashimg} alt='Deletar' /></div>
                <div><Image src={editicon} alt='Editar' /></div>
              </td>
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

const ProductManagementComponent = () => {
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
          <div className={styles.title}>
            Gestão de Produtos
          </div>

          <div className={styles.description}>
            Tellus molestie nunc non blandit massa enim. In iaculis nunc sed augue lacus viverra vitae congue.
          </div>

          <div className={styles.tableContainer}>
            <Table data={currentData} handleRemove={handleRemove} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductManagementComponent