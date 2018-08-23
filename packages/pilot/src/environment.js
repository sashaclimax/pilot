const {
  REACT_APP_API_ENVIRONMENT,
  REACT_APP_LIVE_URL = 'https://beta.dashboard.stg.pagarme.net/latest/index.html',
  REACT_APP_TEST_URL = 'https://beta.dashboard.sandbox.stg.pagarme.net/latest/index.html',
} = process.env

const env = REACT_APP_API_ENVIRONMENT === 'live' ? 'live' : 'test'

export {
  REACT_APP_LIVE_URL,
  REACT_APP_TEST_URL,
}

export default env
