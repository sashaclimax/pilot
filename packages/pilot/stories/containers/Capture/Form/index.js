import React from 'react'
import { action } from '@storybook/addon-actions'

import CaptureForm from '../../../../src/containers/Capture/Form'

const CaptureFormExample = () => (
  <CaptureForm
    authorizedAmount={1000}
    cardBrand="Mastercard"
    cardFirstDigits="41414"
    cardLastDigits="4141"
    customerName="John Doe"
    customerEmail="johndoe@pagar.me"
    installments={1}
    onConfirm={action('Form submitted')}
    t={string => string}
  />
)

export default CaptureFormExample
