import React from 'react'
import { Spin } from 'antd'
import Logo from '../../../assets/images/logo.svg'
import './GuestMainPage.css'

const PreloadWrapper: React.FC = () => {
  return (
    <div className="preload-main-page">
      <div className="preload-main-page--logo">
        <img src={Logo} />
        <div className="preload-main-page--spiner">
          <Spin style={{ color: '#fff' }} tip="Загрузка..." />
        </div>
      </div>
    </div>
  )
}
export default PreloadWrapper
