import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import 'normalize.css';
import Auth from '../src/components/auth/auth';
import ResetPassword from '../src/components/auth/resetPassword';
import Home from '../src/components/home/home';
import House from '../src/components/green-house/green-house';
import Timeline from '../src/components/timeline/timeline';
import FillCard from '../src/components/fill-card/fill-card';
import ProtectedRoute from '../src/all/common/protected-route';
import Stock from './components/stock/stock'
import Fridge from './components/fridge/fridge'
import Kartat from './components/kartat/kartat'
import Faturimi from './components/faturimi/faturimi'
import Fatura from './components/faturimi/fatura'
import Raporti from './components/raporti/raporti'
import AllUsers from './admin/users/users'
import Logout from "./components/auth/logout";
import { ToastContainer } from "react-toastify";
import Temperatura from './components/temperatura/temperatura'
import ActivitiesPage from './components/right-part/activitiesPage/activitiesPage'
import auth from '../src/services/authService';
import { onChangeLanguage, ChangeLanguage } from './components/global/language'
import userService from "./services/userService";

const user = auth.getCurrentUser();

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      language: 'al'
    }
  }

  componentDidMount() {
    if(user)
    {
      userService.getCurrentUser().then(({ data: response }) => {
          this.setState({
              language : response.language,
          })
      })
    }
  }

  onChangeLanguage1 = () => {
    let { language } = this.state;
    let value = '';
    if(language === 'al')
    {
        value = 'en'
    }else {
        value = 'al'
    }
    if(user)
    {
      userService.language( value ).then(({ data: response }) => {
        onChangeLanguage(response.language);
        this.setState({
          language: response.language
        })
      }).catch(err => {
        this.setState({
            loading: false
        })
      })
    }else{
      onChangeLanguage(value);
      this.setState({
        language: value
      })
    }
}
  
  render() {
    return (
      <Route
        render={({ location }) => (
          <React.Fragment>
            <ChangeLanguage onClick={this.onChangeLanguage1} />
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/reset-password/token=:token" component={ResetPassword} />
              <Route path="/fatura" component={Fatura} />
              <ProtectedRoute access={true} path="/logout" component={Logout} />
              <ProtectedRoute exact access={true} path="/" component={Home} />
              <ProtectedRoute access={user && user.access_dashboard} path="/green-house" component={House} />
              <ProtectedRoute access={true} path="/cards" component={Kartat} />  
              <ProtectedRoute access={false} path="/timeline" component={Timeline} />
              <ProtectedRoute access={true} path="/activities" component={ActivitiesPage} />
              <ProtectedRoute access={true} path="/fill-card" component={FillCard} />
              <ProtectedRoute access={user && user.access_fridge} path="/fridge" component={Fridge} />
              <ProtectedRoute access={user && user.access_stock} path="/stoku" component={Stock} />
              <ProtectedRoute access={user} path="/faturimi" component={Faturimi} />
              <ProtectedRoute access={user && user.access_reports} path="/raporti" component={Raporti} />
              <ProtectedRoute access={user && user.access_users} path="/all-users" component={AllUsers} />
              <ProtectedRoute access={user && user.access_temperatures} path="/temperatura" component={Temperatura} />
              <Redirect to='/' />
            </Switch>
            <ToastContainer />
          </React.Fragment>
        )}
      />
    );
  }
}

export default withRouter(App);