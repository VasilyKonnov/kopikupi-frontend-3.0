import React from 'react'
import { StatisticView } from './StatisticView'
import { useEffect, useState } from 'react'
import { getResourceUrl } from '../../../config'
import { message } from 'antd'

export const Statistic: React.FC = () => {
  const [statisticData, setStatisticData] = useState(null)

  const getStatistic = async () => {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    const response = await fetch(getResourceUrl('/guest-statistics/'), {
      method: 'GET',
      headers: headers,
    })
    if (response.ok) {
      let array = await response.json()
      setStatisticData(array)
    } else if (response.status !== 401) {
      message.error('Произошла ошибка при получении статистики!')
    }
  }

  useEffect(() => {
    if (statisticData === null) {
      getStatistic()
    }
  }, [statisticData, setStatisticData])

  return <StatisticView statisticData={statisticData} />
}
