import React from 'react'
import { identity } from 'ramda'
import { action } from '@storybook/addon-actions'
import SelfRegister from '../../../src/containers/SelfRegister'

const actionPrevious = action('Previous')
const actionRedirectToHome = action('Go to Home')
const actionSubmit = action('Submit')

const SelfRegisterCreateAccount = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="create-account"
    t={identity}
  />
)

const SelfRegisterCheckCNPJ = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="check-cnpj"
    t={identity}
  />
)

const SelfRegisterTypeCNPJ = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="type-cnpj"
    t={identity}
  />
)

const SelfRegisterWithoutCNPJ = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="without-cnpj"
    t={identity}
  />
)

const SelfRegisterCompanyData = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="company-data"
    t={identity}
  />
)

const SelfRegisterPartnerDataPart1 = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="partner-data-part-1"
    t={identity}
  />
)

const SelfRegisterPartnerDataPart2 = () => (
  <SelfRegister
    onPreviousButton={actionPrevious}
    onRedirectToHome={actionRedirectToHome}
    onSubmit={actionSubmit}
    step="partner-data-part-2"
    t={identity}
  />
)

export {
  SelfRegisterCreateAccount,
  SelfRegisterCheckCNPJ,
  SelfRegisterTypeCNPJ,
  SelfRegisterWithoutCNPJ,
  SelfRegisterCompanyData,
  SelfRegisterPartnerDataPart1,
  SelfRegisterPartnerDataPart2,
}
