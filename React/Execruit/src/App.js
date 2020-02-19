import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./assets/css/App.css";
import "./assets/css/mobile.css";
import "./assets/css/grid.css";
import "./assets/css/user_layout.css";
import UserProfile from "./components/userProfile/userProfile";
import CurrentUserProfile from "./components/userProfile/currentUserProfile";
import Favorites from "./components/favorites/favorites";
import Logout from "./components/auth/logout";
import Auth from "./components/auth/auth";
import ConfirmEmail from "./components/auth/confirm_email"
import ProtectedRoute from "../src/all/common/protected-route";
import EditUserProfile from "./components/userProfile/editProfile";
import Users from "./components/showUsers/users";
import { ToastContainer } from "react-toastify";
import Test from '../src/components/search/test'
import PostCompany from '../src/components/posts/posts';
import LinkedInPage from './components/auth/linkedin/linkedinButton';
import CompanyProfile from './components/companyProfile/company';
import CompanyInfo from './components/companyProfile/companyInfo';
import Home from './components/home/home';
import auth from "./services/authService";
import Notification from "./components/companyProfile/Notification/allNotifications";
import AllCompanies from "./components/userProfile/allCompanies"
import ResetPassword from "./components/auth/resretPassword";
import AllAplicants from "./components/companyProfile/allAplicants";
import PrivacyPolicy from "./all/common/privacyPolicy";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: '',
        role: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }

  render() {
    const styleLink = document.createElement("link");

    styleLink.rel = "stylesheet";
    styleLink.href =
      "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);

    const { data } = this.state;
    let { role } = data;

    const user = auth.getCurrentUser()
    return (
      <Route
        render={({ location }) => (
          <React.Fragment>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
              <Route path="/logout" component={Logout} />
              <Route path='/confirm-email/token=:token' component={ConfirmEmail} />
              <Route path="/change-password/token=:token" component={ResetPassword} />
              {
                user && user.role !== 'user' &&
                <ProtectedRoute path="/home" component={Home} />
              }
              <ProtectedRoute path="/favorite-users" component={Favorites} />
              <ProtectedRoute path="/user-profile/:username" component={UserProfile} role={role} />
              <Route path="/company/:id" component={CompanyInfo} />
              {
                user && user.role === 'user' &&
                <ProtectedRoute path="/profile" component={CurrentUserProfile} />
              }
              {
                user && user.role === 'user' &&
                <ProtectedRoute path="/edit-user-profile" component={EditUserProfile} />
              }
              {
                user && user.role !== 'user' &&
                <ProtectedRoute path="/all-users" component={Users} />
              }
              <Route exact path="/jobs" component={PostCompany} />
              <Route exact path="/jobs/:job_id" component={PostCompany} />
              <ProtectedRoute path="/all-users?value" component={Users} />
              <ProtectedRoute path="/linkedin" component={LinkedInPage} />
              <ProtectedRoute path="/notifications" component={Notification} />
              {
                user && user.role === "company" &&
                <ProtectedRoute path="/company" component={CompanyProfile} />
              }
              {
                user && user.role !== "user" &&
                <ProtectedRoute path="/all-applicants" component={AllAplicants} />
              }
              {
                user && user.role === "company" &&
                <Redirect to="/company" component={CompanyProfile} />
              }

              <ProtectedRoute path="/test" component={Test} />
              <ProtectedRoute path="/all-company" component={AllCompanies} />
              {
                user && user.role !== 'company' &&
                <Redirect to="/jobs" />
              }
              {!user &&
                <Redirect to="/auth" />
              }
            </Switch>
            <ToastContainer />
          </React.Fragment>
        )}
      />
    );
  }
}

export default App;
