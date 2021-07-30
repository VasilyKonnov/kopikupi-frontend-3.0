import styles from './RestorePassword.module.scss'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input } from 'antd'
import classNames from 'classnames'

export const RestorePassword = () => {
  const classNameButton = classNames(
    'button-primary',
    'btm-center',
    styles.button,
  )
  const classNameTitle = classNames('pageTitle', 'titleCenter')
  return (
    <div className={styles.wrap}>
      <h2 className={classNameTitle}>Смена пароля</h2>
      <Input.Password
        className={styles.input}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        type="password"
        placeholder="Старый пароль"
      />
      <Input.Password
        className={styles.input}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        type="password"
        placeholder="Новый пароль"
      />
      <Input.Password
        className={styles.input}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        type="password"
        placeholder="Подтверждение нового пароля"
      />
      <button className={classNameButton}>Сменить пароль</button>
    </div>
  )
}
