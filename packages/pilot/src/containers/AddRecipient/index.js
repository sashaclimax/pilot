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
import ConclusionStep from './ConclusionStep'
import StepMock from './StepMock' // TODO: remova-me

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
    order: 1,
    title: t('Dados'),
  },
  {
    fetch: fetchAccounts,
    id: BANK_ACCOUNT,
    order: 2,
    title: t('Conta Bancaria'),
  },
  {
    id: CONFIGURATION,
    order: 3,
    title: t('Configurações'),
  },
  {
    id: CONFIRMATION,
    order: 4,
    title: t('Confirmação'),
  },
  {
    // TODO: O passo de conclusão precisa fazer um POST
    id: CONCLUSION,
    order: 5,
    title: t('Conclusão'),
  },
]

export default class AddRecipients extends Component {
  constructor (props) {
    super(props)

    const {
      currentStepOrder,
      fetchAccounts,
      t,
    } = props

    this.state = {
      currentStepOrder,
      data: {},
      status: [
        { id: IDENTIFICATION, status: 'current' },
        { id: BANK_ACCOUNT, status: 'pending' },
        { id: CONFIGURATION, status: 'pending' },
        { id: CONFIRMATION, status: 'pending' },
        { id: CONCLUSION, status: 'pending' },
      ],
      openModal: false,
      isLoading: false,
    }

    this.steps = createSteps(fetchAccounts, t)

    this.closeModal = this.closeModal.bind(this)
    this.handleFetchError = this.handleFetchError.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.renderStep = this.renderStep.bind(this)
    this.setStatePromise = this.setStatePromise.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  async onContinue (stepData) {
    const {
      currentStepOrder,
      data,
    } = this.state

    const currentStep = this.steps.find(step => (
      step.order === currentStepOrder
    ))

    const nextStepOrder = currentStepOrder + 1

    const nextStep = this.steps.find(step => (
      step.order === nextStepOrder
    ))

    let fetchData = this.state.fetch

    if (nextStep.fetch) {
      await this.setStatePromise({ isLoading: true })
      try {
        fetchData = await nextStep.fetch()
      } catch (error) {
        this.handleFetchError(error)
        return
      }
    }

    const status = this.updateStatus(nextStepOrder)

    this.setState({
      status,
      currentStepOrder: nextStepOrder,
      data: {
        ...data,
        [currentStep.id]: stepData,
      },
      fetch: fetchData,
      isLoading: false,
    })
  }

  /* eslint-disable */
  handleFetchError (error) {
    // TODO: Se um erro acontecer, deve ser mostrado o passo de conclusão
    // com uma mensagem de erro
    console.error('Erro!')
  }
  /* eslint-enable */

  onCancel () {
    this.setState({ openModal: true })
  }

  onBack () {
    const {
      currentStepOrder,
    } = this.state

    const previousStepOrder = currentStepOrder - 1
    const status = this.updateStatus(previousStepOrder)

    this.setState({
      status,
      currentStepOrder: previousStepOrder,
    })
  }

  closeModal () {
    this.setState({ openModal: false })
  }

  updateStatus (nextStepOrder) {
    return this.steps.map((step) => {
      let status = 'current'

      if (step.order < nextStepOrder) {
        status = 'success'
      }

      if (step.order > nextStepOrder) {
        status = 'pending'
      }

      return {
        id: step.id,
        status,
      }
    })
  }

  setStatePromise (state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  renderStep () {
    const {
      currentStepOrder,
      fetch,
      data,
    } = this.state

    const { t } = this.props

    const currentStep = this.steps.find(step => (
      step.order === currentStepOrder
    ))

    const props = {
      data: data[currentStep.id],
      onBack: this.onBack,
      onCancel: this.onCancel,
      onContinue: this.onContinue,
      t,
    }

    // TODO: Opcional, renderizar utilizando nomes de tags dinâmicos
    switch (currentStep.id) {
      case IDENTIFICATION:
        return <IdentificationStep {...props} />

      case BANK_ACCOUNT:
        return <BankAccountStep {...props} {...fetch} />

      case CONFIGURATION:
        return <StepMock {...props} />

      case CONFIRMATION:
        return <StepMock {...props} />

      case CONCLUSION:
        // TODO: passar as props corretas
        return (
          <ConclusionStep
            status="success"
            onExit={() => {}}
            onTryAgain={() => {}}
            onViewDetails={() => {}}
            t={t}
          />
        )

      default:
        return <StepMock {...props} />
    }
  }

  render () {
    const { isLoading, openModal, status } = this.state
    const { exitForm, t } = this.props

    const Step = (isLoading)
      ? <Loader visible />
      : this.renderStep()

    return (
      <Fragment>
        <Card>
          <Steps
            status={status}
            steps={this.steps}
          />
        </Card>
        <Card className={style.marginTop}>
          { Step }
        </Card>
        <ConfirmModal
          isOpen={openModal}
          onCancel={this.closeModal}
          onConfirm={exitForm}
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
  currentStepOrder: PropTypes.number,
  fetchAccounts: PropTypes.func.isRequired,
  exitForm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

AddRecipients.defaultProps = {
  currentStepOrder: 1,
}
