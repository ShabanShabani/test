import React from 'react';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import authService from '../../services/authService'

class ConfirmEmail extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                token: props.match.params.token
            }
        }
    }


    schema = {
        token: Joi.string().required()
    }

    componentDidMount() {
        const { token } = this.state.data
        authService.confirmEmailLogin(token).then((data) => {
            if (data.success) {
                window.location = '/edit-user-profile';
            }
        });
    }

    render() {
        return (
            <div className="login">
                Confirm Email
            </div>
        )
    }
}

export default ConfirmEmail;