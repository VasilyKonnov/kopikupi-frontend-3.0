import { TLayoutProfile } from './TLayoutProfileTypes'
import { MenuLinksProfile } from './../Header/MenuLinksProfile'
import { Header } from '..'

export const LayoutProfile: React.FC<TLayoutProfile> = ({ children }) => {
  return (
    <>
      <Header>
        <MenuLinksProfile />
      </Header>
      {children}
      <div style={{ height: '65px' }}></div>
    </>
  )
}
