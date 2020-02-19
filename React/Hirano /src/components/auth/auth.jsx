import React, { Component } from 'react';
import Login from './login';
import auth from '../../services/authService';
import { Redirect } from 'react-router-dom';
import ForgotPassword from './forgotPassword';

class Auth extends Component 
{
    state = {
        currentTab: 'login'
    }
    
    componentDidMount() {
        document.getElementsByClassName('language-box')[0].style.display='none'
    }

    toggleCurrentTab = (tab) => {
        this.setState({
            currentTab: tab
        });
    }

    render() { 
        if (auth.getCurrentUser()) return <Redirect to='/' />
        const { currentTab } = this.state;
        return ( 
            <React.Fragment>
                <div className={`auth`} >
                    <div className={`forgot-auth ${currentTab === 'forgot' ? "active" : ""}`}>
                        <ForgotPassword toggleCurrentTab={this.toggleCurrentTab} />
                    </div>
                    <div className={`login-auth ${currentTab === 'login' ? "active" : ""}${currentTab === 'forgot' ? 'forgot-active' : ''}`}>
                        <Login toggleCurrentTab={this.toggleCurrentTab} />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Auth;