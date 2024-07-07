import { useState } from 'react'
import Image from 'next/image'

import TextInput from '../Auth/Reusable/TextInput'
import Navbar from '../Navbar'
import UserSidebar from '../UserSidebar'

import styles from './styles.module.scss'

import downarrow from '@/public/assets/icons/graydownarrow.svg'
import selectimage from '@/public/assets/icons/selectimage.svg'
import successstatus from '@/public/assets/icons/successstatus.svg'
import deleteimg from '@/public/assets/icons/deleteimg.svg'

const SalesPanelComponent = () => {
  const [categoryActive, setCategoryActive] = useState(false)
  const [categorySelected, setCategorySelected] = useState('')

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
          <div className={styles.headerContainer}>
            <div className={styles.title}>
              O que você está anunciando?
            </div>

            <div className={styles.button}>
              Enviar Anuncio 
            </div>
          </div>

          <div className={styles.description}>
            Tellus molestie nunc non blandit massa enim. In iaculis nunc sed augue lacus viverra vitae congue.
          </div>

          <div className={styles.inputsContainer}>
            <div className={styles.textInput}>
              <div className={styles.label}>
                Nome do Produto:
              </div>

              <TextInput inputData={() => ''} password={false} placeholder='' isDisabled={false} />
            </div>
            
            <div className={styles.doubleTextInput}>
              <div className={styles.textInput}>
                <div className={styles.label}>
                  Preço:
                </div>

                <TextInput inputData={() => ''} password={false} placeholder='' isDisabled={false} />
              </div>

              <div className={styles.textInput}>
                <div className={styles.label}>
                  Estoque:
                </div>

                <TextInput inputData={() => ''} password={false} placeholder='' isDisabled={false} />
              </div>
            </div>

            <div className={styles.selectInput} onClick={() => setCategoryActive(!categoryActive)}>
              <div className={styles.label}>
                Categoria:
              </div>

              <div className={styles.input}>
                <div className={styles.inputData}>
                  {categorySelected}
                </div>

                <div className={styles.arrow}>
                  <Image src={downarrow} alt='Categoria' />
                </div>
              </div>
              
              {categoryActive &&
                <div className={styles.categoryDropdown}>
                  <div className={styles.option} onClick={() => setCategorySelected('Lorem1')}>
                    Lorem1
                  </div>

                  <div className={styles.option} onClick={() => setCategorySelected('Lorem2')}>
                    Lorem2
                  </div>

                  <div className={styles.option} onClick={() => setCategorySelected('Lorem3')}>
                    Lorem3
                  </div>

                  <div className={styles.option} onClick={() => setCategorySelected('Lorem4')}>
                    Lorem4
                  </div>

                  <div className={styles.option} onClick={() => setCategorySelected('Lorem5')}>
                    Lorem5
                  </div>

                  <div className={styles.option} onClick={() => setCategorySelected('Lorem6')}>
                    Lorem6
                  </div>
                </div>
              }
            </div>

            <div className={styles.descriptionInput}>
              <div className={styles.label}>
                Descrição:
              </div>

              <div className={styles.input}>
                <textarea className={styles.HTMLinput} />
              </div>
            </div>

            <div className={styles.imageInput}>
              <div className={styles.label}>
                Imagem do Produto:
              </div>

              <div className={styles.input}>
                <div className={styles.imageIcon}>
                  <Image src={selectimage} alt='Selecionar Imagem'/>
                </div>

                <div className={styles.text}>
                  Arraste e solte arquivos ou <span>navegue pelos arquivos</span>
                </div>

                <div className={styles.limitationsText}>
                  JPG, PNG - Tamanho máximo do arquivo 2 MB
                </div>
              </div>
            </div>

            <div className={styles.imageViewer}>
              <div>
                <div className={styles.icon}>
                  <Image src={successstatus} alt='Imagem' />
                </div>
              

                <div className={styles.filename}>
                  {'File Name.png'}
                </div>
              </div>
              
              <div>
                <div className={styles.filesize}>
                  {'4.0MB'}
                </div>

                <div className={styles.delete}>
                  <Image src={deleteimg} alt='Deletar' />
                </div>
              </div>
            </div>

            <div className={styles.orSeparator}>
              <div className={styles.line} />

              <div className={styles.text}>
                OU
              </div>

              <div className={styles.line} />
            </div>

            <div className={styles.linkInput}>
              <TextInput inputData={() => ''} password={false} placeholder='Add from URL' isDisabled={false} />

              <div className={styles.button}>
                Add 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesPanelComponent