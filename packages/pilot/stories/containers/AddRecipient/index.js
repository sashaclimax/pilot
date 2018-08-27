import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import AddRecipient from '../../../src/containers/AddRecipient'

// async function fetchAccounts () {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         accounts: [
//           {
//             name: 'First account',
//             id: '1',
//           },
//           {
//             name: 'Second account',
//             id: '2',
//           },
//         ],
//       })
//     }, 1000)
//   })
// }

async function fetchAccountsError () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Oops'))
    }, 1000)
  })
}

const AddRecipientExample = () => (
  <Section>
    <AddRecipient
      fetchAccounts={fetchAccountsError}
      onExit={action('To Recipients Page')}
      onViewDetails={action('To Recipient Details Page')}
      t={t => t}
    />
  </Section>
)

export default AddRecipientExample
