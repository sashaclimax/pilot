import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import AddRecipient from '../../../src/containers/AddRecipient'

async function fetchAccounts () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accounts: [
          {
            name: 'First account',
            id: '1',
          },
          {
            name: 'Second account',
            id: '2',
          },
        ],
      })
    }, 2500)
  })
}

const AddRecipientExample = () => (
  <Section>
    <AddRecipient
      fetchAccounts={fetchAccounts}
      exitForm={action('Exit Form')}
      t={t => t}
    />
  </Section>
)

export default AddRecipientExample
