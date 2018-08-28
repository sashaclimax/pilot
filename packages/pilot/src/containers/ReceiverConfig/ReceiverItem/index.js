import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardSectionDoubleLineTitle,
  CardContent,
} from 'former-kit'

const ReceiverItem = ({
  title,
  subtitle,
  icon,
  collapsed,
  onClick,
  children,
  id,
}) => (
  <Fragment>
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={title}
          subtitle={subtitle}
          collapsed={!collapsed}
          icon={icon}
          onClick={() => onClick(id)}
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
  id: PropTypes.string.isRequired,
}

ReceiverItem.defaultProps = {
  title: '',
  subtitle: '',
}

export default ReceiverItem
