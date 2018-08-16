import React from 'react'
import PropTypes from 'prop-types'

import StepCreateAccount from './step-create-account'
import StepCheckCNPJ from './step-check-cnpj'
import StepTypeCNPJ from './step-type-cnpj'
import StepWithoutCNPJ from './step-without-cnpj'
import StepCompanyData from './step-company-data'
import StepPartnerDataPart1 from './step-partner-data-part-1'
import StepPartnerDataPart2 from './step-partner-data-part-2'

const mapStepToContainer = {
  'create-account': StepCreateAccount,
  'check-cnpj': StepCheckCNPJ,
  'type-cnpj': StepTypeCNPJ,
  'without-cnpj': StepWithoutCNPJ,
  'company-data': StepCompanyData,
  'partner-data-part-1': StepPartnerDataPart1,
  'partner-data-part-2': StepPartnerDataPart2,
}

const SelfRegisterForm = ({
  onRedirectToHome,
  onSubmit,
  step,
  t,
}) => {
  const container = mapStepToContainer[step]

  return React.createElement(container, {
    onRedirectToHome,
    onSubmit,
    t,
  })
}

SelfRegisterForm.propTypes = {
  onRedirectToHome: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.oneOf([
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data-part-1',
    'partner-data-part-2',
  ]).isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterForm
