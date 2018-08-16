import React from 'react'
import PropTypes from 'prop-types'
import { BulletSteps } from 'former-kit'

const mapStepToPosition = {
  'create-account': 1,
  'check-cnpj': 2,
  'type-cnpj': 2,
  'without-cnpj': 2,
  'company-data': 3,
  'partner-data-part-1': 4,
  'partner-data-part-2': 4,
}

const getStatus = (step, currentStep) => {
  if (step < currentStep) {
    return 'previous'
  }

  if (step === currentStep) {
    return 'current'
  }

  return 'next'
}

const SelfRegisterBulletSteps = ({ step }) => {
  const position = mapStepToPosition[step]

  return (<BulletSteps
    status={[
      { id: 'step-1', status: getStatus(1, position) },
      { id: 'step-2', status: getStatus(2, position) },
      { id: 'step-3', status: getStatus(3, position) },
      { id: 'step-4', status: getStatus(4, position) },
    ]}
    steps={[
      { id: 'step-1' },
      { id: 'step-2' },
      { id: 'step-3' },
      { id: 'step-4' },
    ]}
  />)
}

SelfRegisterBulletSteps.propTypes = {
  step: PropTypes.oneOf([
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data-part-1',
    'partner-data-part-2',
  ]).isRequired,
}

export default SelfRegisterBulletSteps
