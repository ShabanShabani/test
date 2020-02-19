import React, { Component } from 'react';
import * as toast from '../../../all/toast';
import authService from '../../../services/authService';
import { LinkedIn } from 'react-linkedin-login-oauth2';

class LinkedInPage extends Component {
    state = {
        code: '',
        errorMessage: '',
    };


    //   handleSuccess = (data) => {
    //     this.setState({
    //       code: data.code,
    //       errorMessage: '',
    //     });
    //   }

    //   handleFailure = (error) => {
    //     this.setState({
    //       code: '',
    //       errorMessage: error.errorMessage,
    //     });
    //   }

    handleSuccess = response => {
        let data = {
            id: response.userID,
            email: response.email,
            firstName: response.first_name,
            lastName: response.last_name,
        }

        authService.loginExternal(data).then((response) => {
            if (response.error) {
                toast.error(response.error);
                this.setState({
                    loading: false
                });
            }
            else {
                window.location = '/';
                this.setState({
                    loading: false
                });
            }
        })
    }

    handleFailure = (error) => {
        toast.error("Diqka shkoi gabim. Ju lutemi që të rifreskoni faqen dhe të provoni përsëri.")
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div>
                <LinkedIn
                    clientId="81lx5we2omq9xh"
                    onFailure={this.handleFailure}
                    onSuccess={this.handleSuccess}
                    redirectUri="http://localhost:3001/linkedin"
                >
                    <img src={require('../../../assets/img/gmail.png')} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
                </LinkedIn>
            </div>
        );
    }
}

export default LinkedInPage;