import React from 'react'
import { Link } from 'react-router-dom'

export type TMenuLinksMobile = {
  toggleMenu?: () => void
  className?: string
}

export const MenuLinksGuest: React.FC<TMenuLinksMobile> = ({
  toggleMenu,
  className,
}) => {
  const classnames = ['menu-guest', className ? className : '']

  return (
    <div className={`${classnames[0] + ' ' + classnames[1]}`}>
      <Link onClick={toggleMenu} className="menu-guest--link" to="/articles">
        Блог
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to="/question-answer"
      >
        Вопрос-ответ
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link"
        to="/about-company"
      >
        Контакты
      </Link>
      <Link onClick={toggleMenu} className="menu-guest--link" to="/statistic">
        Статистика
      </Link>
      <Link onClick={toggleMenu} className="menu-guest--link" to="/reviews">
        Примеры покупок
      </Link>
      <Link
        onClick={toggleMenu}
        className="menu-guest--link mobile-link"
        to="/documents"
      >
        Нормативная документация
      </Link>
    </div>
  )
}
