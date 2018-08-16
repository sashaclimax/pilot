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

const masks = {
  cpf: '111.111.111-11',
  date: '11/11/1111',
  phone: '(11) 11111-1111',
}

const step = 'partner-data-part-1'

class SelfRegisterPartnerDataPart1 extends Component {
  constructor (props) {
    super(props)

    const { t } = props

    this.state = {
      cpf: '',
      date_birth: '',
      phone: '',
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

        <span>{t('pages.self_register.partner_data.header_title')}</span>

        <Form
          className={style.fillWidth}
          data={{
            cpf: this.state.cpf,
            date_birth: this.state.date_birth,
            phone: this.state.phone,
          }}
          onSubmit={onSubmit}
          validateOn="blur"
          validation={{
            partnet_name: this.isRequired,
            date_birth: this.isRequired,
            cpf: this.isRequired,
            montherName: this.isRequired,
            phone: this.isRequired,
            email: this.isRequired,
          }}
        >
          <Grid>
            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.partnet_name')}
                  name="partnet_name"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={4} desk={4} tablet={4} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.date_birth')}
                  mask={masks.date}
                  name="date_birth"
                  onChange={this.handleMaskField('date_birth')}
                />
              </Col>
              <Col tv={8} desk={8} tablet={8} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.cpf')}
                  mask={masks.cpf}
                  name="cpf"
                  onChange={this.handleMaskField('cpf')}
                />
              </Col>
            </Row>

            <Row>
              <Col tv={12} desk={12} tablet={12} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.monther_name')}
                  name="montherName"
                />
              </Col>
            </Row>

            <Row>
              <Col tv={4} desk={4} tablet={4} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.phone')}
                  mask={masks.phone}
                  name="phone"
                  onChange={this.handleMaskField('phone')}
                />
              </Col>
              <Col tv={8} desk={8} tablet={8} palm={12}>
                <FormInput
                  label={t('pages.self_register.partner_data.email')}
                  name="email"
                />
              </Col>
            </Row>

            <span className={style.buttonSubmit}>
              <Button type="submit">
                {t('pages.self_register.partner_data.form_continue')}
              </Button>
            </span>
          </Grid>
        </Form>
      </div>
    )
  }
}

SelfRegisterPartnerDataPart1.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterPartnerDataPart1
