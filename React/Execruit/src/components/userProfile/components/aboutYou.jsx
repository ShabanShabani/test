import React from 'react';
import Form from '../../../all/common/form';
import { Dropdown } from 'semantic-ui-react'
import Joi from 'joi-browser';
import * as toast from '../../../all/toast';
import aboutYouService from '../../../services/aboutYouService';
import { setHasChanges } from '../../../globalVariables';
import privacyJson from '../../../json/privacy.json'

class MoreAboutYou extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                birthday: '',
                country: '',
                city: '',
                address: '',
                postalCode: '',
                privacy: 'public',
                checkboxToggle: false
            },
            tab: this.props.tab,
            errors: {},
            loading: false,
            hint: false,
            x: 0,
            y: 0
        }
        this.state.data = props.data;
    }

    componentWillReceiveProps(props) {
        let { data } = this.state
        data = props.data;
        if (data.birthday === "None") {
            data.birthday = '';
        }
        this.setState({
            data
        })
    }

    onChangeBirthday = date => {
        const { data } = this.state;
        data.birthday = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({ data })
    }

    onChangeCheckBox = event => {
        let { data } = this.state;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        data.end_date = '';
        data.checked = value;
        this.setState({
            data
        });
    };

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
        if(JSON.stringify(this.props.data.privacy) !== JSON.stringify(this.state.data.privacy))
        {
            setHasChanges(false);
        }
        else {
            setHasChanges(true);
        }
    }

    onChange = () => {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
    }

    schema = {
        id: Joi.number().integer().allow('').optional(),
        firstName: Joi.string().min(3).required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        phoneNumber: Joi.number().integer().required().label("Phone Number"),
        birthday: Joi.date().required().label("Date"),
        country: Joi.string().required().label("Country"),
        city: Joi.string().required().label("City"),
        address: Joi.string().allow('').optional(),
        postalCode: Joi.number().integer().allow('').optional(),
        privacy: Joi.string().required().label("privacy"),
    }

    submitForm = () => {
        this.setState({
            loading: true
        })

        const { id, firstName, lastName, email, phoneNumber, birthday, country, city, address, postalCode, privacy, checkboxToggle } = this.state.data;

        aboutYouService.aboutYouEdit(id, firstName, lastName, email, phoneNumber, birthday, country, city, address, postalCode, privacy, checkboxToggle).then(({ response }) => {
            this.setState({
                loading: false
            })
            setHasChanges(false);
            toast.success("Successfully edited User.")
        }).catch(err => {
            this.setState({
                loading: false
            })
            toast.error("Something went wrong. Please try again")
        })
    }

    handleChangePrivacy = (e, { value }) => {
        const { data } = this.state;
        privacyJson.privacy.forEach(element => {
            if (element.value === value) {
                data.privacy = element;
                setHasChanges(false)
            }
        });
        data.privacy = value;
        this.setState({
            data
        });
    };

    onMouseMove = (e) => {
        this.setState({
            hint: true,
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        })
    }

    onMouseLeave = () => {
        this.setState({
            hint: false
        })
    }

    render() {
        const { data, errors, loading, hint } = this.state;
        const { toggleCurrentTab, currentTab } = this.props;
        const { firstName, lastName, email, phoneNumber, birthday, country, city, address, postalCode, privacy, checkboxToggle } = data;
        return (
            <React.Fragment>
                <div className={`edit-info`} id='test'>
                    <div className={`edit-info-click ${currentTab === 'aboutYou' ? "active" : ''}`} onClick={() => toggleCurrentTab('aboutYou')} onChange={this.onChange} >
                        <span>Personal Details</span>
                        <img className="arrowImg" onClick={() => toggleCurrentTab('aboutYou')} src="../img/arrow.png" alt="" />
                        {/* <div className="line-edit"></div> */}
                    </div>
                    <div className={`edit-info-show ${currentTab === 'aboutYou' ? "active" : ''} `}>
                        <form onSubmit={this.handleSubmit} >
                            {this.renderInput("firstName", 'First Name', 'First Name', firstName, this.handleChange, errors.firstName, false, "First Name")}
                            {this.renderInput("lastName", 'Last Name', 'lastName', lastName, this.handleChange, errors.lastName, false, "Last Name")}
                            {this.renderInput("email", null, 'email', email, this.handleChange, errors.email, false, "Email")}
                            {this.renderInput("phoneNumber", null, 'phoneNumber', phoneNumber, this.handleChange, errors.phoneNumber, false, "Phone Number")}
                            {this.renderDatePicker(false, "birthday", "birthday:", 'birthday', birthday, this.onChangeBirthday, errors.birthday, false, this.onChangeCheckBox, false, "Birthdate")}
                            {/* {this.renderInput("birthday", "birthday:", 'birthday', birthday, this.handleChange, errors.birthday, true, "", false, "date")} */}
                            <div className={'aditional-details'}>
                                {this.renderInput("country", null, 'country', country, this.handleChange, errors.country, false, "Country")}
                                {this.renderInput("city", null, 'city', city, this.handleChange, errors.city, false, "City")}
                                {this.renderInput("address", null, 'address', address, this.handleChange, errors.address, false, "Address")}
                                {this.renderInput("postalCode", null, 'postalCode', postalCode, this.handleChange, errors.postalCode, false, "Postal Code")}
                                {/* {this.renderInput("privacy", null, 'privacy', privacy, this.handleChange, errors.privacy, false, "Privacy")} */}
                                <div className={`input-form`}>
                                    <Dropdown
                                        placeholder='Privacy'
                                        onChange={this.handleChangePrivacy}
                                        fluid
                                        search
                                        selection
                                        value={privacy}
                                        defaultOpen={false}
                                        options={privacyJson.privacy}
                                        disabled={checkboxToggle}
                                    />
                                    <img onMouseMove={this.onMouseMove.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className={`hint`} src="../img/icon.svg" alt="" />
                                    <div className={`tooltip2 ${hint ? 'active' : ''}`}>
                                        <div className={`left2`}>
                                            <React.Fragment>
                                                {privacy === 'public' ?
                                                    <p>Public - Public profile can be seen from all companies that are subscribed to Execruit.Best for proffessionals who are open to more opportunities.</p>
                                                    :
                                                    <p>Private - Private profile can be seen only by companies in which user has chosen to apply for a job posititon.Best suitable for professionals currently employed,
                                                open to career moves.</p>
                                                }
                                            </React.Fragment>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-buttons">
                                {this.renderSubmitButton("Save", loading, "")}
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MoreAboutYou;