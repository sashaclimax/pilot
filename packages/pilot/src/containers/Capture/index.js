import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalContent,
  ModalTitle,
  Steps,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import CaptureForm from './Form'
import CaptureResult from './Result'

const Capture = ({
  isOpen,
  stepStatus,
  t,
  transaction,
}) => {
  const {
    authorized_amount: authorizedAmount,
    card,
    customer,
    installments,
    paid_amount: paidAmount,
  } = transaction

  return (
    <Modal
      isOpen={isOpen}
    >
      <ModalTitle
        closeIcon={<IconClose height={16} width={16} />}
        title={t('pages.capture.title')}
      />
      <Steps
        status={[
          { id: 'confirmation', status: stepStatus.confirmation },
          { id: 'result', status: stepStatus.result },
        ]}
        steps={[
          { id: 'confirmation', title: t('pages.capture.step_title_confirmation') },
          { id: 'result', title: t('pages.capture.step_title_result') },
        ]}
      />
      <ModalContent>
        { stepStatus.confirmation === 'current' &&
          <CaptureForm
            authorizedAmount={authorizedAmount}
            cardBrand={card.brand}
            cardFirstDigits={card.first_digits}
            cardLastDigits={card.last_digits}
            customerName={customer.name}
            customerEmail={customer.email}
            installments={installments}
            paidAmount={paidAmount}
            t={t}
          />
        }
        { stepStatus.result === 'current' &&
          <CaptureResult
            authorizedAmount={authorizedAmount}
            cardBrand={card.brand}
            cardFirstDigits={card.first_digits}
            cardLastDigits={card.last_digits}
            customerName={customer.name}
            customerEmail={customer.email}
            installments={installments}
            paidAmount={paidAmount}
            t={t}
          />
        }
      </ModalContent>
    </Modal>
  )
}

Capture.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.oneOf([
      'current', 'error', 'pending', 'success',
    ]),
    result: PropTypes.oneOf([
      'current', 'error', 'pending', 'success',
    ]),
  }),
  t: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    authorized_amount: PropTypes.number.isRequired,
    installments: PropTypes.number,
    card_first_digits: PropTypes.string,
    card_last_digits: PropTypes.string,
    card_brand: PropTypes.string,
    payment_method: PropTypes.string,
    customer: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
}

Capture.defaultProps = {
  stepStatus: {
    confirmation: 'current',
    result: 'pending',
  },
}

export default Capture
