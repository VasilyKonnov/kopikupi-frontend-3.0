import { Input } from 'antd'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/images/logo.png'
import { routes } from '../../../constants'
import styles from './LoginPage.module.scss'
import classNames from 'classnames'

export const LoginPage: React.FC = () => {
  const linkDesktop = classNames(styles.link, styles.linkDesk)
  const linkMobile = classNames(styles.link, styles.linkMob)
  return (
    <div className={styles.wrap}>
      <div className={styles.item}>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <p>Введите номер телефона</p>
        <Input
          className={styles.input}
          aria-label="phone"
          placeholder="+7 --- --- -- --"
          name="phone"
          type="tel"
          // disabled={inputDisabled}
          // value={userPhoneVal}
          onChange={(event: any) => console.log(event)}
        />
        <Input
          className={styles.input}
          aria-label="phone"
          placeholder="Введите пароль"
          name="phone"
          type="password"
          // disabled={inputDisabled}
          // value={userPhoneVal}
          onChange={(event: any) => console.log(event)}
        />
        <Link to={routes.signUp} className={linkDesktop}>
          Регистрация
        </Link>
        <Link to={routes.signUp} className={linkDesktop}>
          Забыли пароль?
        </Link>

        <button className="login-btn">Войти</button>

        <Link to={routes.signUp} className={linkMobile}>
          Регистрация
        </Link>
        <Link to={routes.signUp} className={linkMobile}>
          Забыли пароль?
        </Link>
      </div>
    </div>
  )
}
