import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.css'
import Transition from '../Transition'

const Loader = ({
  label,
  text,
  visible,
}) => (
  <Transition
    atActive={{
      width: 100,
      opacity: 1,
    }}
    atEnter={{
      width: 0,
      zIndex: 10,
      opacity: 0,
    }}
    atLeave={{
      width: 15,
      opacity: 0,
    }}
    className={style.transition}
    mapStyles={item => ({
      ...item,
      width: `${item.width.toFixed(2)}%`,
    })}
    springOptions={{
      damping: 26,
      precision: 0.01,
      stiffness: 170,
    }}
  >
    {visible &&
      <div
        className={
          classNames(
            style.overlay,
            style.loaderOverlay,
            style.highZIndex
          )}
        key="overlay"
      >
        <div
          aria-live="polite"
          aria-busy="true"
          aria-label={label}
          className={style.loader}
          role="progressbar"
        />
        <span className={style.text}>{text}</span>
      </div>
    }
  </Transition>
)

Loader.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool,
}

Loader.defaultProps = {
  label: 'Loading',
  text: '',
  visible: false,
}

export default Loader
