import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import {
  Button,
  FormInput,
  Alert,
} from 'former-kit'

import styles from '../style.css'

const LoginContainer = ({
  errors,
  loading,
  onLogin,
  onPasswordRecovery,
  t,
}) => (
  <Form
    errors={errors}
    customErrorProp="error"
    onSubmit={onLogin}
    className={styles.primaryContent}
  >
    <div className={styles.login}>
      <FormInput
        disabled={loading}
        label={t('email')}
        name="email"
      />
      <FormInput
        disabled={loading}
        type="password"
        label={t('password')}
        name="password"
      />
    </div>
    {errors &&
      <div className={styles.errorAlert}>
        <Alert
          type="error"
          icon={<IconWarning height={16} width={16} />}
        >
          <span>
            {errors.null
              ? errors.null
              : t('login.network_error')
            }
          </span>
        </Alert>
      </div>
    }

    <div className={styles.actions}>
      <div className={styles.hugeButton}>
        <Button
          type="submit"
          disabled={loading}
          size="huge"
          fill="gradient"
        >
          {t('login.login_action')}
        </Button>
      </div>
      <button
        role="link"
        disabled={loading}
        onClick={onPasswordRecovery}
      >
        {t('login.password_recovery_action')}
      </button>
    </div>
  </Form>
)

LoginContainer.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    PropTypes.instanceOf(Error),
  ]),
  loading: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  onPasswordRecovery: PropTypes.func.isRequired,
  t: PropTypes.func,
}

LoginContainer.defaultProps = {
  t: t => t,
  errors: null,
  loading: false,
}

export default LoginContainer
