import React from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  Grid,
  Row,
} from 'former-kit'

const MessageAlert = ({
  children,
  icon,
  message,
  title,
}) => (
  <Grid>
    <Row flex>
      <Col align="center">
        {icon}
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        {
          (typeof title === 'string') &&
            <h2>{title}</h2>
        }
        {
          (typeof title !== 'string') &&
            title
        }
      </Col>
    </Row>
    <Row flex>
      <Col
        align="center"
        aria-live="polite"
        role="status"
      >
        {
          (typeof message === 'string') &&
            <span>{message}</span>
        }
        {
          (typeof message !== 'string') &&
            message
        }
      </Col>
    </Row>
    <Row flex>
      <Col align="center">
        {children}
      </Col>
    </Row>
  </Grid>
)

MessageAlert.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  icon: PropTypes.element.isRequired,
  message: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
}

MessageAlert.defaultProps = {
  children: null,
}

export default MessageAlert
