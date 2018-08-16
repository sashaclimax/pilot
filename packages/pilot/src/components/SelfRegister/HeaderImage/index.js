import React from 'react'
import PropTypes from 'prop-types'

import ImageCreateAccount from './create-account.svg'
import ImageCNPJ from './cnpj.svg'
import ImageWithoutCNPJ from './without-cnpj.svg'
import ImageCompanyData from './company-data.svg'
import ImagePartnetData from './partner-data.svg'

const mapStepToImage = {
  'create-account': <ImageCreateAccount />,
  'check-cnpj': <ImageCNPJ />,
  'type-cnpj': <ImageCNPJ />,
  'without-cnpj': <ImageWithoutCNPJ />,
  'company-data': <ImageCompanyData />,
  'partner-data-part-1': <ImagePartnetData />,
  'partner-data-part-2': <ImagePartnetData />,
}

const HeaderImage = ({ step }) =>
  mapStepToImage[step]

HeaderImage.propTypes = {
  step: PropTypes.oneOf([
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data-part-1',
    'partner-data-part-2',
  ]).isRequired,
}

export default HeaderImage
