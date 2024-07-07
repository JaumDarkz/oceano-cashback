import styles from './styles.module.scss'

interface Props {
  text: string;
  onConfirm: () => void;
  onCancel: () => void
}

const ConfirmationPopup = ({text, onConfirm, onCancel}: Props) => {
  return (
    <div className={styles.confirmationPopupContainer}>
      <div className={styles.popup}>
        <div className={styles.text}>
          {text}
        </div>

        <div className={styles.buttons}>
          <div className={styles.cancelButton} onClick={onCancel}>
            Cancelar
          </div>

          <div className={styles.confirmButton} onClick={onConfirm}>
            Salvar
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup