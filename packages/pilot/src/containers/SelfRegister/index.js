import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardContent,
  Col,
  Grid,
  Row,
} from 'former-kit'
import ArrowBack from 'emblematic-icons/svg/ChevronBack32.svg'

import SelfRegisterBulletSteps from '../../components/SelfRegister/BulletSteps'
import SelfRegisterForm from './form'
import style from './style.css'

const SelfRegister = ({
  onPreviousButton,
  onRedirectToHome,
  onSubmit,
  step,
  t,
}) => (
  <Grid fullHeight>
    <Row>
      <Col tv={12} desk={12} tablet={12} palm={12} className={style.columnPadding}>
        <Card>
          <CardContent>
            <Grid>
              <Row stretch>
                <Col tv={4} desk={4} tablet={3} palm={3}>
                  <div className={style.header}>
                    <Button
                      fill="outline"
                      icon={<ArrowBack height={16} width={16} />}
                      onClick={onPreviousButton}
                      size="tiny"
                      type="submit"
                    >
                      {t('pages.self_register.return')}
                    </Button>
                  </div>
                </Col>

                <Col tv={4} desk={4} tablet={6} palm={6}>
                  <SelfRegisterForm
                    onRedirectToHome={onRedirectToHome}
                    onSubmit={onSubmit}
                    step={step}
                    t={t}
                  />
                </Col>

                <Col tv={4} desk={4} tablet={3} palm={3} />
              </Row>
            </Grid>
          </CardContent>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col tv={12} desk={12} tablet={12} palm={12} className={style.stepsMiddle}>
        <SelfRegisterBulletSteps
          step={step}
        />
      </Col>
    </Row>
  </Grid>
)

SelfRegister.propTypes = {
  onPreviousButton: PropTypes.func.isRequired,
  onRedirectToHome: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.oneOf([
    'create-account',
    'check-cnpj',
    'type-cnpj',
    'without-cnpj',
    'company-data',
    'partner-data-part-1',
    'partner-data-part-2',
  ]),
  t: PropTypes.func.isRequired,
}

SelfRegister.defaultProps = {
  step: 'create-account',
}

export default SelfRegister
