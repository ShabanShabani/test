import React from "react";
import Form from "../../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../../all/toast";
import socialLinksService from "../../../../services/socialLinksService";
import { Dropdown } from 'semantic-ui-react'
import socials from '../../../../json/socialPlatforms.json'
import { setHasChanges } from '../../../../globalVariables';


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

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
        if(JSON.stringify(this.props.data.social_web) !== JSON.stringify(this.state.data.social_web))
        {
            setHasChanges(false);
        }
        else {
            setHasChanges(true);
        }
    }

    componentWillReceiveProps(props) {
        let { data } = this.state;
        data = props.data;
        data.social_link = props.data.social_link
        data.social_web = props.data.social_web
        this.setState({
            data
        });
        // if(setHasChanges())
        // {
        //     data.social_link = ''
        //     data.social_web = ''
        //     this.setState({
        //         data
        //     })
        // }else{
        //     data.social_link = props.data.social_link
        //     data.social_web = props.data.social_web
        //     this.setState({
        //         data
        //     })
        // }
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
        const { id, user_id, social_web, social_link, social_image } = this.state.data;
        if (id) {
            socialLinksService.putSocialLink(id, user_id, social_web, social_link, social_image).then(({ response }) => {
                this.setState({
                    loading: false,
                });
                setHasChanges(false);
                toast.success("Successfully edited User.");
            })
                .catch(err => {
                    this.setState({
                        loading: false
                    });
                    toast.error("Something went wrong. Please try again");
                });
        } else {
            socialLinksService.postSocialLink(user_id, social_web, social_link, social_image).then(({ data: response }) => {
                data.id = response.socialId;
                this.setState({
                    loading: false,
                    data
                });
                setHasChanges(false);
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
        socialLinksService.deleteSocialLink(id).then(() => {
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
