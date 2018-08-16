import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardActions,
  CardContent,
  FormInput,
} from 'former-kit'
import {
  always,
  equals,
  F,
  ifElse,
} from 'ramda'
import Form from 'react-vanilla-form'

import HeaderImage from '../../components/SelfRegister/HeaderImage'
import Logo from '../../pages/logo.svg'
import requiredValidation from '../../validation/required'
import style from './style.css'

const equalsString = (t, str1) => ifElse(
  equals(str1),
  F,
  always(t('pages.self_register.different_passwords_error'))
)

const step = 'create-account'

class SelfRegisterCreateAccount extends Component {
  constructor () {
    super()

    this.state = {
      password: '',
    }

    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange (data) {
    this.setState({
      password: data.password,
    })
  }

  render () {
    const { onSubmit, t } = this.props
    const { password } = this.state

    const isRequired = requiredValidation(t('pages.self_register.required_error'))

    return (
      <div className={style.centerContent}>
        <Logo width="140" />

        <HeaderImage
          step={step}
        />

        <span>{t('pages.self_register.create_account.header_title')}</span>
        <p>{t('pages.self_register.create_account.header_body')}</p>

        <Form
          className={style.fillWidth}
          onChange={this.handleFormChange}
          onSubmit={onSubmit}
          validation={{
            email: isRequired,
            password: isRequired,
            confirmPasswd: [isRequired, equalsString(t, password)],
          }}
        >
          <CardContent>
            <FormInput
              label={t('pages.self_register.create_account.form_email')}
              name="email"
            />

            <FormInput
              label={t('pages.self_register.create_account.form_password')}
              name="password"
              type="password"
            />

            <FormInput
              label={t('pages.self_register.create_account.form_confirm_password')}
              name="confirmPasswd"
              type="password"
            />
          </CardContent>
          <CardActions>
            <span className={style.buttonSubmit}>
              <Button type="submit">
                {t('pages.self_register.create_account.form_continue')}
              </Button>
            </span>
          </CardActions>
        </Form>
      </div>
    )
  }
}

SelfRegisterCreateAccount.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterCreateAccount
