import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  FormInput,
  Col,
  Grid,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import handleMaskField from './handle-mask-field'
import HeaderImage from '../../components/SelfRegister/HeaderImage'
import Logo from '../../pages/logo.svg'
import requiredValidation from '../../validation/required'
import style from './style.css'

const step = 'company-data'

class SelfRegisterCompanyData extends Component {
  constructor (props) {
    super(props)

    const { t } = props

    this.state = {
      commercialPhone: '',
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

        <span>{t('pages.self_register.company_data.header_title')}</span>

        <Form
          className={style.fillWidth}
          data={{
            commercialPhone: this.state.commercialPhone,
          }}
          onChange={this.onFormChange}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={{
            tradeName: this.isRequired,
            legalName: this.isRequired,
            commercialPhone: this.isRequired,
          }}
        >
          <Grid>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.company_data.form_trade_name')}
                  name="tradeName"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.company_data.form_legal_name')}
                  name="legalName"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={6} desk={6} tablet={6} palm={6}>
                <FormInput
                  label={t('pages.self_register.company_data.form_commercial_phone')}
                  name="commercialPhone"
                  onChange={this.handleMaskField('commercialPhone')}
                />
              </Col>

              <Col tv={6} desk={6} tablet={6} palm={6}>
                <FormInput
                  label={t('pages.self_register.company_data.form_site')}
                  name="site"
                />
              </Col>
            </Row>

            <span className={style.buttonSubmit}>
              <Button type="submit">
                {t('pages.self_register.company_data.form_continue')}
              </Button>
            </span>
          </Grid>
        </Form>
      </div>
    )
  }
}

SelfRegisterCompanyData.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterCompanyData
