import React from 'react';
import Form from '../../all/common/form';
import auth from '../../services/authService';
import { Redirect } from 'react-router-dom';
import Login from './login'
import Register from './register'
import ForgotPassword from './forgotpassword';

class Auth extends Form {
    state = {
        currentTab: 'login'
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
                <div className="auth">
                    <div className={`forgotAuth ${currentTab === 'forgot' ? "active" : ""}`}>
                        <ForgotPassword toggleCurrentTab={this.toggleCurrentTab} />
                    </div>
                    <div className={`loginAuth ${currentTab === 'login' ? "active" : ""}${currentTab === 'forgot' ? 'forgotActive' : ''}`}>
                        <Login toggleCurrentTab={this.toggleCurrentTab} />
                    </div>
                    {/* <div className={`resetAuth ${currentTab === 'reset' ? "active" : ""}${currentTab === 'reset' ? 'resetActive' : ''}`}>
                        <Login toggleCurrentTab={this.toggleCurrentTab} />
                    </div> */}
                    <div className={`registerAuth ${currentTab === 'register' ? "active" : ""}`}>
                        <Register toggleCurrentTab={this.toggleCurrentTab} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Auth;