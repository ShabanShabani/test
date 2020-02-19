import React from "react";
import Form from "../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../all/toast";
import companyService from "../../services/companyService";
import { Dropdown } from 'semantic-ui-react'
import socials from '../../json/socialPlatforms.json'

class SocialLinksForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                user_id: this.props.id,
                social_web: "",
                social_link: "",
                social_image: ""
            },
            errors: {},
            loading: false
        };
        this.state.data = this.props.data;
    }

    componentWillReceiveProps(props) {
        let { data } = this.state;
        data = props.data;
        this.setState({
            data
        });
    }

    schema = {
        user_id: Joi.number().integer().allow("").optional(),
        id: Joi.number().integer().allow("").optional(),
        social_web: Joi.string().required(),
        social_link: Joi.string().required(),
        social_image: Joi.string().allow("").optional(),
    };

    submitForm = () => {
        const { data } = this.state;
        this.setState({
            loading: true
        });
        const { id, social_web, social_link, social_image } = this.state.data;
        if (id) {
            companyService.putSocialLink(id, social_web, social_link, social_image).then(({ response }) => {
                this.setState({
                    loading: false,
                });
                toast.success("Successfully edited User.");
            })
                .catch(err => {
                    this.setState({
                        loading: false
                    });
                    toast.error("Something went wrong. Please try again");
                });
        } else {
            companyService.postSocialLink(social_web, social_link, social_image).then(({ data: response }) => {
                data.id = response.socialId;
                this.setState({
                    loading: false,
                    data
                });
                toast.success("Successfully edited User.");
            })
                .catch(err => {
                    this.setState({
                        loading: false
                    });
                    toast.error("Something went wrong. Please try again");
                });
        }
    };
    onDeleteClick(id, index) {
        const { data } = this.state;
        companyService.deleteSocialLink(id).then(() => {
            data.id = "";
            this.setState({
                data
            });
            this.props.onDelete(index);
        }).catch(() => {
            toast.error("Something went wrong. Please refresh the page.");
        });
    }

    handleChangePlatform = (e, { value }) => {
        const { data } = this.state;
        let social = null;
        socials.socialPlatforms.forEach(element => {
            if (element.value === value) {
                social = element;
            }
        });
        data.social_web = value;
        data.social_image = social.image;
        this.setState({
            data
        });
    };

    render() {
        const { data, errors, loading } = this.state;
        const { id, social_web, social_link } = data;
        const { index, canAdd, addMore } = this.props;
        return (
            <div className="form-head">
                <form key={index} onSubmit={this.handleSubmit}>
                    <div className={`input-form input-control`}>
                        <Dropdown
                            placeholder='Select Social Platform'
                            onChange={this.handleChangePlatform}
                            fluid
                            search
                            selection
                            value={social_web}
                            defaultOpen={false}
                            options={socials.socialPlatforms}
                        />
                    </div>
                    {this.renderInput("social_link", null, "social_link", social_link, this.handleChange, errors.social_link, false, "(without 'https://') www.example.com")}
                    <div className="form-buttons">
                        {this.renderSubmitButton("Save", loading, "")}
                        {canAdd && id &&
                            <button type="button" onClick={addMore}> Add More</button>
                        }
                        {id &&
                            <button type="button" onClick={this.onDeleteClick.bind(this, id, index)} >Delete </button>
                        }
                    </div>
                </form>
                {!canAdd && id &&
                    <div className="bottom-line"></div>
                }
            </div>
        );
    }
}

export default SocialLinksForm;
