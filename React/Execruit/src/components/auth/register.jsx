import React from 'react';
import Form from '../../all/common/form';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';
import UserRegister from './userRegister';
import CompanyRegister from './companyRegister';
import roleJson from '../../json/role.json';

class Register extends Form {
    state = {
        data: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            role: 'user',
            password: '',
            confirmPassword: '',
            checkboxToggle: false
        },
        isToggleList: 'user',
        errors: {},
        loading: false
    }

    dropdDownChange = (e) => {
        const { data } = this.state;
        data.role = e.target.value;
        this.setState({
            data
        });
    }

    toggleList = (toggle) => {
        this.setState({
            isToggleList: toggle
        });
    };
    handleChangeRole = (e, { value }) => {
        const { data } = this.state;
        roleJson.role.forEach(element => {
            if (element.value === value) {
                data.role = element;
            }
        });
        data.role = value;
        this.setState({
            data
        });
    };
    render() {
        if (getCurrentUser()) this.props.history.push('/')

        const { data } = this.state;
        const { toggleCurrentTab } = this.props;
        const { role } = data;
        return (
            <React.Fragment>
                <div className={`register-parent`}>
                    <div className={`register-first`}>
                        <div className="register">
                            <div className={'logo'}>
                                <img src="../img/new-logo.png" alt="" />
                            </div>
                            <div className="formlabel">
                                <span>Sign Up
                                    <div className="div-helper"></div>
                                </span>
                            </div>
                            <div className="input-field input-form input-control role-select">
                                <select name="role" id="role" value={role} onChange={this.dropdDownChange}>
                                    <option className={`option-role`} value="user">User</option>
                                    <option className={`option-role`} value="Company">Company</option>
                                </select>
                            </div>
                            {/* <div className={`input-form`}>
                                <Dropdown
                                    placeholder='Role'
                                    onChange={this.handleChangeRole}
                                    fluid
                                    search
                                    selection
                                    value={role}
                                    defaultOpen={false}
                                    options={privacyJson.privacy}
                                    disabled={checkboxToggle}
                                />
                            </div> */}
                            {role === 'user' ?
                                <UserRegister />
                                :
                                <CompanyRegister />
                            }
                            <div className="bottom-part">
                                <span>Already have an account? <Link onClick={() => toggleCurrentTab('login')} >Login Here</Link></span>
                            </div>
                        </div>
                    </div>
                    <div className={`register-second`}>
                        <div className="overlay"></div>
                        <img src="../img/office1.jpeg" alt="" />
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Register;
