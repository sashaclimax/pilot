import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardActions,
  CardContent,
  Col,
  Grid,
  Row,
  Spacing,
} from 'former-kit'
import EditButton from './EditButton'
import ReceiverInfo from './ReceiverInfo'
import PartnerInfo from './PartnerInfo'

import styles from './style.css'

const renderPartnerInfo = (identification, action, t) => {
  if (identification.documentType === 'cpf') return null
  return (
    <Fragment>
      <Row>
        <Col>
          <span className={styles.title}>{t('partner_data')}</span>
        </Col>
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action('identification')}
            t={t}
          />
        </Col>
      </Row>
      <PartnerInfo
        identification={identification}
        t={t}
      />
      <hr className={styles.line} />
    </Fragment>
  )
}

const renderReceiverInfo = (identification, action, t) => {
  const cpfTitle = t('recipient_data')
  const cnpjTitle = t('company_data')

  return (
    <Fragment>
      <Row>
        <Col>
          {identification.documentType === 'cpf' &&
          <span className={styles.title}>{cpfTitle}</span>
          }
          {identification.documentType === 'cnpj' &&
          <span className={styles.title}>{cnpjTitle}</span>
          }
        </Col>
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action('identification')}
            t={t}
          />
        </Col>
      </Row>
      <ReceiverInfo
        t={t}
        identification={identification}
      />
      <hr className={styles.line} />
    </Fragment>
  )
}

const renderBankAccount = (bankAccount, action, t) => (
  <Fragment>
    <Row>
      <Col>
        <span className={styles.title}>{t('bank_account')}</span>
      </Col>
      <Col className={styles.editButtonCol}>
        <EditButton
          onClick={() => action('bankAccount')}
          t={t}
        />
      </Col>
    </Row>
    <Row>
      <Col tv={1} desk={1} tablet={1} palm={1}>
        <span className={styles.infoTitle}>{t('account_name')}</span>
        <span className={styles.info}>{bankAccount.account_name}</span>
      </Col>
      <Col tv={1} desk={1} tablet={1} palm={1}>
        <span className={styles.infoTitle}>{t('bank')}</span>
        <span className={styles.info}>{bankAccount.bank}</span>
      </Col>
      <Col tv={1} desk={1} tablet={1} palm={1}>
        <span className={styles.infoTitle}>{t('agency')}</span>
        <span className={styles.info}>{bankAccount.agency}</span>
      </Col>
      <Col tv={1} desk={1} tablet={1} palm={1}>
        <span className={styles.infoTitle}>{t('account')}</span>
        <span className={styles.info}>{bankAccount.account_number}</span>
      </Col>
      <Col tv={1} desk={1} tablet={1} palm={1}>
        <span className={styles.infoTitle}>{t('account_type')}</span>
        <span className={styles.info}>{bankAccount.account_type}</span>
      </Col>
    </Row>
    <hr className={styles.line} />
  </Fragment>
)

const renderAnticipationConfig = (configuration, action, t) => (
  <Fragment>
    <Row>
      <Col>
        <span className={styles.title}>{t('anticipation_config')}</span>
      </Col>
      <Col className={styles.editButtonCol}>
        <EditButton
          onClick={() => action('configuration')}
          t={t}
        />
      </Col>
    </Row>
    <Row>
      <Col tv={2} desk={2} tablet={2} palm={2}>
        <span className={styles.infoTitle}>{t('anticipation_model')}</span>
        <span className={styles.info}>{configuration.anticipationModel}</span>
      </Col>
      <Col tv={2} desk={2} tablet={2} palm={2}>
        <span className={styles.infoTitle}>{t('anticipation_volume')}</span>
        <span className={styles.info}>{configuration.anticipationVolumePercentage}</span>
      </Col>
    </Row>
    <hr className={styles.line} />
  </Fragment>
)

const renderTransferInterval = (configuration, t) => {
  const interval = configuration.transferInterval
  const monthly = configuration.transferDay
  const daily = configuration.transferWeekday
  const render = (interval === 'Mensal')
    ? (
      <Col tv={2} desk={2} tablet={2} palm={2}>
        <span className={styles.infoTitle}>{t('transfer_day')}</span>
        {interval === 'Semanal' &&
        <span className={styles.info}>{daily}</span>
        }
        <span className={styles.info}>{monthly}</span>
      </Col>
    )
    : null

  if (configuration.transferEnabled) {
    return (
      <Fragment>
        <Col tv={2} desk={2} tablet={2} palm={2}>
          <span className={styles.infoTitle}>{t('automatic_transfer_interval')}</span>
          <span className={styles.info}>{interval}</span>
        </Col>
        {render}
      </Fragment>
    )
  }
  return null
}

