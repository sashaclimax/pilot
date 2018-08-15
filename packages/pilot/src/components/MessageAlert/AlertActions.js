import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const MessageAlertActions = ({ children }) => (
  <div className={style.actions}>
    {children}
  </div>
)

MessageAlertActions.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

MessageAlertActions.defaultProps = {
  children: null,
}

export default MessageAlertActions
