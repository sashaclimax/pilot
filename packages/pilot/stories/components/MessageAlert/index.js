import React from 'react'
import { action } from '@storybook/addon-actions'
import { compose } from 'ramda'

import ErrorIcon from '../../../src/components/TransferError/ErrorIcon.svg'
import MessageAlert from '../../../src/components/MessageAlert'

const MessageAlertExample = ({ t }) => (
  <MessageAlert
    actionText="Fechar"
    icon={<ErrorIcon />}
    title={
      <h1 style={{ margin: 0 }}>
        Erro!
      </h1>
    }
    message={
      <span>
        Algo inesperado aconteceu
      </span>
    }
    onActionClick={action('onActionClick')}
  />
)

export default MessageAlertExample
