import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  FormInput,
  Grid,
  Row,
} from 'former-kit'
import Form from 'react-vanilla-form'

import HeaderImage from '../../components/SelfRegister/HeaderImage'
import Logo from '../../pages/logo.svg'
import numberValidation from '../../validation/number'
import requiredValidation from '../../validation/required'
import style from './style.css'

const step = 'partner-data-part-2'

const SelfRegisterPartnerDataPart2 = ({ onSubmit, t }) => {
  const isNumber = numberValidation(t('pages.self_register.number_error'))
  const isRequired = requiredValidation(t('pages.self_register.required_error'))

  return (
    <div className={style.centerContent}>
      <Logo width="140" />

      <HeaderImage
        step={step}
      />

      <span>{t('pages.self_register.partner_data.header_title')}</span>

      <Form
        className={style.fillWidth}
        onSubmit={onSubmit}
        validateOn="blur"
        validation={{
          cep: isRequired,
          street: isRequired,
          number: [isRequired, isNumber],
          complement: isRequired,
          neighborhood: isRequired,
          city: isRequired,
        }}
      >
        <Grid>
          <Row>
            <Col tv={4} desk={4} tablet={4} palm={12}>
              <FormInput
                label={t('pages.self_register.partner_data.cep')}
                name="cep"
              />
            </Col>
          </Row>

          <Row>
            <Col tv={12} desk={12} tablet={12} palm={12}>
              <FormInput
                label={t('pages.self_register.partner_data.street')}
                name="street"
              />
            </Col>
          </Row>

          <Row>
            <Col tv={4} desk={4} tablet={4} palm={12}>
              <FormInput
                label={t('pages.self_register.partner_data.number')}
                name="number"
              />
            </Col>
            <Col tv={8} desk={8} tablet={8} palm={12}>
              <FormInput
                label={t('pages.self_register.partner_data.complement')}
                name="complement"
              />
            </Col>
          </Row>

          <Row>
            <Col tv={4} desk={4} tablet={4} palm={12}>
              <FormInput
                label={t('pages.self_register.partner_data.neighborhood')}
                name="neighborhood"
              />
            </Col>
            <Col tv={8} desk={8} tablet={8} palm={12}>
              <FormInput
                label={t('pages.self_register.partner_data.city')}
                name="city"
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

SelfRegisterPartnerDataPart2.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterPartnerDataPart2
