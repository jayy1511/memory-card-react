import styles from "./ModalComp.module.css"

export type TModalProps = {
  showModal: boolean
  toggleModal: (show: boolean) => void
}

const ModalComp = ({ showModal, toggleModal }: TModalProps) => {
  return (
    <section
      className={styles.final_result}
      style={{ visibility: showModal ? "visible" : "hidden" }}
      aria-hidden={!showModal}
    >
      <button onClick={() => toggleModal(false)} className={styles.final_btn}>
        ×
      </button>
      <div className={styles.final_container}>
        <h2 className={styles.final_title}>You won!</h2>
        <span className={styles.final_icon}>🏆</span>
        <span onClick={() => toggleModal(false)} className={styles.final_text}>
          Click to start again
        </span>
      </div>
    </section>
  )
}

export default ModalComp
