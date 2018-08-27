import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Steps,
} from 'former-kit'

import IdentificationStep from './IdentificationStep'
import BankAccountStep from './BankAccountStep'
// import ConfigurationStep from  './ConfigurationStep'
// import ConfirmStep from  './ConfirmStep'
import StepMock from './StepMock' // TODO: remova-me
import ConclusionStep from './ConclusionStep'
import ErrorStep from './ErrorStep'
import ConfirmModal from '../../components/ConfirmModal'
import Loader from '../../components/Loader'

import style from './style.css'

const IDENTIFICATION = 'IdentificationStep'
const BANK_ACCOUNT = 'BankAccountStep'
const CONFIGURATION = 'ConfigurationStep'
const CONFIRMATION = 'ConfirmStep'
const CONCLUSION = 'ConclusionStep'

const createSteps = (fetchAccounts, t) => [
  {
    id: IDENTIFICATION,
    title: t('Dados'),
  },
  {
    fetch: fetchAccounts,
    id: BANK_ACCOUNT,
    title: t('Conta Bancaria'),
  },
  {
    id: CONFIGURATION,
    title: t('Configurações'),
  },
  {
    id: CONFIRMATION,
    title: t('Confirmação'),
  },
  {
    // TODO: O passo de conclusão precisa fazer um POST
    id: CONCLUSION,
    title: t('Conclusão'),
  },
]

const initialStatus = [
  { id: IDENTIFICATION, status: 'current' },
  { id: BANK_ACCOUNT, status: 'pending' },
  { id: CONFIGURATION, status: 'pending' },
  { id: CONFIRMATION, status: 'pending' },
  { id: CONCLUSION, status: 'pending' },
]

export default class AddRecipients extends Component {
  constructor (props) {
    super(props)

    const { fetchAccounts, t } = props

    this.state = {
      currentStepNumber: 0,
      data: {},
      error: false,
      fetchData: {},
      isLoading: false,
      openModal: false,
      status: [...initialStatus],
    }

    this.steps = createSteps(fetchAccounts, t)

    this.closeModal = this.closeModal.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.onTryAgain = this.onTryAgain.bind(this)
    this.renderError = this.renderError.bind(this)
    this.renderStep = this.renderStep.bind(this)
    this.setStatePromise = this.setStatePromise.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  async onContinue (stepData) {
    const { currentStepNumber, data } = this.state
    const currentStep = this.steps[currentStepNumber]
    const nextStepNumber = currentStepNumber + 1
    const nextStep = this.steps[nextStepNumber]

    let { fetchData } = this.state
    let error = false

    if (nextStep.fetch) {
      await this.setStatePromise({ isLoading: true })
      try {
        fetchData = await nextStep.fetch()
      } catch (fetchError) {
        error = fetchError
      }
    }

    const status = this.updateStatus(nextStepNumber)

    this.setState({
      currentStepNumber: nextStepNumber,
      data: {
        ...data,
        [currentStep.id]: stepData,
      },
      error,
      fetchData,
      isLoading: false,
      status,
    })
  }

  onCancel () {
    this.setState({ openModal: true })
  }

  onBack () {
    const { currentStepNumber } = this.state
    const previousStepNumber = currentStepNumber - 1
    const status = this.updateStatus(previousStepNumber)

    this.setState({
      status,
      currentStepNumber: previousStepNumber,
    })
  }

  onTryAgain () {
    this.setState({
      currentStepNumber: 0,
      data: {},
      error: false,
      fetchData: {},
      status: [...initialStatus],
    })
  }

  setStatePromise (state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  updateStatus (nextStepNumber) {
    return this.steps.map((step, index) => {
      let status = 'current'

      if (index < nextStepNumber) {
        status = 'success'
      }

      if (index > nextStepNumber) {
        status = 'pending'
      }

      return {
        id: step.id,
        status,
      }
    })
  }

  closeModal () {
    this.setState({ openModal: false })
  }

  renderStep () {
    const {
      currentStepNumber,
      data,
      fetchData,
    } = this.state

    const {
      onExit,
      onViewDetails,
      t,
    } = this.props

    const currentStep = this.steps[currentStepNumber]

    const stepProps = {
      data: data[currentStep.id],
      onBack: this.onBack,
      onCancel: this.onCancel,
      onContinue: this.onContinue,
      t,
    }

    switch (currentStep.id) {
      case IDENTIFICATION:
        return <IdentificationStep {...stepProps} />

      case BANK_ACCOUNT:
        return <BankAccountStep {...stepProps} {...fetchData} />

      case CONFIGURATION: // TODO: Passo de configuração
        return <StepMock {...stepProps} />

      case CONFIRMATION: // TODO: Passo de confirmação
        return <StepMock {...stepProps} />

      case CONCLUSION:
        // TODO: Passar o id do recebedor criado
        return (
          <ConclusionStep
            onExit={onExit}
            onViewDetails={onViewDetails}
            t={t}
          />
        )

      default:
        return null
    }
  }

  renderError () {
    // TODO: Passar o "error" do state para o componente?
    const { onExit, t } = this.props
    return (
      <ErrorStep onExit={onExit} onTryAgain={this.onTryAgain} t={t} />
    )
  }

  render () {
    const {
      error,
      isLoading,
      openModal,
      status,
    } = this.state

    const { onExit, t } = this.props

    return (
      <Fragment>
        <Card>
          <Steps
            status={status}
            steps={this.steps}
          />
        </Card>
        <Card className={style.marginTop}>
          <Loader visible={isLoading} />
          {
            (error)
              ? this.renderError()
              : this.renderStep()
          }
        </Card>
        <ConfirmModal
          isOpen={openModal}
          onCancel={this.closeModal}
          onConfirm={onExit}
          title={t('exit_modal_title')}
          cancelText={t('cancel')}
          confirmText={t('confirm')}
        >
          <p style={{ textAlign: 'center' }}>
            {t('exit_modal_message')}
          </p>
        </ConfirmModal>
      </Fragment>
    )
  }
}

AddRecipients.propTypes = {
  fetchAccounts: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
