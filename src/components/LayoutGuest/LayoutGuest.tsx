import { TLayoutGuest } from './TLayoutGuestTypes'
import { FooterBeforeAuth, Header } from '../../components'
import { MenuLinksGuest } from '../Header/MenuLinksGuest'

export const LayoutGuest: React.FC<TLayoutGuest> = ({ children }) => {
  return (
    <>
      <Header>
        <MenuLinksGuest />
      </Header>
      {children}
      <FooterBeforeAuth />
    </>
  )
}
