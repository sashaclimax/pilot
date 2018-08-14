import React, { PureComponent } from 'react'
import {
  Button,
  Card,
  Col,
  Grid,
  Row,
} from 'former-kit'
import Loader from '../../../src/components/LocalLoader'
import Section from '../../Section'
import style from './style.css'

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
              <Card className={style.cardExample}>
                <h1> Example </h1>
                <h4> 300px X 200px </h4>
                <Loader
                  label="Loading"
                  text="Loading"
                  visible={this.state.showingLoader}
                />
              </Card>
            </Col>
          </Row>
        </Grid>
      </Section>
    )
  }
}

export default LoaderState
