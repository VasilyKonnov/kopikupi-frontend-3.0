import React from 'react'
import iconPhone from '../../../assets/images/contsct-phone.svg'
import iconEmail from '../../../assets/images/contsct-email.svg'
import { supportEmail } from '../../../constants'
import './AboutCompany.scss'

export const AboutCompany = () => {
  return (
    <div className="container">
      <div className="ant-row about-company-row">
        <div className="ant-col about-company-col-info ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-8">
          <h2>Контакты</h2>
          <p>C нами можно связаться по телефону или написать на нашу почту</p>
          <div className="about-company-phone-email">
            <a className="phone" href="tel:88002500509">
              <img src={iconPhone} alt="иконка телефона" />
              <span aria-label="phone">8 800 250-05-09</span>
            </a>
            <p className="prompt">Звонок по России бесплатный</p>
            <a className="email" href={`mailto:${supportEmail}`}>
              <img src={iconEmail} alt="иконка email" />
              <span>{supportEmail}</span>
            </a>
          </div>

          <div className="about-company-mobile-map">
            <p className="about-company-mobile-map--adress">
              Адрес Правления: 644070, г. Омск, ул. Омская, д. 119, корп. 1 ,
              кв. 9
            </p>
            <div className="about-company-mobile-map--map-wrap">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A324b71bd003ee78f516a261ec2238e6a291373ff2cbf58d442155dd3618d0c04&amp;source=constructor&amp;scroll=false"
                width="100%"
                height="300"
                frameBorder="0"
                title="Яндекс карта"
              ></iframe>
            </div>
            <p className="about-company-mobile-map--schedule">
              График работы (мск):
            </p>
            <div className="mobile-map--schedule">
              <div className="mobile-map-schedule-item">
                <span>пн-ср</span>
                <p>6.00 - 15.00</p>
              </div>
              <div className="mobile-map-schedule-item">
                <span>пт</span>
                <p>6.00 - 14.00</p>
              </div>
              <div className="mobile-map-schedule-item">
                <span>сб, вс</span>
                <p>выходной</p>
              </div>
            </div>
          </div>

          <p className="social">
            Вступайте в наши сообщества в социальных сетях
          </p>
          <div className="about-company-social-icons">
            <div className="icon-wrapper">
              <a
                target="_blank"
                className="footer-icon vk-icon"
                href="https://vk.com/kopikupiru"
              ></a>
              <a
                target="_blank"
                className="footer-icon ok-icon"
                href="https://ok.ru/kopikupi/"
              ></a>
              <a
                target="_blank"
                className="footer-icon footer-icon-inst"
                href="https://www.instagram.com/kopikupi.ru/"
              ></a>
              <a
                target="_blank"
                className="footer-icon fb-icon"
                href="https://www.facebook.com/kopikupi55/"
              ></a>
              <a
                target="_blank"
                className="footer-icon youtube-icon"
                href="https://www.youtube.com/%D0%BA%D0%BE%D0%BF%D0%B8%D0%BA%D1%83%D0%BF%D0%B8"
              ></a>
            </div>
          </div>
          <h2 className="grey-color">Реквизиты кооператива</h2>
          <p className="requisites">ПКСН «КОПИКУПИ»</p>
          <p className="requisites" aria-label="INN">
            ИНН 5503228307
          </p>
          <p className="requisites">ОГРН 1115543016995</p>
        </div>
        <div className="ant-col about-company-col-map ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-16">
          <h2>Адрес Правления</h2>
          <p>644070, г. Омск, ул. Омская, д. 119, корп. 1, кв. 9</p>
          <div className="about-company-col-map--map-wrap">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A324b71bd003ee78f516a261ec2238e6a291373ff2cbf58d442155dd3618d0c04&amp;source=constructor&amp;scroll=false"
              width="100%"
              height="465"
              frameBorder="0"
              title="Яндекс карта"
            ></iframe>
          </div>
          <div className="about-company-col-map--schedule">
            <div className="schedule--header">
              <h2>График работы </h2>
              <p>Московское время</p>
            </div>
            <div className="schedule--body">
              <div className="schedule-body--item">
                <span>пн-ср</span>
                <p>6.00 - 15.00</p>
              </div>
              <div className="schedule-body--item">
                <span>пт</span>
                <p>6.00 - 14.00</p>
              </div>
              <div className="schedule-body--item">
                <span>сб, вс</span>
                <p>выходной</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
