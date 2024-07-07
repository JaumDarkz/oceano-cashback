import { useState } from 'react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import TextInput from '@/components/Auth/Reusable/TextInput'

import styles from './styles.module.scss'

import sendicon from '@/public/assets/admin/send.svg'

interface Props {
  onCancel: () => void;
  onSend: () => void;
}

const SendMessagePopup = ({onSend, onCancel}: Props) => {
  const [editorContent, setEditorContent] = useState('')

  return (
    <div className={styles.sendMessagePopupContainer}>
      <div className={styles.popup}>
        <div className={styles.title}>
          Nova Mensagem
        </div>

        <div className={styles.input}>
          <div className={styles.label}>
            Para
          </div>

          <TextInput placeholder='' inputData={() => ''} password={false} isDisabled={false} />
        </div>

        <div className={styles.input}>
          <div className={styles.label}>
            Assunto
          </div>

          <TextInput placeholder='' inputData={() => ''} password={false} isDisabled={false} />
        </div>

        <div className={styles.editor}>
          <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} />
        </div>

        <div className={styles.buttons}>
          <div className={styles.cancelButton} onClick={onCancel}>
            Cancelar
          </div>

          <div className={styles.sendButton} onClick={onSend}>
            <div className={styles.text}>
              Enviar
            </div>

            <div className={styles.icon}>
              <Image src={sendicon} alt='Enviar' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMessagePopup