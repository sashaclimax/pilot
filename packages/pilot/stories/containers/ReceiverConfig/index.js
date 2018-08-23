import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import Section from '../../Section'
import ReceiverConfig from '../../../src/containers/ReceiverConfig'

const ReceiverConfigExample = () => (
  <Section>
    <Card>
      <ReceiverConfig
        onContinue={action('onContinue')}
        onBack={action('onBack')}
        onCancel={action('onCancel')}
        t={translate => translate}
      />
    </Card>
  </Section>
)

export default ReceiverConfigExample
