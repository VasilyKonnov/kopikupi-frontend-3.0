import { Route, Switch } from 'react-router-dom'
import { LayoutGuest, LayoutProfile } from './components'
import {
  Main,
  Reviews,
  Statistic,
  QuestionAnswer,
  AboutCompany,
  Documents,
  SignUpForm,
  Blog,
  LoginPage,
} from './pages/GuestPages/'
import {
  MainProfile,
  NewMoneyBox,
  Programs,
  Chat,
  More,
  StepsFillProfile,
  RestorePassword,
} from './pages/ProfilePages'
import 'antd/dist/antd.css'
import './index.scss'
import { routes, userRoutes } from './constants'

const isAuth = false

function App() {
  if (isAuth) {
    return (
      <LayoutProfile>
        <Route exact path={'/'} component={MainProfile} />
        <Route exact path={userRoutes.moneyBox} component={NewMoneyBox} />
        <Route exact path={userRoutes.programs} component={Programs} />
        <Route exact path={userRoutes.finance} component={Programs} />
        <Route exact path={userRoutes.chat} component={Chat} />
        <Route exact path={userRoutes.more} component={More} />
        <Route exact path={userRoutes.profile} component={StepsFillProfile} />
        <Route
          exact
          path={userRoutes.restorePassword}
          component={RestorePassword}
        />
      </LayoutProfile>
    )
  } else {
    return (
      <LayoutGuest>
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route exact path={routes.signUp} component={SignUpForm} />
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.articles} component={Blog} />
          <Route
            exact
            path={routes.questionAnswer}
            component={QuestionAnswer}
          />
          <Route exact path={routes.aboutCompany} component={AboutCompany} />
          <Route exact path={routes.statistic} component={Statistic} />
          <Route exact path={routes.reviews} component={Reviews} />
          <Route exact path={routes.documents} component={Documents} />
        </Switch>
      </LayoutGuest>
    )
  }
}

export default App
