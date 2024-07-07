import styles from './styles.module.scss'

interface Props {
  onConfirm: () => void;
  onCancel: () => void
}

const AddSalPopup = ({onConfirm, onCancel}:Props) => {
  return (
    <div className={styles.addSalPopupContainer}>
      <div className={styles.popup}>
        <div className={styles.salInput}>
          <div className={styles.label}>
            Quanto você deseja adicionar?
          </div>

          <div className={styles.salInfo}>
            <div className={styles.text}>
              SAL
            </div>

            <div className={styles.salAmount}>
              <input type="text" />
            </div>
          </div>
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

export default AddSalPopup