import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router'
// import C from '../../../../redux/constants'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import {acceptOfferRequested, getUserProfile} from '../../../../redux/actions/actions'
import { MainProfileView } from './MainProfileView'

export const MainProfile = (props: any) => {
  const { requestAcceptOffer } = props
  const [isRequestPending, setIsRequestPending] = useState<boolean>(false)

  const handleFillBtnClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setIsRequestPending(true)
    requestAcceptOffer()
  }
  return (
    <MainProfileView
      handleFillBtnClick={handleFillBtnClick}
      isRequestPending={isRequestPending}
    />
  )
}

// function mapDispatchToProps(dispatch: any) {
//   return {
//     requestAcceptOffer: () => dispatch(acceptOfferRequested()),
//   }
// }

// function mapStateToProps(state: any) {
//   return {}
// }

// export const ConnectedMain = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(compose(withRouter(Main)))
