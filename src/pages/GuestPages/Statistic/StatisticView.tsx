import React from 'react'
import { TStatisticTypes } from './StatisticTypes'
import House from '../../../assets/images/house.png'
import vestaimg from '../../../assets/images/vesta.png'
import houseIconDesc from '../../../assets/images/img-house.svg'
import carIconDesc from '../../../assets/images/icon-car-statistic-desc.svg'
import { sumFormat } from '../../../util/common'
import { Spin } from 'antd'
import './Statistic.scss'

export const StatisticView: React.FC<TStatisticTypes> = ({ statisticData }) => {
  return (
    <>
      <div className="statistic-section-header">
        <h1 className="mobile">Статистика</h1>
        <p className="statistic-actual-date">
          По состоянию на{' '}
          <span>
            {new Date().toLocaleDateString('ru', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        </p>
        <h1 className="desktop">Статистика</h1>
        <div className="have-been-working desktop">
          <span>Работаем с 2015 года</span>
          {statisticData && (
            <div className="have-been-working--numbers">
              {statisticData.clients_count
                .toString()
                .split('')
                .map((numb, id) => {
                  return <span key={id}>{numb}</span>
                })}{' '}
              клиентов
            </div>
          )}
        </div>
      </div>
      {statisticData !== null ? (
        <div className="first-section statistic-section">
          <div className="container">
            <div className="video-container-blue-fon">
              <div className="blue-fon-rotate gray-fon-rotate"></div>
            </div>
            <div className="first-section--title first-section--title--statistics">
              <div className="statistics-box-wrap">
                <div className="statistics-box-wrap--box">
                  <p className="statistics-box-wrap--title">
                    Наши клиенты совершили
                  </p>
                  <p className="statistics-box-wrap--quantity">
                    {statisticData.total.count}
                  </p>
                  <p className="statistics-box-wrap--description">покупок</p>
                </div>
                <div
                  className="statistics-box-wrap--box"
                  style={{ paddingTop: '32px' }}
                >
                  <p className="statistics-box-wrap--title ">На сумму</p>
                  <p className="statistics-box-wrap--quantity">
                    {sumFormat(statisticData.total.sum)}
                  </p>
                  <p className="statistics-box-wrap--description">млн. ₽</p>
                </div>
              </div>

              <div className="statistics-box-data">
                <h1>Недвижимость</h1>
                <div className="statistics-box-data--wrap">
                  <img src={houseIconDesc} alt="иконка дома" />
                  <div className="statistics-data-item--object">
                    <p>{statisticData.kkn.count}</p>
                    <span>объектов</span>
                  </div>
                  <div className="statistics-data-item--sum">
                    <span>на</span>
                    <p>{sumFormat(statisticData.kkn.sum)}</p>
                    <span>млн. ₽</span>
                  </div>
                </div>
              </div>

              <div className="statistics-box-data">
                <h1>Автомобили</h1>
                <div className="statistics-box-data--wrap">
                  <img src={carIconDesc} alt="иконка дома" />
                  <div className="statistics-data-item--object">
                    <p>{statisticData.kka.count}</p>
                    <span>объектов</span>
                  </div>
                  <div className="statistics-data-item--sum">
                    <span>на</span>
                    <p>{sumFormat(statisticData.kka.sum)}</p>
                    <span>млн. ₽</span>
                  </div>
                </div>
              </div>

              <img src={vestaimg} alt="Картинка машины" className="vesta-img" />
            </div>
            <div className="first-section--img-house">
              <img src={House} alt="img-house" />
            </div>
          </div>

          <div className="section-statistic-mobile">
            <div className="section-statistic-mobile--complete">
              <p className="title">Наши клиенты совершили</p>
              <p className="data">
                {statisticData.total.count} <span>покупок</span>
              </p>
              <p className="title">на сумму</p>
              <p className="data">
                {sumFormat(statisticData.total.sum)} млн. ₽
              </p>
            </div>
            <div className="section-statistic-mobile--program">
              <div className="statistic-program-item house">
                <p className="title">Недвижимость</p>
                <p className="data">{statisticData.kkn.count}</p>
                <p className="description">объектов</p>
                <p className="data">{sumFormat(statisticData.kkn.sum)}</p>
                <p className="description">млн. ₽</p>
              </div>
              <div className="statistic-program-item car">
                <p className="title">Автомобили</p>
                <p className="data">{statisticData.kka.count}</p>
                <p className="description">объектов</p>
                <p className="data">{sumFormat(statisticData.kka.sum)}</p>
                <p className="description">млн. ₽</p>
              </div>
            </div>
          </div>

          <div className="have-been-working mobile">
            <span>Работаем с 2015 года</span>
            <div className="have-been-working--numbers">
              {statisticData.clients_count
                .toString()
                .split('')
                .map((numb, id) => {
                  return <span key={id}>{numb}</span>
                })}{' '}
              клиентов
            </div>
          </div>
        </div>
      ) : (
        <div className="spin-wrap">
          <div
            style={{
              fontSize: '20px',
              textAlign: 'center',
              marginBottom: '25px',
            }}
          >
            Пожалуйста, подождите. Статистика рассчитывается до 10 сек. напрямую
            из актуальных данных на сайте.
          </div>
          <Spin size="large" />
        </div>
      )}
    </>
  )
}
