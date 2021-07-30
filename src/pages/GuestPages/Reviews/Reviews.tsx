import React, { useState, useEffect } from 'react'
import { message, Modal } from 'antd'
import { getResourceUrl } from '../../../config'
import { ReviewsView } from './ReviewsView'
import { TReviewData } from './ReviewsTypes'

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState([])
  const [reviewsFilter, setReviewsFilter] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [videoLink, setVideoLink] = useState('')
  const [selectVal, setSelectVal] = useState<string | number>('all')

  const filterTypeProgramm = (typeProg: number | string) => {
    if (typeProg === 'all') {
      setReviewsFilter(reviews)
    } else {
      let data = reviews.filter(
        (review: TReviewData) => review.type === typeProg,
      )
      setReviewsFilter(data)
    }
  }

  const getReviews = async () => {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    const response = await fetch(getResourceUrl('/reviews/'), {
      method: 'GET',
      headers: headers,
    })

    if (response.ok) {
      let array = await response.json()
      setReviews(array)
    } else if (response.status !== 401) {
      message.error('Произошла ошибка при получении списка отзывов!')
    }
  }
  const showModal = (link: string) => {
    setIsModalVisible(true)
    setVideoLink(link)
  }
  const hideModal = () => {
    setVideoLink('')
    setIsModalVisible(false)
  }
  const handleSelect = (value: number | string) => {
    setSelectVal(value)
  }

  useEffect(() => {
    if (reviews.length < 1) {
      getReviews()
    } else {
      setReviewsFilter(reviews)
    }
  }, [reviews])

  useEffect(() => {
    filterTypeProgramm(selectVal)
  }, [selectVal, setSelectVal])

  return (
    <>
      <ReviewsView
        handleSelect={handleSelect}
        reviewsFilter={reviewsFilter}
        showModal={showModal}
      />
      <Modal
        visible={isModalVisible}
        onCancel={hideModal}
        footer={false}
        width={800}
      >
        <h3 className="all-reviewer">Видео отзыв</h3>
        <div className="video-wrapp-in-modul">
          <iframe
            width="100%"
            height="100%"
            src={videoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  )
}
