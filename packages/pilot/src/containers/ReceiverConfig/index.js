import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// import {
//   CardSection,
//   CardSectionDoubleLineTitle,
//   CardContent,
// } from 'former-kit'
import AnticipationIcon from 'emblematic-icons/svg/Anticipation32.svg'
import BankAccountContent from './BankAccountContent'
import ReceiverItem from './ReceiverItem'

class ReceiverConfig extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: {
        anticipation: false,
        transfer: false,
        bankAccount: false,
      },
    }

    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse (id) {
    this.setState({
      expanded: {
        [id]: !this.state.expanded[id],
      },
    })
  }

  render () {
    const { t } = this.props
    return (
      <Fragment>
        <ReceiverItem
          title={t('Antecipação')}
          subtitle={t('Subtítulo de Antecipação')}
          icon={<AnticipationIcon width={16} height={16} />}
          collapsed={this.state.expanded.anticipation}
          onClick={() => this.handleCollapse('anticipation')}
        >
          <span>Conteúdo de Antecipação</span>
        </ReceiverItem>
        <ReceiverItem
          title={t('Transferência')}
          subtitle={t('Subtítulo de Transferência')}
          icon={<AnticipationIcon width={16} height={16} />}
          collapsed={this.state.expanded.transfer}
          onClick={this.handleCollapse}
          id="transfer"
        >
          <span>Conteúdo de Transferência</span>
        </ReceiverItem>
        <ReceiverItem
          title={t('Conta Bancária')}
          subtitle={t('Subtítulo de Conta Bancária')}
          icon={<AnticipationIcon width={16} height={16} />}
          collapsed={this.state.expanded.bankAccount}
          onClick={this.handleCollapse}
          id="bankAccount"
        >
          <BankAccountContent
            t={t}
          />
        </ReceiverItem>
      </Fragment>
    )
  }
}

ReceiverConfig.propTypes = {
  t: PropTypes.func.isRequired,
}

export default ReceiverConfig
