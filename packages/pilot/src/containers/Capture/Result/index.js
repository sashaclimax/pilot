import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

import decimalCurrency from '../../../formatters/decimalCurrency'
import CaptureDetails from '../../../components/CaptureDetails'

import style from './style.css'

const Result = ({
  authorizedAmount,
  cardBrand,
  cardFirstDigits,
  cardLastDigits,
  customerName,
  customerEmail,
  installments,
  paidAmount,
  t,
}) => (
  <div>
    <div className={style.image} />
    <CaptureDetails
      labels={{
        amount: t('pages.transaction.header.card_amount'),
        captureAmount: t('pages.capture.value_to_capture'),
        cardBrand: t('models.card.brand'),
        cardNumber: t('models.card.number'),
        customerName: t('models.customer.name'),
        customerEmail: t('models.customer.email'),
        installments: t('installments'),
      }}
      contents={{
        amount: decimalCurrency(authorizedAmount),
        captureAmount: decimalCurrency(paidAmount),
        cardBrand,
        cardNumber: `${cardFirstDigits} •••• •••• ${cardLastDigits}`,
        customerName,
        customerEmail,
        installments,
      }}
    />
    <div className={style.actions}>
      <Button>{t('view_transaction')}</Button>
    </div>
  </div>
)

Result.propTypes = {
  authorizedAmount: PropTypes.number.isRequired,
  cardBrand: PropTypes.string,
  cardFirstDigits: PropTypes.string,
  cardLastDigits: PropTypes.string,
  customerName: PropTypes.string,
  customerEmail: PropTypes.string,
  installments: PropTypes.number,
  paidAmount: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

Result.defaultProps = {
  cardBrand: '',
  cardFirstDigits: '',
  cardLastDigits: '',
  customerName: '',
  customerEmail: '',
  installments: 0,
}

export default Result
