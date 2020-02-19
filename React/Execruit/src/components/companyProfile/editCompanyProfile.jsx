import React from 'react';
import Form from '../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../all/toast'
import companyService from '../../services/companyService';
import SocialLinkForm from './socialLinkForm';

class EditCompanyProfile extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                nui: '',
                phone_number: '',
                name: '',
                industry: '',
                country: '',
                city: '',
                address: '',
                postal_code: '',
                profile_picture: '',
                summary: '',
            },
            errors: {},
            loading: false,
            logo_pic: [],
            histories: [],
            maxCounter: 1000
        };
    }

    schema = {
        id: Joi.number().integer().allow('').optional(),
        nui: Joi.number().allow('').optional(),
        phone_number: Joi.number().allow('').optional(),
        email: Joi.string().allow('').optional(),
        name: Joi.string().allow('').optional(),
        industry: Joi.string().allow('').optional(),
        country: Joi.string().allow('').optional(),
        city: Joi.string().allow('').optional(),
        address: Joi.string().allow('').optional(),
        profile_picture: Joi.string().allow('').optional(),
        postal_code: Joi.number().allow('').optional(),
        summary: Joi.string().allow('').optional(),
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data:
            {
                id: newProps.data.id,
                nui: newProps.data.nui,
                phone_number: newProps.data.phone_number,
                name: newProps.data.name,
                industry: newProps.data.industry,
                country: newProps.data.country,
                city: newProps.data.city,
                address: newProps.data.address,
                postal_code: newProps.data.postal_code,
                profile_picture: newProps.data.profile_picture,
                summary: newProps.data.summary,
            }
        })
    }

    componentDidMount() {
        companyService.getSocialLink().then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            } else {
                allHostories.push({
                    id: "",
                    user_id: this.props.id,
                    social_web: "",
                    social_link: ""
                });
            }
            this.setState({
                histories: allHostories
            });
        })
            .catch(() => {
                toast.error("Something went wrong. Please refresh the page.");
            });
    }

    submitForm = () => {
        const { nui, name, phone_number, industry, location, country, city, address, postal_code, summary } = this.state.data;
        companyService.edit(nui, name, phone_number, industry, location, country, city, address, postal_code, summary).then(({ data }) => {
            this.setState({
                loading: false
            })
            toast.success("Useri u editua me sukses.");
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    addSocialLinkForm = () => {
        companyService.getSocialLink().then(({ data }) => {
            let allHostories = [];
            if (data.length > 0) {
                allHostories = [].concat(data);
            }
            allHostories.push({
                id: "",
                user_id: this.props.id,
                social_web: "",
                social_link: ""
            });
            this.setState({
                histories: allHostories
            });
        })
            .catch(() => {
                toast.error("Something went wrong. Please refresh the page.");
            });
        const { histories } = this.state;
        histories.push({
            id: "",
            user_id: this.props.id,
            social_web: "",
            social_link: ""
        });
        this.setState({
            histories
        });
    };

    onSocialLinkDelete = () => {
        let { histories } = this.state;
        companyService.getSocialLink().then(({ data }) => {
            histories = [].concat(data);
            this.setState({ histories });
            if (this.state.histories.length === 0) {
                histories.push({
                    id: "",
                    user_id: this.props.id,
                    social_web: "",
                    social_link: ""
                });
                this.setState({ histories });
            }
        });
    };

    render() {
        const { data, errors, loading, histories, maxCounter } = this.state;
        const { nui, name, phone_number, industry, country, city, address, postal_code, summary } = data;
        let counter = maxCounter - summary.length;
        return (
            <React.Fragment>
                <div className="editi">

                    <form onSubmit={this.handleSubmit} >
                        <div className="inputs">
                            {this.renderInput("nui", null, 'nui', nui, this.handleChange, errors.nui, false, "nui")}
                            {this.renderInput("name", null, 'name', name, this.handleChange, errors.name, false, "Company Name")}
                            {this.renderInput("phone_number", null, 'phone_number', phone_number, this.handleChange, errors.phone_number, false, "Phone Number")}
                            {this.renderInput("industry", null, 'industry', industry, this.handleChange, errors.industry, false, "Industry")}
                            {this.renderInput("country", null, 'country', country, this.handleChange, errors.country, false, "Country")}
                            {this.renderInput("city", null, 'city', city, this.handleChange, errors.city, false, "City")}
                            {this.renderInput("address", null, 'address', address, this.handleChange, errors.address, false, "Address")}
                            {this.renderInput("postal_code", null, 'postal_code', postal_code, this.handleChange, errors.postal_code, false, "Postal Code")}
                            {this.renderTextArea(maxCounter, "summary", `Include 2-3 sentences about your experience (${counter} characters left):`, "summary", summary, this.handleChange, errors.summary, false, false, 7, 10)}
                            <div className={`popup-button`}>
                                {this.renderSubmitButton("Edit Company", loading,)}
                            </div>
                        </div>
                    </form>
                    {histories.map((history, index) => (
                        <SocialLinkForm
                            key={index}
                            data={history}
                            index={index}
                            id={history.user_id}
                            canAdd={index + 1 === histories.length}
                            addMore={this.addSocialLinkForm}
                            onDelete={this.onSocialLinkDelete}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default EditCompanyProfile;