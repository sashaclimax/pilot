import React from 'react'
import { Button } from 'former-kit'

import ErrorIcon from '../../../src/components/TransferError/ErrorIcon.svg'
import {
  MessageAlert,
  MessageAlertActions,
} from '../../../src/components/MessageAlert'

const MessageAlertExample = () => (
  <MessageAlert
    icon={<ErrorIcon />}
    message={
      <span>
        Algo inesperado aconteceu
      </span>
    }
    title="Erro!"
  >
    <MessageAlertActions>
      <Button
        fill="gradient"
        relevance="high"
      >
        Sair
      </Button>
      <Button
        fill="gradient"
        relevance="normal"
      >
        Concordar
      </Button>
    </MessageAlertActions>
  </MessageAlert>
)

export default MessageAlertExample
