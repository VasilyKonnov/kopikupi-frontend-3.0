import { Link } from 'react-router-dom'
import LogoFooter from '../../assets/images/footer-logo.svg'
import checkIcon from '../../assets/images/footer-check-icon.svg'
import phoneIcon from '../../assets/images/footer-phone-icon.svg'
import './footerBeforeAuth.css'
import { routes } from '../../constants'

const date = new Date()

export const FooterBeforeAuth = () => {
  return (
    <>
      <footer className="footerBeforeAuth">
        <div className="container">
          <div className="footer-greed-wrapper">
            <div className="footer-col-1">
              <div>
                <img
                  style={{ maxWidth: '115px' }}
                  src={LogoFooter}
                  alt="Логотип"
                />
              </div>
              <p>8 800 250-05-09</p>
              <span>Телефон для звонков по России</span>
            </div>

            <div className="footer-col">
              <p className="footer-menu-first-item">О нас</p>
              <div className="footer-menu-wrap">
                <div>
                  <Link to={routes.articles} className="footer-menu-item">
                    Блог
                  </Link>
                  <Link to={routes.questionAnswer} className="footer-menu-item">
                    Вопрос-ответ
                  </Link>
                </div>
                <div>
                  <Link to={routes.aboutCompany} className="footer-menu-item">
                    Контакты
                  </Link>
                  <Link to={routes.reviews}>
                    <span className="footer-menu-item">Примеры покупок</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="footer-col-2">
              <div className="footer-doc">
                <img
                  src={checkIcon}
                  style={{ width: '35px', marginRight: '11px' }}
                  alt="checkIcon"
                />
                <Link to={routes.documents}>
                  <span className="footer-doc-txt">
                    Нормативная документация
                  </span>
                </Link>
              </div>
            </div>

            <div className="footer-col">
              <p className="first-colm-string">
                <img src={phoneIcon} alt="phoneIcon" />
                <span>8 800 250-05-09</span>
                <span className="footer-small-text">
                  Телефон для звонков по России
                </span>
              </p>
              <div className="icon-wrapper">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="footer-icon vk-icon"
                  href="https://vk.com/kopikupiru"
                ></a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="footer-icon ok-icon"
                  href="https://ok.ru/kopikupi/"
                ></a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="footer-icon footer-icon-inst"
                  href="https://www.instagram.com/kopikupi.ru/"
                ></a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="footer-icon fb-icon"
                  href="https://www.facebook.com/kopikupi55/"
                ></a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="footer-icon youtube-icon"
                  href="https://www.youtube.com/%D0%BA%D0%BE%D0%BF%D0%B8%D0%BA%D1%83%D0%BF%D0%B8"
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right">
          <div className="container">
            <span>2015 – {date.getFullYear()}, КОПИКУПИ</span>
          </div>
        </div>
      </footer>
    </>
  )
}
