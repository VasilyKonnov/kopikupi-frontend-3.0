import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { YANDEX_METRIKA_NUMBER } from '../../constants'
import whiteLogo from '../../assets/images/white-logo.svg'
import './MobileMenu.css'
import { BlureFon } from '..'

type TMobileMenu = {
  visible: boolean
  toggle: () => void
  children: React.ReactNode
}

export const MobileMenu: React.FC<TMobileMenu> = ({
  visible,
  toggle,
  children,
}) => {
  if (!visible) {
    return null
  }

  return (
    <>
      <div className="mobile-menu">
        <div className="header-mobile-menu">
          <Link to="/login" className="login-btn-mob" onClick={toggle}>
            Войти
          </Link>
        </div>
        <div className="body-mobile-menu">{children}</div>
        <div className="footer-mobile-menu">
          <Link to="/" onClick={toggle}>
            <img src={whiteLogo} alt="Белый логотип" />
          </Link>
          <p>Дойдем до цели вместе с вами!</p>
        </div>
      </div>
      <BlureFon toggle={toggle} />
    </>
  )
}
