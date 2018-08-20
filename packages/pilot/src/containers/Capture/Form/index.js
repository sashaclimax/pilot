import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormInput,
  ModalContent,
} from 'former-kit'

import decimalCurrency from '../../../formatters/decimalCurrency'
import CurrencyInput from '../../../components/CurrencyInput'
import CaptureDetails from '../../../components/CaptureDetails'

import style from './style.css'

const CaptureForm = ({
  authorizedAmount,
  cardBrand,
  cardFirstDigits,
  cardLastDigits,
  customerName,
  customerEmail,
  installments,
  onConfirm,
  t,
}) => {
  const handleSubmit = (e) => {
    onConfirm()
    e.preventDefault()
  }

  const labels = {
    amount: t('pages.transaction.header.card_amount'),
    captureAmount: t('pages.capture.value_to_capture'),
    cardBrand: t('models.card.brand'),
    cardNumber: t('models.card.number'),
    customerName: t('models.customer.name'),
    customerEmail: t('models.customer.email'),
    installments: t('installments'),
  }

  const contents = {
    amount: decimalCurrency(authorizedAmount),
    captureAmount: (
      <FormInput
        renderer={props => (
          <CurrencyInput
            {...props}
          />
        )}
        value="0"
      />
    ),
    cardBrand,
    cardNumber: `${cardFirstDigits} •••• •••• ${cardLastDigits}`,
    customerName,
    customerEmail,
    installments,
  }

  return (
    <form onSubmit={handleSubmit}>
      <ModalContent>
        <CaptureDetails labels={labels} contents={contents} />
      </ModalContent>
      <div className={style.actions}>
        <Button type="submit">
          {t('pages.capture.capture_action')}
        </Button>
      </div>
    </form>
  )
}

CaptureForm.propTypes = {
  authorizedAmount: PropTypes.number.isRequired,
  cardBrand: PropTypes.string,
  cardFirstDigits: PropTypes.string,
  cardLastDigits: PropTypes.string,
  customerName: PropTypes.string,
  customerEmail: PropTypes.string,
  installments: PropTypes.number,
  onConfirm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

CaptureForm.defaultProps = {
  cardBrand: null,
  cardFirstDigits: null,
  cardLastDigits: null,
  customerName: null,
  customerEmail: null,
  installments: null,
}

export default CaptureForm
