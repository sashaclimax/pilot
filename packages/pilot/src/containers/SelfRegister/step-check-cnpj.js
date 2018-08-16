import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Col,
  Grid,
  Row,
} from 'former-kit'

import HeaderImage from '../../components/SelfRegister/HeaderImage'
import Logo from '../../pages/logo.svg'
import style from './style.css'

const step = 'check-cnpj'

const SelfRegisterFormStep2 = ({ onSubmit, t }) => {
  const submitNo = () => onSubmit({ hasCNPJ: false })
  const submitYes = () => onSubmit({ hasCNPJ: true })

  return (
    <div className={style.centerContent}>
      <Logo width="140" />

      <HeaderImage
        step={step}
      />

      <span>{t('pages.self_register.check_cnpj.header_title')}</span>
      <p>{t('pages.self_register.check_cnpj.header_body_part_1')}</p>
      <p>{t('pages.self_register.check_cnpj.header_body_part_2')}</p>

      <Grid>
        <Row>
          <Col tv={6} desk={6} tablet={6} palm={6}>
            <span className={style.buttonSubmit}>
              <Button type="submit" fill="outline" onClick={submitNo}>
                {t('pages.self_register.check_cnpj.button_no')}
              </Button>
            </span>
          </Col>

          <Col tv={6} desk={6} tablet={6} palm={6}>
            <span className={style.buttonSubmit}>
              <Button type="submit" onClick={submitYes}>
                {t('pages.self_register.check_cnpj.button_yes')}
              </Button>
            </span>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

SelfRegisterFormStep2.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterFormStep2
