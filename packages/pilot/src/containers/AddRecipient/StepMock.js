import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

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

export default StepMock
