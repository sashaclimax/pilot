import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
} from 'former-kit'
import AnticipationIcon from 'emblematic-icons/svg/Anticipation32.svg'

import AnticipationCard from './AnticipationCard'

class ReceiverConfig extends Component {
  constructor (props) {
    super(props)

    this.state = { cardCollapsed: true }

    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse () {
    this.setState({
      cardCollapsed: !this.state.cardCollapsed,
    })
  }

  render () {
    const { t } = this.props
    return (
      <Fragment>
        <CardContent>
          <CardSection>
            <CardSectionDoubleLineTitle
              collapsed={this.state.cardCollapsed}
              subtitle={`${t('anticipation_model')}: ${'Automática por volume'} | ${t('anticipation_volume')}: ${'100%'}`}
              title="Antecipação"
              icon={<AnticipationIcon height={16} width={16} />}
              onClick={this.handleCollapse}
            />
            <CardContent>
              {!this.state.cardCollapsed &&
                <AnticipationCard />
              }
            </CardContent>
          </CardSection>
        </CardContent>
      </Fragment>
    )
  }
}

ReceiverConfig.propTypes = {
  t: PropTypes.func.isRequired,
}

export default ReceiverConfig
