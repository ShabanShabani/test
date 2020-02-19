import React from 'react';
import Form from '../../../all/common/form'
import TextEditor from '../../companyProfile/editor';
import * as toast from '../../../all/toast';
import Joi from 'joi-browser';
import createPostService from "../../../services/createPostService"

class CreatePost extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                company_id: this.props.company_id,
                title: '',
                description: '',
                image: '',
                end_date: ''
            },
            errors: {},
            loading: '',
        }
    }

    schema = {
        id: Joi.number().integer().allow('').optional(),
        company_id: Joi.number().integer().allow('').optional(),
        title: Joi.string().required().label('Company Name'),
        image: Joi.string().allow().optional(),
        description: Joi.string().allow().optional(),
        end_date: Joi.date().required().label('End Date'),
        post_date: Joi.date().allow("").optional(),
        profile_picture: Joi.string().allow().optional()
    }

    componentWillReceiveProps(newProps) {
        let { data } = this.state;
        data.company_id = newProps.company_id
        data.id = newProps.post_id;
        this.setState({
            data
        })
        const { post_id } = newProps;
        if (post_id) {
            createPostService.getClickedPost(post_id).then(({ data: response }) => {
                this.setState({
                    data: {
                        id: response.id,
                        company_id: response.company_id,
                        title: response.title,
                        description: response.description,
                        image: response.image,
                        end_date: response.end_date
                    }
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
    }

    getData = (val) => {
        let { data } = this.state;
        data.description = val
        this.setState({
            data
        })
    }

    submitForm = () => {
        const { id, company_id, title, description, image, end_date } = this.state.data;
        if (id) {
            createPostService.createPostPut(id, title, description, image, end_date).then(({ data }) => {
                this.setState({
                    loading: false
                })
                toast.success("Posti u editua me sukses!");
            }).catch(err => {
                toast.error("Posti nuk u editua. Ju lutem provoni perseri.");
                this.setState({
                    loading: false
                })
            })
        } else {
            createPostService.createPostPost(company_id, title, description, image, end_date).then(({ data }) => {
                this.setState({
                    loading: false
                })
                toast.success("Posti u krijua me sukses!");
            }).catch(err => {
                toast.error("Posti nuk u krijua. Ju lutem provoni perseri.");
                this.setState({
                    loading: false
                })
            })
        }
    }

    onChangeEndDate = date => {
        const { data } = this.state;
        data.end_date = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({ data })
    }

    autoUpload = ({ currentTarget: input }) => {
        if (input.value[0].type.split('/').includes('image')) {
            this.state.request = false
            const { data } = this.state;
            createPostService.autoUpload(input.value[0]).then(({ data: response }) => {
                data.image = response.image;
                this.setState({
                    data
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
        else {
            toast.error('Invalid file');
        }
    }

    onReset = () => {
        const { data } = this.state;
        data.image = '';
        this.setState({
            data
        })
    }

    render() {
        const { data, errors, loading } = this.state;
        const { title, image, end_date, description } = data;
        return (
            <React.Fragment>
                <div className={`add-post-part`}>
                    <p>Create new post</p>
                    <form className={`add-post`} onSubmit={this.handleSubmit}>
                        <div className={`add-post-left-part`}>
                            <div className={`add-post-left`}>
                                <div className={`upload-photo-part`}>
                                    <div className="testgrid">
                                        <div className="mytooltip">
                                            <span className="tooltiptext">Undo photo</span>
                                        </div>
                                        <img onClick={this.onReset} className="undo" src="../img/undo-button.png" alt="" />
                                    </div>
                                    <div className={`upload-photo`}>
                                        {image &&
                                            <img className="profileImg" src={`${image}`} alt="" />
                                        }
                                        {!image &&
                                            <div className={`text`}>
                                                {this.renderUploadInput("image", null, image, 'image', this.autoUpload, errors.image, true, 1, true, "If you want to update image, just upload another one up to 10MB")}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`add-post-right-part`}>
                            <div className={`add-post-top`}>
                                <div className={`post-top-input`}>
                                    {this.renderDatePicker2(false, "end_date", "end_date:", 'end_date', end_date, this.onChangeEndDate, errors.end_date, false, null, false, "End Date")}
                                    {this.renderInput("title", null, 'title', title, this.handleChange, errors.title, false, "Title")}
                                </div>
                            </div>
                            <div className={`add-post-right`}>
                                <TextEditor
                                    sendData={this.getData}
                                    description={description}
                                />
                            </div>
                            <div className={`add-post-buttons`}>
                                {/* <div className="tooltip-part-btn">
                                    <button><img src="../img/globe.svg" alt="" /></button>
                                    <div className="tooltiptext">
                                        <span>Public</span>
                                        <p> Private</p>
                                    </div>
                                </div>
                                <button>Delete</button> */}
                                {/* <button type="submit" disabled={disable}>Save</button> */}
                                {this.renderSubmitButton("Save", loading)}
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default CreatePost;