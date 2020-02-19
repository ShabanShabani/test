import React from 'react';
import Form from '../../all/common/form';
import authService from '../../services/authService';
import Joi from 'joi-browser';
import * as toast from '../../all/toast'

class ResetPassword extends Form {
    constructor(props) {
        super(props);
        this.state = { 
            data: {
                password: '',
                confirmPassword: '',
                token: props.match.params.token,
            },
            errors: {},
            loading: false,
         }
    }

    schema = {
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        token: Joi.string().required(),
    }

    componentWillReceiveProps() {
        const { data } = this.state;
        data.password = '';
        this.setState({
            data
        })
    }

    submitForm = () => {
        const { data }=this.state;
        this.setState({
            loading: true
        })
        authService.changePassowrd( data.password, data.token  ).then(({ data: response }) => {
            toast.success("Successfully changed password.")
            this.setState({
                loading: false
            })
            window.location = '/';
        }).catch(err => {
            this.setState({
                loading: false
            })
            toast.error("Something went wrong. Please try again123")
        })
    }


    render() {
        const { data, errors, loading } = this.state;
        const { password, confirmPassword } = data;
        
        return ( 
            <React.Fragment>
                 <div className={`auth`} >
                    <div className={`login-auth active`}>
                        <div className={`login`}>
                            <div className={`login-box`}>
                                <div className={`logo`}>
                                    <img src="../assets/img/logo.png" alt=""/>
                                </div>
                                <div className={`form`}>
                                    <form onSubmit={this.handleSubmit} action="">
                                        {this.renderInput("password", null, "password", password, this.handleChange, errors.password, false, "New Password", false, "password")}
                                        {this.renderInput("confirmPassword", null, "confirmPassword", confirmPassword, this.handleChange, errors.password, false, "Confirm New Password", false, "password")}
                                        <div className={`button-wrapper`} >
                                            {this.renderSubmitButton("Save", loading)}
                                        </div>
                                    </form>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ResetPassword;