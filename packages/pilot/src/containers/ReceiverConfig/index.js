import React, { Component, Fragment } from 'react'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
  Grid,
  Row,
  Col,
} from 'former-kit'
import IconLock from 'emblematic-icons/svg/Lock32.svg'

class ReceiverConfig extends Component {
  constructor (props) {
    super(props)

    this.state = { cardCollapsed: true }

    this.handleCollapse = this.handleCollapse.bind(this)
    this.renderInfo = this.renderInfo.bind(this)
  }

  handleCollapse () {
    this.setState({
      cardCollapsed: !this.state.cardCollapsed,
    })
  }

  renderInfo () {
    const conteudo = 'Teste'

    if (this.state.cardCollapsed) {
      return (
        <Grid>
          <Row>
            <Col>
              {conteudo}
            </Col>
          </Row>
        </Grid>
      )
    }
    return null
  }

  render () {
    return (
      <Fragment>
        <CardContent>
          <CardSection>
            <CardSectionDoubleLineTitle
              collapsed={this.state.cardCollapsed}
              subtitle="Modelo de antecipação: Automático por volume"
              title="Antecipação"
              icon={<IconLock height={16} width={16} />}
              onClick={this.renderInfo}
            />
            <CardContent>
              {this.renderInfo}
            </CardContent>
          </CardSection>
        </CardContent>
      </Fragment>
    )
  }
}

export default ReceiverConfig
