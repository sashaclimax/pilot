import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// import {
//   CardSection,
//   CardSectionDoubleLineTitle,
//   CardContent,
// } from 'former-kit'
import AnticipationIcon from 'emblematic-icons/svg/Anticipation32.svg'
import ReceiverItem from './ReceiverItem'

class ReceiverConfig extends Component {
  constructor (props) {
    super(props)

    this.state = { expanded: false }

    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse () {
    console.log(this.state.expanded)
    this.setState({
      expanded: !this.state.expanded,
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
          collapsed={this.state.expanded}
          onClick={this.handleCollapse}
        >
          <span>Conteúdo de Antecipação</span>
        </ReceiverItem>
        <ReceiverItem
          title={t('Transferência')}
          subtitle={t('Subtítulo de Transferência')}
          icon={<AnticipationIcon width={16} height={16} />}
          collapsed={this.state.expanded}
          onClick={this.handleCollapse}
        >
          <span>Conteúdo de Transferência</span>
        </ReceiverItem>
        <ReceiverItem
          title={t('Conta Bancária')}
          subtitle={t('Subtítulo de Conta Bancária')}
          icon={<AnticipationIcon width={16} height={16} />}
          collapsed={this.state.expanded}
          onClick={this.handleCollapse}
        >
          <span>Conteúdo de Conta Bancária</span>
        </ReceiverItem>
      </Fragment>
    )
  }
}

ReceiverConfig.propTypes = {
  t: PropTypes.func.isRequired,
}

export default ReceiverConfig
