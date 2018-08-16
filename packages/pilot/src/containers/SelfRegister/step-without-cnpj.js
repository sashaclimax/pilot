import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

import HeaderImage from '../../components/SelfRegister/HeaderImage'
import Logo from '../../pages/logo.svg'
import style from './style.css'

const step = 'without-cnpj'

const SelfRegisterWithoutCNPJ = ({ onRedirectToHome, t }) => (
  <div className={style.centerContent}>
    <Logo width="140" />

    <HeaderImage
      step={step}
    />

    <span>{t('pages.self_register.without_cnpj.header_title')}</span>
    <p>{t('pages.self_register.without_cnpj.header_body_part_1')}</p>
    <p>{t('pages.self_register.without_cnpj.header_body_part_2')}</p>

    <span className={style.buttonSubmit}>
      <Button type="submit" fill="outline" onClick={onRedirectToHome}>
        {t('pages.self_register.without_cnpj.button_go_to_home')}
      </Button>
    </span>
  </div>
)

SelfRegisterWithoutCNPJ.propTypes = {
  onRedirectToHome: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SelfRegisterWithoutCNPJ
