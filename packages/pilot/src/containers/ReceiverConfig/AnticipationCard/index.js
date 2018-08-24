import React, { Component, Fragment } from 'react'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

class AnticipationCard extends Component {
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
    return (
      <Fragment>
        <Grid>
          <Row>
            <Col>
            Renderizando Atecipação
            </Col>
          </Row>
        </Grid>
      </Fragment>
    )
  }
}

export default AnticipationCard
