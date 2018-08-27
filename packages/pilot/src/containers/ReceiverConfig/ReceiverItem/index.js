import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
} from 'former-kit'

// por padrao props sempre tem uma chave children
// que são os filhos que eu vou passar para ele

const ReceiverItem = ({
  title,
  subtitle,
  icon,
  collapsed,
  onClick,
  children,
}) => (
  <Fragment>
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={title}
          subtitle={subtitle}
          collapsed={!collapsed}
          icon={icon}
          onClick={onClick}
        />
        <CardContent>
          {collapsed &&
            children
          }
        </CardContent>
      </CardSection>
    </CardContent>
  </Fragment>
)

ReceiverItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

ReceiverItem.defaultProps = {
  title: '',
  subtitle: '',
}

export default ReceiverItem
