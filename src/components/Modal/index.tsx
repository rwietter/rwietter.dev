'use client'

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
  const [isAnimating, setIsAnimating] = React.useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    setIsAnimating(false)
  }
  const closeModal = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsAnimating(false)
    }, 200)
  }
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useImperativeHandle(
    ref,
    () => ({
      open: openModal,
      close: closeModal,
      toggle: toggleModal,
    }),
    [],
  )

  return (
    <>
      {isModalOpen && (
        <>
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
            aria-describedby='modal-description'
            tabIndex={-1}
            className={styles.modalBlurOverlay}
          />
          <div
            ref={modalRef}
            className={`${styles.modal} ${isAnimating ? styles.modalClose : styles.modalOpen}`}
          >
            <section className={styles.header}>
              <h2 id='modal-title'>{props.title}</h2>
              <button
                className={styles.closeButton}
                aria-label='Close Modal'
                onClick={closeModal}
                type='button'
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text)',
                }}
              >
                <GrClose />
              </button>
            </section>
            <section id='modal-description' className={styles.content}>
              {props.children}
            </section>
          </div>
        </>
      )}
    </>
  )
}

interface ModalGroupProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLElement> {
  title: string
}

export const ModalGroup: React.FC<ModalGroupProps> = (
  { title, children },
  props,
) => {
  return (
    <section
      aria-labelledby='modal-group-title'
      aria-describedby='modal-group-description'
      className={styles.modalGroup}
      {...props}
    >
      <p id='modal-group-title'>{title}</p>
      <section
        id='modal-group-description'
        className={styles.modalGroupContent}
      >
        {children}
      </section>
    </section>
  )
}

export default forwardRef<ModalRef, ModalPropTypes>(Modal)
