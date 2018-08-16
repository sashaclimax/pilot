import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardActions,
  CardContent,
  FormInput,
} from 'former-kit'
import Form from 'react-vanilla-form'

import handleMaskField from './handle-mask-field'
import HeaderImage from '../../components/SelfRegister/HeaderImage'
import Logo from '../../pages/logo.svg'
import requiredValidation from '../../validation/required'
import style from './style.css'

const step = 'type-cnpj'

class SelfRegisterTypeCNPJ extends Component {
  constructor (props) {
    super(props)

    const { t } = props

    this.state = {
      cnpj: '',
    }

    this.isRequired = requiredValidation(t('pages.self_register.required_error'))
    this.handleMaskField = handleMaskField.bind(this)
  }

  render () {
    const { onSubmit, t } = this.props

    return (
      <div className={style.centerContent}>
        <Logo width="140" />

        <HeaderImage
          step={step}
        />

        <span>{t('pages.self_register.type_cnpj.header_title')}</span>
        <p>{t('pages.self_register.type_cnpj.header_body_part_1')}</p>
        <p>{t('pages.self_register.type_cnpj.header_body_part_2')}</p>

        <Form
          className={style.fillWidth}
          data={{
            cnpj: this.state.cnpj,
          }}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={{
            cnpj: this.isRequired,
          }}
        >
          <CardContent>
            <FormInput
              label={t('pages.self_register.type_cnpj.form_cnpj')}
              mask="11.111.111/1111-11"
              name="cnpj"
              onChange={this.handleMaskField('cnpj')}
            />
          </CardContent>
          <CardActions>
            <span className={style.buttonSubmit}>
              <Button type="submit">
                {t('pages.self_register.type_cnpj.form_continue')}
              </Button>
            </span>
          </CardActions>
        </Form>
      </div>
    )
  }
}

SelfRegisterTypeCNPJ.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterTypeCNPJ
