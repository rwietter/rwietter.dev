import type { ForwardRefRenderFunction, PropsWithChildren } from 'react'
import React, { forwardRef, useImperativeHandle } from 'react'
import { GrClose } from 'react-icons/gr'
import styles from './styles.module.css'

type ModalRef = {
  open: () => void
  close: () => void
  toggle: () => void
}

type ModalPropTypes = {
  title: string
  children: React.ReactNode
}

const Modal: ForwardRefRenderFunction<
  ModalRef,
  PropsWithChildren<ModalPropTypes>
> = (props, ref) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const modalRef = React.useRef<HTMLDivElement>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const toggleModal = () => setIsModalOpen((prev) => !prev)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleClickOutside = React.useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal()
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal()
        }
      })

      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
    toggle: toggleModal,
  }))

  console.log(isModalOpen)

  return (
    <>
      {isModalOpen && (
        <>
          <div className={styles.modalBlurOverlay} />
          <div ref={modalRef} className={styles.modal}>
            <section className={styles.header}>
              <p>{props.title}</p>
              <GrClose
                role='button'
                onClick={closeModal}
                style={{ cursor: 'pointer' }}
              />
            </section>

            <section className={styles.content}>{props.children}</section>
          </div>
        </>
      )}
    </>
  )
}

interface ModalGroupProps extends PropsWithChildren {
  title: string
}

export const ModalGroup: React.FC<ModalGroupProps> = (props) => {
  return (
    <section className={styles.modalGroup}>
      <p>{props.title}</p>
      <section className={styles.modalGroupContent}>{props.children}</section>
    </section>
  )
}

export default forwardRef<ModalRef, ModalPropTypes>(Modal)
