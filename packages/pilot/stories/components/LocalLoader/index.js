import React, { PureComponent } from 'react'
import {
  Button,
  Col,
  Grid,
  Row,
} from 'former-kit'
import { action } from '@storybook/addon-actions'
import BalanceTotalDisplay from '../../../src/components/BalanceTotalDisplay'
import Loader from '../../../src/components/LocalLoader'
import Section from '../../Section'

class LoaderState extends PureComponent {
  constructor () {
    super()

    this.state = {
      showingLoader: false,
    }

    this.handleLoaderToggle = this.handleLoaderToggle.bind(this)
  }

  handleLoaderToggle () {
    this.setState({
      showingLoader: !this.state.showingLoader,
    })
  }

  render () {
    const buttonMessage = this.state.showingLoader
      ? 'hide loader'
      : 'show loader'

    return (
      <Section>
        <Grid>
          <Row>
            <Col palm={12} tablet={6} desk={4} tv={4}>
              <Button
                onClick={this.handleLoaderToggle}
              >
                {buttonMessage}
              </Button>
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              <div style={{ position: 'relative' }} >
                <BalanceTotalDisplay
                  title="A Receber"
                  amount="R$ 7.000,00"
                  detail={<span>Liberado para saque: <strong>R$5.000,00</strong></span>}
                  action={{
                    title: 'Antecipar',
                    onClick: action('clicked'),
                  }}
                />
                <Loader
                  label="Loading"
                  text="Loading..."
                  visible={this.state.showingLoader}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </Section>
    )
  }
}

export default LoaderState