const renderTransferConfig = (configuration, action, t) => {
  const enableTransfer = (configuration.transferEnabled)
    ? 'Habilitada'
    : ('Desabilitada')
  return (
    <Fragment>
      <Row>
        <Col>
          <span className={styles.title}>{t('transfer_configuration')}</span>
        </Col>
        <Col className={styles.editButtonCol}>
          <EditButton
            onClick={() => action('configuration')}
            t={t}
          />
        </Col>
      </Row>
      <Row>
        <Col tv={2} desk={2} tablet={2} palm={2}>
          <span className={styles.infoTitle}>{t('automatic_transfer')}</span>
          <span className={styles.info}>{enableTransfer}</span>
        </Col>
        {renderTransferInterval(configuration, t)}
      </Row>
    </Fragment>
  )
}

const ConfirmStep = ({
  data,
  onBack,
  onEdit,
  onCancel,
  onCreate,
  t,
}) => (
  <Fragment>
    <CardContent>
      <h3 className={styles.title}>{t('add_recipient_confirm')}</h3>
      <h4 className={styles.subtitle}>
        {t('confirm_recipient_message')}
      </h4>
      <Grid>
        <hr className={styles.line} />
        {renderReceiverInfo(data.identification, onEdit, t)}
        {renderPartnerInfo(data.identification, onEdit, t)}
        {renderBankAccount(data.bankAccount, onEdit, t)}
        {renderAnticipationConfig(data.configuration, onEdit, t)}
        {renderTransferConfig(data.configuration, onEdit, t)}
      </Grid>
    </CardContent>
    <div className={styles.paddingTop}>
      <CardActions>
        <Button
          type="button"
          relevance="low"
          onClick={onCancel}
          fill="outline"
        >
          {t('cancel')}
        </Button>
        <Spacing />
        <Button
          type="button"
          onClick={onBack}
          fill="outline"
        >
          {t('back')}
        </Button>
        <Spacing size="medium" />
        <Button
          type="submit"
          fill="gradient"
          onClick={onCreate}
        >
          {t('add_recipient')}
        </Button>
      </CardActions>
    </div>
  </Fragment>
)

const partnerPropTypes = PropTypes.shape({
  cpf: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
})

const partnerDefaultTypes = {
  cpf: '',
  name: '',
  phone: '',
}

ConfirmStep.propTypes = {
  data: PropTypes.shape({
    identification: PropTypes.shape({
      cnpj: PropTypes.string,
      cnpjEmail: PropTypes.string,
      cnpjInformation: PropTypes.bool,
      cnpjName: PropTypes.string,
      cnpjPhone: PropTypes.string,
      cnpjUrl: PropTypes.string,
      cpf: PropTypes.string,
      cpfEmail: PropTypes.string,
      cpfInformation: PropTypes.bool,
      cpfName: PropTypes.string,
      cpfPhone: PropTypes.string,
      cpfUrl: PropTypes.string,
      documentType: PropTypes.string,
      partnerNumber: PropTypes.string,
      partner0: partnerPropTypes,
      partner1: partnerPropTypes,
      partner2: partnerPropTypes,
      partner3: partnerPropTypes,
      partner4: partnerPropTypes,
    }).isRequired,
    configuration: PropTypes.shape({
      anticipationModel: PropTypes.string,
      anticipationVolumePercentage: PropTypes.string,
      anticipationDays: PropTypes.string,
      transferEnabled: PropTypes.bool,
      transferInterval: PropTypes.string,
      transferDay: PropTypes.string,
      transferWeekday: PropTypes.string,
    }).isRequired,
    bankAccount: PropTypes.shape({
      account_name: PropTypes.string,
      account_number: PropTypes.string,
      account_type: PropTypes.string,
      agency: PropTypes.string,
      bank: PropTypes.string,
    }),
  }),
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ConfirmStep.defaultProps = {
  data: {
    identification: {
      cnpj: '',
      cnpjEmail: '',
      cnpjInformation: false,
      cnpjName: '',
      cnpjPhone: '',
      cnpjUrl: '',
      cpf: '',
      cpfEmail: '',
      cpfInformation: false,
      cpfName: '',
      cpfPhone: '',
      cpfUrl: '',
      documentType: '',
      partnerNumber: '',
      partner0: partnerDefaultTypes,
      partner1: partnerDefaultTypes,
      partner2: partnerDefaultTypes,
      partner3: partnerDefaultTypes,
      partner4: partnerDefaultTypes,
    },
    configuration: {
      anticipationModel: '',
      anticipationVolumePercentage: '',
      anticipationDays: '',
      transferEnabled: false,
      transferInterval: '',
      transferDay: '',
      transferWeekday: '',
    },
    bankAccount: {
      account_name: '',
      account_number: '',
      account_type: '',
      agency: '',
      bank: '',
    },
  },
}

export default ConfirmStep
