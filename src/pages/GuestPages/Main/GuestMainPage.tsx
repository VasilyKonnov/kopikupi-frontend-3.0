import { Layout } from 'antd'
// import { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import PreloadWrapper from './PreloadWrapper'
import { GuestMainPageView } from './GuestMainPageViews'

export const GuestMainPage = () => {
  return <Layout.Content>{<GuestMainPageView />}</Layout.Content>
}
