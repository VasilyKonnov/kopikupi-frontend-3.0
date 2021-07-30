import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/images/logo.png'
import House from '../../../assets/images/house.png'
import vestaimg from '../../../assets/images/vesta.png'
import iconArrowDown from '../../../assets/images/arrow-down.svg'
import moneyBoxImg from '../../../assets/images/kopilka.png'
import arrow87 from '../../../assets/images/arrow-87.svg'
import advant1 from '../../../assets/images/advant-1.svg'
import advant2 from '../../../assets/images/advant-2.svg'
import advant3 from '../../../assets/images/advant-3.svg'
import advant4 from '../../../assets/images/advant-4.svg'
import advant5 from '../../../assets/images/advant-5.svg'
import { SectionCalculator } from '../../../components/SectionCalculator'
import './GuestMainPage.scss'

const responsiveTwoCol = { xs: 32, sm: 32, md: 12, lg: 12 }
const responsiveThreeCol = { xs: 32, sm: 12, md: 8, lg: 8 }
const responsiveLastCol = { xs: 32, sm: 32, md: 8, lg: 8 }

export const GuestMainPageView: React.FC = () => {
  return (
    <>
      <div className="first-section">
        <div className="container">
          <div className="video-container-blue-fon">
            <div className="blue-fon-rotate"></div>
          </div>
          <div className="mobile-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="first-section--title">
            <div className="video-container-blue-fon">
              <div className="blue-fon-rotate"></div>
            </div>
            <h1>
              Сервис для накоплений на <span>крупные</span> покупки
            </h1>
            <p>Копите по выбранному вами графику, а мы ускорим покупку</p>
            <img src={vestaimg} alt="Картинка машины" className="vesta-img" />
          </div>
          <div className="first-section--img-house">
            <img src={House} alt="img-house" />
          </div>
        </div>
        <img
          src={iconArrowDown}
          title="arrow-down"
          className="mob-arrow-down"
          alt="iconArrowDown"
        />
      </div>
      <div className="first-section-border-bottom"></div>

      <div className="container money-box-container">
        <div className="ant-greed-container">
          <Row>
            <Col {...responsiveTwoCol} className="gutter-row">
              <div className="money-box-img">
                <img src={moneyBoxImg} alt="moneyBoxImg" />
              </div>
            </Col>
            <Col {...responsiveTwoCol} className="gutter-row money-box-text">
              <p>
                Без сервиса <span className="bold-text">только</span>{' '}
                <span className="big-number">6</span> % начавших самостоятельно
                копить доходят до финиша
              </p>
              <p>
                Большинство
                <br /> не достигают цели из-за незапланированных растрат,
                забывчивости и отсутствия дисциплины.
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <div className="advantages-container">
        <div className="positive-statistics">
          <div className="positive-statistics--wrap">
            <h2>87%</h2>
            <p>
              пользователей сервисa <span>КОПИКУПИ</span> достигают своих целей{' '}
              <img src={arrow87} alt="arrow down" />
            </p>
            <img
              src={iconArrowDown}
              title="arrow-down"
              className="mob-arrow-down"
              alt="iconArrowDown"
            />
          </div>
        </div>
        <div className="container">
          <div className="ant-greed-container">
            <h2 className="advantages-title">Накапливайте с комфортом</h2>
            <Row gutter={32} className="advantages-two-item-rows">
              <Col {...responsiveTwoCol}>
                <div className="item-advantages">
                  <img src={advant1} className="advant1" alt="advant1" />
                  <h3>Сохраним накопления</h3>
                  <p>
                    Сбережем ваши накопления, в первую очередь от вас :){' '}
                    <span>Защитим </span>
                    от импульсных покупок
                  </p>
                </div>
              </Col>
              <Col {...responsiveTwoCol}>
                <div className="item-advantages">
                  <img src={advant2} className="advant2" alt="advant2" />
                  <h3>Доведем до цели</h3>
                  <p>
                    Вовремя <span>напомним</span> про график,{' '}
                    <span>поддержим</span> советом, пересчитаем прогноз при
                    смене цели
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col {...responsiveThreeCol}>
                <div className="item-advantages">
                  <img src={advant3} className="advant3" alt="advant3" />
                  <h3>Ускорим покупку</h3>
                  <p>
                    Придерживайтесь выбранного вами графика, и мы{' '}
                    <span>максимально </span>
                    <span>ускорим покупку</span> через займ на комфортных для
                    вас условиях
                  </p>
                </div>
              </Col>
              <Col {...responsiveThreeCol}>
                <div className="item-advantages">
                  <img src={advant4} className="advant4" alt="advant4" />
                  <h3>Обеспечим чистоту сделки</h3>
                  <p>
                    {' '}
                    <span>Оформим</span> сделку нотариально. Это{' '}
                    <span>гарантирует</span> возврат денег в случае форс-мажора
                    и <span>убережет</span> вас от покупки проблемных объектов
                  </p>
                </div>
              </Col>
              <Col {...responsiveLastCol}>
                <div className="item-advantages item-advantages-mob-center">
                  <img src={advant5} className="advant5" alt="advant5" />
                  <h3>Повысим финансовую культуру</h3>
                  <p>
                    Вы получите <span>уникальный опыт</span> накопления на
                    крупные покупки и ценное общение в нашем сообществе
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div className="calculator-container">
        <div className="container">
          <SectionCalculator />
        </div>
      </div>

      <div className="video-container">
        <div className="video-container-blue-fon">
          <div className="blue-fon-rotate"></div>
        </div>
        <div className="container">
          <h2>
            Посмотрите ролик, в котором основатель сервиса рассказывает о работе
            КОПИКУПИ
          </h2>
          <div className="video-container--video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/eUZVDUNF350"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <Link to="/sign-up" className="white-button-blue-txt" type="button">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </>
  )
}
