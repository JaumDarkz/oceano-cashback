import React, { useState } from 'react' 
import Image from 'next/image'

import Navbar from '../Navbar'
import UserSidebar from '../UserSidebar'
import ConfirmationPopup from './components/ConfirmationPopup'
import AddSalPopup from './components/AddSalPopup'
import SendMessagePopup from './components/SendMessagePopup'

import styles from './styles.module.scss'

import graydownarrow from '@/public/assets/icons/lightgraydownarrow.svg'
import filterfilled from '@/public/assets/icons/filterfilled.svg'
import graysearch from '@/public/assets/icons/graysearch.svg'
import pagback from '@/public/assets/pagination/backarrow.svg'
import pagnext from '@/public/assets/pagination/nextarrow.svg'
import trashimg from '@/public/assets/admin/trashicon.svg'
import editicon from '@/public/assets/admin/editicon.svg'
import moneyicon from '@/public/assets/admin/moneyicon.svg'
import whitemoneyicon from '@/public/assets/admin/whitemoneyicon.svg'
import mailicon from '@/public/assets/admin/mailicon.svg'
import adminarrow from '@/public/assets/admin/tablearrow.svg'
import rolearrow from '@/public/assets/admin/rolearrow.svg'

const fakeData = [
  { id: 1, nome: 'Usuario1', email: 'usuario1@example.com', saldo: 1000, status: 'Ativo', cargo: 'Admin', carteira: '1234-5678'},
  { id: 2, nome: 'Usuario2', email: 'usuario2@example.com', saldo: 2000, status: 'Inativo', cargo: 'Usuário', carteira: '5678-1234'},
  { id: 3, nome: 'Usuario3', email: 'usuario3@example.com', saldo: 1500, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 4, nome: 'Usuario4', email: 'usuario4@example.com', saldo: 3000, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
  { id: 5, nome: 'Usuario5', email: 'usuario5@example.com', saldo: 2500, status: 'Ativo', cargo: 'Usuário', carteira: '8765-4321'},
  { id: 6, nome: 'Usuario6', email: 'usuario6@example.com', saldo: 1800, status: 'Inativo', cargo: 'Moderador', carteira: '3456-7890'},
  { id: 7, nome: 'Usuario7', email: 'usuario7@example.com', saldo: 2200, status: 'Ativo', cargo: 'Admin', carteira: '5678-1234'},
  { id: 8, nome: 'Usuario8', email: 'usuario8@example.com', saldo: 2700, status: 'Inativo', cargo: 'Usuário', carteira: '1234-5678'},
  { id: 9, nome: 'Usuario9', email: 'usuario9@example.com', saldo: 1300, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 10, nome: 'Usuario10', email: 'usuario10@example.com', saldo: 3200, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
  { id: 11, nome: 'Usuario11', email: 'usuario11@example.com', saldo: 1900, status: 'Ativo', cargo: 'Usuário', carteira: '8765-4321'},
  { id: 12, nome: 'Usuario12', email: 'usuario12@example.com', saldo: 2800, status: 'Inativo', cargo: 'Moderador', carteira: '3456-7890'},
  { id: 13, nome: 'Usuario13', email: 'usuario13@example.com', saldo: 2400, status: 'Ativo', cargo: 'Admin', carteira: '5678-1234'},
  { id: 14, nome: 'Usuario14', email: 'usuario14@example.com', saldo: 3100, status: 'Inativo', cargo: 'Usuário', carteira: '1234-5678'},
  { id: 15, nome: 'Usuario15', email: 'usuario15@example.com', saldo: 1700, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 16, nome: 'Usuario16', email: 'usuario16@example.com', saldo: 2600, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
  { id: 17, nome: 'Usuario17', email: 'usuario17@example.com', saldo: 2300, status: 'Ativo', cargo: 'Usuário', carteira: '8765-4321'},
  { id: 18, nome: 'Usuario18', email: 'usuario18@example.com', saldo: 2900, status: 'Inativo', cargo: 'Moderador', carteira: '3456-7890'},
  { id: 19, nome: 'Usuario19', email: 'usuario19@example.com', saldo: 2000, status: 'Ativo', cargo: 'Admin', carteira: '5678-1234'},
  { id: 20, nome: 'Usuario20', email: 'usuario20@example.com', saldo: 1800, status: 'Inativo', cargo: 'Usuário', carteira: '1234-5678'},
  { id: 21, nome: 'Usuario21', email: 'usuario21@example.com', saldo: 2500, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 22, nome: 'Usuario22', email: 'usuario22@example.com', saldo: 3000, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
  { id: 23, nome: 'Usuario23', email: 'usuario23@example.com', saldo: 1900, status: 'Ativo', cargo: 'Usuário', carteira: '8765-4321'},
  { id: 24, nome: 'Usuario24', email: 'usuario24@example.com', saldo: 2800, status: 'Inativo', cargo: 'Moderador', carteira: '3456-7890'},
  { id: 25, nome: 'Usuario25', email: 'usuario25@example.com', saldo: 2200, status: 'Ativo', cargo: 'Admin', carteira: '5678-1234'},
  { id: 26, nome: 'Usuario26', email: 'usuario26@example.com', saldo: 3100, status: 'Inativo', cargo: 'Usuário', carteira: '1234-5678'},
  { id: 27, nome: 'Usuario27', email: 'usuario27@example.com', saldo: 2000, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 28, nome: 'Usuario28', email: 'usuario28@example.com', saldo: 2900, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
  { id: 29, nome: 'Usuario29', email: 'usuario29@example.com', saldo: 2400, status: 'Ativo', cargo: 'Usuário', carteira: '8765-4321'},
  { id: 30, nome: 'Usuario30', email: 'usuario30@example.com', saldo: 1800, status: 'Inativo', cargo: 'Moderador', carteira: '3456-7890'},
  { id: 31, nome: 'Usuario31', email: 'usuario31@example.com', saldo: 2700, status: 'Ativo', cargo: 'Admin', carteira: '5678-1234'},
  { id: 32, nome: 'Usuario32', email: 'usuario32@example.com', saldo: 3200, status: 'Inativo', cargo: 'Usuário', carteira: '1234-5678'},
  { id: 33, nome: 'Usuario33', email: 'usuario33@example.com', saldo: 1900, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 34, nome: 'Usuario34', email: 'usuario34@example.com', saldo: 2600, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
  { id: 35, nome: 'Usuario35', email: 'usuario35@example.com', saldo: 2300, status: 'Ativo', cargo: 'Usuário', carteira: '8765-4321'},
  { id: 36, nome: 'Usuario36', email: 'usuario36@example.com', saldo: 3000, status: 'Inativo', cargo: 'Moderador', carteira: '3456-7890'},
  { id: 37, nome: 'Usuario37', email: 'usuario37@example.com', saldo: 2000, status: 'Ativo', cargo: 'Admin', carteira: '5678-1234'},
  { id: 38, nome: 'Usuario38', email: 'usuario38@example.com', saldo: 2900, status: 'Inativo', cargo: 'Usuário', carteira: '1234-5678'},
  { id: 39, nome: 'Usuario39', email: 'usuario39@example.com', saldo: 2500, status: 'Ativo', cargo: 'Moderador', carteira: '9876-5432'},
  { id: 40, nome: 'Usuario40', email: 'usuario40@example.com', saldo: 3100, status: 'Inativo', cargo: 'Admin', carteira: '2345-6789'},
]
const pageSize = 8

interface TableProps {
  data: Array<{
    id: number;
    nome: string;
    email: string;
    saldo: number;
    status: string;
    cargo: string;
    carteira: string;
  }>;
  handleRemove: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, handleRemove }) => {
  const [editPopup, setEditPopup] = useState(false)
  const [addSalPopup, setAddSalPopup] = useState(false)
  const [editConfirmationPopup, setEditConfirmationPopup] = useState(false)
  const [addSalConfirmationPopup, setAddSalConfirmationPopup] = useState(false)
  const [sendMessagePopup, setSendMessagePopup] = useState(false)
  const [sendMessageConfirmationPopup, setSendMessageConfirmationPopup] = useState(false)

  const [role, setRole] = useState('')
  const [roleDropdown, setRoleDropdown] = useState(false)

  const handleEditConfirm = () => {
    setEditConfirmationPopup(false)
    setEditPopup(false)
  }

  const handleEditCancel = () => {
    setEditConfirmationPopup(false)
  }

  const handleAddSalConfirm = () => {
    setAddSalConfirmationPopup(true)
  }

  const handleAddSalCancel = () => {
    setAddSalPopup(false)
  }

  const handleSendMessageConfirm = () => {
    setSendMessageConfirmationPopup(true)
  }

  const handleSendMessageCancel = () => {
    setSendMessagePopup(false)
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome dos usuários <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>E-mail <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Saldo <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Status <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Cargo <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Carteira <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th>Carteira <Image className={styles.img} src={adminarrow} alt='Seta' /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.email}</td>
              <td>{item.saldo}</td>
              <td>{item.status}</td>
              <td>{item.cargo}</td>
              <td>{item.carteira}</td>
              <td>{item.carteira}</td>
              <td className={styles.controlButtons}>
                <div onClick={() => handleRemove(item.id)}><Image src={trashimg} alt='Deletar' /></div>
                <div onClick={() => setEditPopup(true)}><Image src={editicon} alt='Editar' /></div>
                <div onClick={() => setAddSalPopup(true)}><Image src={moneyicon} alt='Adicionar SAL' /></div>
                <div onClick={() => setSendMessagePopup(true)}><Image src={mailicon} alt='Mensagem' /></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editPopup &&
        <div className={styles.editPopupContainer}>
          <div className={styles.popup}>
            <div className={styles.popuptitle}>
              Editar [{'Nome do usuário'}]
            </div>

            <div className={styles.salInput}>
              <div className={styles.sal}>
                <div className={styles.label}>
                  Saldo
                </div>

                <div className={styles.salInfo}>
                  <div className={styles.text}>
                    SAL
                  </div>

                  <div className={styles.salAmount}>
                    {'3000'}
                  </div>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <div className={styles.button} onClick={() => setAddSalPopup(true)}>
                  <div className={styles.icon}>
                    <Image src={whitemoneyicon} alt='Adicionar Sal' />
                  </div>

                  <div className={styles.text}>
                    Add SAL
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.emailInput}>
              <div className={styles.label}>
                E-mail
              </div>

              <div className={styles.input}>
                <input type="text" defaultValue={'emaildousuario@mail.com'} />

                <Image src={editicon} alt='' />
              </div>
            </div>

            <div className={styles.roleInput}>
              <div className={styles.label}>
                Cargo
              </div>

              <div className={styles.input} onClick={() => setRoleDropdown(!roleDropdown)}>
                <div className={role == 'Admin' ? styles.admin : role == 'Moderador' ? styles.mod : role == 'Usuário' ? styles.user : ''}>
                  {role}
                </div>

                <div className={styles.arrow}>
                  <Image src={rolearrow} alt='Editar Cargo' />
                </div>
              </div>
              
              {roleDropdown &&
                <div className={styles.dropdown}>
                  <div className={styles.admin} onClick={() => {setRole('Admin'); setRoleDropdown(false)}}>
                    Admin
                  </div>

                  <div className={styles.mod} onClick={() => {setRole('Moderador'); setRoleDropdown(false)}}>
                    Moderador
                  </div>

                  <div className={styles.user} onClick={() => {setRole('Usuário'); setRoleDropdown(false)}}>
                    Usuário
                  </div>
                </div>
              }
            </div>

            <div className={styles.buttons}>
              <div className={styles.cancelButton} onClick={() => setEditPopup(false)}>
                Cancelar
              </div>

              <div className={styles.confirmButton} onClick={() => setEditConfirmationPopup(true)}>
                Salvar
              </div>
            </div>
          </div>
        </div>
      }

      {editConfirmationPopup &&
        <ConfirmationPopup text='Salvar as alterações do [Nome do Usuário]. Deseja continuar?' onCancel={handleEditCancel} onConfirm={handleEditConfirm} />
      }

      {addSalPopup &&
        <AddSalPopup onConfirm={handleAddSalConfirm} onCancel={handleAddSalCancel} />
      }

      {addSalConfirmationPopup &&
        <ConfirmationPopup onConfirm={() => {setAddSalConfirmationPopup(false); setAddSalPopup(false)}} onCancel={() => setAddSalConfirmationPopup(false)} text='Você está prestes a adicionar [Valor] à conta de [Nome do Usuário]. Deseja confirmar a transação?' />
      }

      {sendMessagePopup &&
        <SendMessagePopup onSend={handleSendMessageConfirm} onCancel={handleSendMessageCancel} />
      }

      {sendMessageConfirmationPopup &&
        <ConfirmationPopup onCancel={() => setSendMessageConfirmationPopup(false)} onConfirm={() => {setSendMessageConfirmationPopup(false); setSendMessagePopup(false)}} text='Sua mensagem está a caminho de [Nome do Usuário]. Deseja enviar?' />
      }
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

const UserManagementComponent = () => {
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
            Gestão de Usuário
          </div>

          <div className={styles.description}>
            Tellus molestie nunc non blandit massa enim. In iaculis nunc sed augue lacus viverra vitae congue.
          </div>

          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <div className={styles.icon}>
                <Image src={graysearch} alt='Pesquisar' />
              </div>


              <div className={styles.input}>
                <input type="text" placeholder='Pesqiuse aqui' className={styles.HTMLinput} />
              </div>
            </div>

            <div className={styles.filtersContainer}>
              <div className={styles.icon}>
                <Image src={filterfilled} alt='Filtros' />
              </div>

              <div className={styles.text}>
                Filtros
              </div>

              <div className={styles.icon}>
                <Image src={graydownarrow} alt='Filtros' />
              </div>
            </div>
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

export default UserManagementComponent