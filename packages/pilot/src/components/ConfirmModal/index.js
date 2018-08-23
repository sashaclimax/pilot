import React from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Modal,
  ModalTitle,
  ModalContent,
} from 'former-kit'

import style from './style.css'

const closeIcon = <IconClose width={16} height={16} />

const ConfirmModal = ({
  cancelText,
  children,
  confirmText,
  isOpen,
  onCancel,
  onConfirm,
  title,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onCancel}
  >
    <ModalTitle
      title={title}
      closeIcon={closeIcon}
      onClose={onCancel}
    />
    <ModalContent>
      {children}
    </ModalContent>
    <div className={style.actions}>
      <Button
        fill="outline"
        size="default"
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        size="default"
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </div>
  </Modal>
)

ConfirmModal.propTypes = {
  cancelText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ConfirmModal
