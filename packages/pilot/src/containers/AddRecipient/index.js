import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Steps,
} from 'former-kit'

import BankAccountStep from './BankAccountStep'
import IdentificationStep from './IdentificationStep'
import StepMock from './StepMock' // TODO: remova-me

import ConfirmModal from '../../components/ConfirmModal'
import Loader from '../../components/Loader'

import style from './style.css'

const IDENTIFICATION = 'identification'
const BANK_ACCOUNT = 'bankAccount'
const CONFIGURATION = 'configuration'
const CONFIRMATION = 'confirmation'
const CONCLUSION = 'conclusion'

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
    const { currentStepOrder } = this.state
    const { t } = this.props

    const currentStep = this.steps.find(step => (
      step.order === currentStepOrder
    ))

    // TODO: Opcional, renderizar utilizando nomes de tags dinâmicos
    switch (currentStep.id) {
      case IDENTIFICATION:
        return (
          <IdentificationStep
            data={this.state.data[currentStep.id]}
            onBack={this.onBack}
            onCancel={this.onCancel}
            onContinue={this.onContinue}
            t={t}
          />
        )

      case BANK_ACCOUNT:
        return (
          <BankAccountStep
            {...this.state.fetch}
            onBack={this.onBack}
            onCancel={this.onCancel}
            onContinue={this.onContinue}
            t={t}
          />
        )

      default:
        return (
          <StepMock
            onBack={this.onBack}
            onCancel={this.onCancel}
            onContinue={this.onContinue}
          />
        )
    }
  }

  render () {
    const { isLoading } = this.state

    const Step = (isLoading)
      ? <Loader visible />
      : this.renderStep()

    return (
      <Fragment>
        <Card>
          <Steps
            status={this.state.status}
            steps={this.steps}
          />
        </Card>
        <Card className={style.marginTop}>
          { Step }
        </Card>
        <ConfirmModal
          isOpen={this.state.openModal}
          onCancel={this.closeModal}
          onConfirm={this.handleExit}
          title="Titulo"
          cancelText="Cancelar"
          confirmText="Confirmar"
        >
          <p style={{ textAlign: 'center' }}>
            Tem certeza?
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
