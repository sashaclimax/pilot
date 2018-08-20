import React from 'react'

import Result from '../../../../src/containers/Capture/Result'

const CaptureResult = () => (
  <Result
    authorizedAmount={1000}
    cardBrand="Mastercard"
    cardFirstDigits="41414"
    cardLastDigits="4141"
    customerName="John Doe"
    customerEmail="johndoe@pagar.me"
    installments={1}
    paidAmount={1000}
    t={t => t}
  />
)

export default CaptureResult
