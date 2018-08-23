
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  Steps,
} from 'former-kit'

import BankAccountStep from './BankAccountStep'
import IdentificationStep from './IdentificationStep'
import ConfirmModal from '../../components/ConfirmModal'
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

const StepMock = ({
  onBack,
  onCancel,
  onContinue,
}) => (
  <Fragment>
    <Button onClick={onBack}>Back</Button>
    <Button onClick={onCancel}>Cancel</Button>
    <Button onClick={onContinue}>Continue</Button>
  </Fragment>
)

StepMock.propTypes = {
  onContinue: PropTypes.func,
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
}

StepMock.defaultProps = {
  onContinue: () => {},
  onBack: () => {},
  onCancel: () => {},
}

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
    }

    this.steps = createSteps(fetchAccounts, t)

    this.closeModal = this.closeModal.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.renderStep = this.renderStep.bind(this)
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
      // TODO: Se um erro acontecer, deve ser mostrado o passo de conclusão
      // com uma mensagem de erro
      // TODO: Em quanto os dados são buscados, deve ser exibida uma tela de
      // loading
      fetchData = await nextStep.fetch()
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
    })
  }

  onCancel () {
    this.setState({
      openModal: true,
    })
  }

  /* eslint-disable */
  handleExit () {
    // TODO: Receber por props o método para ser chamado quando o usuário
    // quiser sair do fluxo. Esse método vai retorná-lo para a tela inicial
    // de recebedores.
    console.log("exit")
  }
  /* eslint-enable */

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
    this.setState({
      openModal: false,
    })
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
    return (
      <Fragment>
        <Card>
          <Steps
            status={this.state.status}
            steps={this.steps}
          />
        </Card>
        <Card className={style.marginTop}>
          {this.renderStep()}
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
  t: PropTypes.func.isRequired,
}

AddRecipients.defaultProps = {
  currentStepOrder: 1,
}
