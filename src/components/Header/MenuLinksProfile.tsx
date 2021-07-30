import { Link } from 'react-router-dom'
import { userRoutes } from '../../constants'
import { TMenuLinksMobile } from './MenuLinksGuest'

export const MenuLinksProfile: React.FC<TMenuLinksMobile> = ({
  className,
  toggleMenu,
}) => {
  const classnames = [
    'menu-guest menu-guest-profile',
    className ? className : '',
  ]

  return (
    <div className={`${classnames[0] + ' ' + classnames[1]}`}>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to={userRoutes.moneyBox}
      >
        Новая копилка
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to={userRoutes.programs}
      >
        Посмотреть расчёты
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to={userRoutes.programs}
      >
        Внести накопление
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to={userRoutes.finance}
      >
        Финансы
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to={userRoutes.chat}
      >
        Чат
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to={userRoutes.more}
      >
        Ещё...
      </Link>
    </div>
  )
}
