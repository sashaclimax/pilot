import React from 'react'
import PropTypes from 'prop-types'
import { mapObjIndexed } from 'ramda'
import {
  Col,
  Grid,
  ModalContent,
  Row,
} from 'former-kit'

import Property from '../Property'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <Property
    title={label}
    value={contents[key]}
  />
), labels)

const CaptureDetails = ({
  contents, labels,
}) => {
  const {
    captureAmount,
    amount,
    cardBrand,
    cardNumber,
    customerEmail,
    customerName,
    installments,
  } = fields(labels, contents)

  return (
    <form>
      <ModalContent>
        <Grid>
          { (customerName || customerEmail) &&
            <Row>
              <Col palm={12} tablet={6} desk={6} tv={6}>
                {customerName}
              </Col>
              <Col palm={12} tablet={6} desk={2} tv={6}>
                {customerEmail}
              </Col>
            </Row>
          }
          { cardNumber &&
            <Row>
              <Col palm={12} tablet={4} desk={4} tv={4}>
                {cardNumber}
              </Col>
              <Col palm={12} tablet={2} desk={2} tv={2}>
                {cardBrand}
              </Col>
              <Col palm={12} tablet={1} desk={1} tv={1}>
                {installments}
              </Col>
            </Row>
          }
          <Row>
            <Col palm={12} tablet={6} desk={6} tv={6}>
              {amount}
            </Col>
            <Col palm={12} tablet={6} desk={6} tv={6}>
              {captureAmount}
            </Col>
          </Row>
        </Grid>
      </ModalContent>
    </form>
  )
}

CaptureDetails.propTypes = {
  labels: PropTypes.shape({
    captureAmount: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    cardBrand: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    installments: PropTypes.string.isRequired,
  }).isRequired,
  contents: PropTypes.shape({
    captureAmount: PropTypes.node.isRequired,
    amount: PropTypes.node.isRequired,
    cardBrand: PropTypes.node,
    cardNumber: PropTypes.node,
    customerEmail: PropTypes.node,
    customerName: PropTypes.node,
    installments: PropTypes.node,
  }).isRequired,
}

export default CaptureDetails
