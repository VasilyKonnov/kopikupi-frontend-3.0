import React from 'react'
import Slider from 'react-slick'
import iconMany from '../../../assets/images/meshok.svg'
import iconDatePicker from '../../../assets/images/Calendar.svg'
import { Select, Spin } from 'antd'
import { TReviews } from './ReviewsTypes'
import playImg from '../../../assets/images/play-video.png'
import { convertRu } from '../../../util/common'
import './slickStyled.css'
import './Reviews.scss'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  centerMode: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
      },
    },
    {
      breakpoint: 767,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: false,
      },
    },
  ],
}

export const ReviewsView: React.FC<TReviews> = ({
  handleSelect,
  reviewsFilter,
  showModal,
}) => {
  const { Option } = Select
  return (
    <>
      <div className="container">
        <h1 className="shopping-examples-h1">Примеры покупок</h1>
        <div className="type-purchase">
          <p className="type-purchase--title">Тип покупки</p>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            showArrow={false}
            aria-label="type-select"
            onChange={handleSelect}
            className="reviews-select"
          >
            <Option value="all" aria-label="all-type">
              Все
            </Option>
            <Option value={1} aria-label="kkn-type">
              Недвижимость
            </Option>
            <Option value={2} aria-label="kka-type">
              Автомобиль
            </Option>
          </Select>
        </div>
      </div>
      <div className="shopping-examples-slider-wrap">
        <div className="left-blure"></div>
        {reviewsFilter.length > 0 ? (
          <Slider {...settings}>
            {reviewsFilter.map((review: any) => {
              const accDateWithoutDay = review.accumulation_date.substr(3)
              return (
                <React.Fragment key={review.pk}>
                  <div
                    className="shopping-examples-slide"
                    aria-label="review-slide"
                  >
                    <div className="shopping-examples-slide--item">
                      <div className="slide-item-info">
                        <div className="slide-item-info--photo">
                          {review.video_link.length > 1 ? (
                            <div
                              className="reviews-play-button"
                              onClick={() => showModal(review.video_link)}
                            >
                              <img src={playImg} alt="Кнопка play" />
                            </div>
                          ) : (
                            ''
                          )}
                          <picture>
                            <source
                              media="(max-width: 767px)"
                              srcSet={review.mobile_image_url}
                            />
                            <source
                              media="(min-width: 768)"
                              srcSet={review.desktop_image_url}
                            />
                            <img
                              aria-label="review-desktop-image-url"
                              src={review.desktop_image_url}
                              alt="Фото пайщика"
                            />
                          </picture>
                        </div>
                        <div className="slide-item-info--data">
                          <h2 aria-label="review-title">{review.title}</h2>
                          <p aria-label="review-preview">{review.preview}</p>
                          <div className="title-vs-icon">
                            <img
                              className="iconMany"
                              src={iconMany}
                              alt="иконка"
                            />
                            <span>Первоначальные накопления:</span>
                          </div>
                          <div className="shopping-examples-result-sum">
                            <p className="result-sum-inner-text">
                              Первоначальные накопления:
                            </p>
                            <span aria-label="review-initial-payment">
                              {convertRu(review.initial_payment, ' ₽', false)}
                            </span>
                          </div>
                          <div className="title-vs-icon">
                            <img
                              className="iconDatePicker"
                              src={iconDatePicker}
                              alt="иконка"
                            />
                            <span>Ежемесячные накопления:</span>
                          </div>
                          <div className="shopping-examples-result-sum">
                            <p className="result-sum-inner-text">
                              Ежемесячные накопления:
                            </p>
                            <span aria-label="review-monthly-payment">
                              {convertRu(review.monthly_payment, ' ₽', false)}
                            </span>
                          </div>
                          <div className="commission-whole-period-mob">
                            <p className="result-sum-inner-text">
                              Комиссия сервиса за весь период:
                            </p>
                            <span>
                              {convertRu(review.commission, ' ₽', false)}
                            </span>
                          </div>
                          <p className="commission-whole-period-desk">
                            Комиссия сервиса за весь период:{' '}
                            <span aria-label="review-commission">
                              {convertRu(review.commission, ' ₽', false)}
                            </span>
                          </p>
                          <p className="shopping-exemple-accumulate-sum">
                            Накопит всю сумму к{' '}
                            <span aria-label="review-accumulation-date">
                              {accDateWithoutDay}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="slide-item-text">
                        <h3>Отзыв клиента</h3>
                        <p aria-label="review-body">{review.body}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </Slider>
        ) : (
          <div className="spin-wrap">
            <Spin size="large" />
          </div>
        )}
        <div className="right-blure"></div>
      </div>
    </>
  )
}
