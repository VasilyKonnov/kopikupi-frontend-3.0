import './Header.scss'
import { Link } from 'react-router-dom'
import Logo from './img/logo.svg'
import { THeader } from './HeaderTypes'
import { useEffect, useState } from 'react'
import mobileMenuIcon from '../../assets/images/mobile-menu.svg'
import { MobileMenu } from '..'
import { MenuLinksGuest } from './MenuLinksGuest'
import { MenuLinksProfile } from './MenuLinksProfile'
import { routes, userRoutes } from '../../constants'
import imgAvatar from '../../assets/images/imgAvatar.svg'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
import { getLineAndCharacterOfPosition } from 'typescript'

export const Header: React.FC<THeader> = ({ children }) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isAuth = false
  const headerClassNames = classNames('header', isAuth ? 'header-auth' : '')

  const rightBlockClassNames = classNames(
    'rigth-block',
    isAuth ? 'rigth-block-auth' : '',
  )

  const handlerToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  if (location.pathname === routes.login) {
    return (
      <>
        <header className={headerClassNames}>
          <div className="container">
            <div className="wrap-menu-item">
              <button
                className="mobile-menu-button"
                onClick={handlerToggleMenu}
              >
                <img src={mobileMenuIcon} alt="mobileMenuIcon" />
              </button>
            </div>
          </div>
        </header>
        <MobileMenu visible={isMobileMenuOpen} toggle={handlerToggleMenu}>
          <MenuLinksGuest
            toggleMenu={handlerToggleMenu}
            className="mobile-menu-link"
          />
        </MobileMenu>
      </>
    )
  } else {
    return (
      <>
        <header className={headerClassNames}>
          <div className="container">
            <div className="wrap-menu-item">
              <Link to="/" className="desctop-logo">
                <img src={Logo} alt="Логотип" />
              </Link>
              <button
                className="mobile-menu-button"
                onClick={handlerToggleMenu}
              >
                <img src={mobileMenuIcon} alt="mobileMenuIcon" />
              </button>
              <div className="menu-guest desctop-menu-link">{children}</div>
              <div className={rightBlockClassNames}>
                {isAuth ? (
                  <Link to={userRoutes.profile} className="auth-user-icon">
                    <span>Пайщик</span>
                    <img src={imgAvatar} alt="аватарка пайщика" />
                  </Link>
                ) : (
                  <Link to="/login" className="login-btn">
                    Войти
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
        <MobileMenu visible={isMobileMenuOpen} toggle={handlerToggleMenu}>
          {isAuth ? (
            <>
              <div className="menu-guest mobile-menu-link">
                <Link
                  onClick={handlerToggleMenu}
                  className="menu-guest--link"
                  to="/"
                >
                  Главная
                </Link>
              </div>
              <MenuLinksProfile
                toggleMenu={handlerToggleMenu}
                className="mobile-menu-link"
              />
            </>
          ) : (
            <MenuLinksGuest
              toggleMenu={handlerToggleMenu}
              className="mobile-menu-link"
            />
          )}
        </MobileMenu>
      </>
    )
  }
}
