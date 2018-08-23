import { combineReducers } from 'redux'

import account, { epic as accountEpic } from './Account/actions'
import anticipation from './Anticipation'
import balance from './Balance'
import { reducers as transactionsReducers } from './Transactions'
import { reducers as recipientsReducers } from './Recipients'

export const rootEpic = accountEpic

export const rootReducer = combineReducers({
  account,
  anticipation,
  balance,
  transactionDetails: transactionsReducers.details,
  transactions: transactionsReducers.search,
  recipients: recipientsReducers.search,
})
