import React from "react";
import Form from "../../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../../all/toast";
import referencesService from "../../../../services/referencesService";
import { setHasChanges } from '../../../../globalVariables';

class ReferencesForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                user_id: this.props.id,
                full_name: "",
                organisation: "",
                phone: "",
                email: "",
                file: ""
            },
            errors: {},
            loading: false
        };
    }

    componentWillReceiveProps(props) {
        let { data } = this.state;
        data = props.data;
        this.setState({
            data
        });
    }

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
    }

    schema = {
        user_id: Joi.number().integer().allow("").optional(),
        id: Joi.number().integer().allow("").optional(),
        full_name: Joi.string().required().label("Full Name"),
        organisation: Joi.string().required().label("Organisation"),
        email: Joi.string().required().label("Referents Email"),
        index: Joi.number().integer().allow("").optional(),
        phone: Joi.number().integer().required().label("Phone Number"),
        file: Joi.any()
    };

    submitForm = () => {
        const { data } = this.state;
        this.setState({
            loading: true
        });
        const { id, user_id, full_name, organisation, phone, email, file } = this.state.data;
        if (id) {
            referencesService.references_history(id, user_id, full_name, organisation, phone, email, file).then(({ response }) => {
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
            referencesService.references_history2(user_id, full_name, organisation, phone, email, file).then(({ data: response }) => {
                data.id = response.referenceId;
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
        referencesService.references_history_delete(id).then(() => {
            data.id = "";
            this.setState({
                data
            });
            this.props.onDelete(index);
        }).catch(() => {
            toast.error("Something went wrong. Please refresh the page.");
        });
    }

    onchange(selectorFiles) {
        const { data } = this.state
        let newArr = selectorFiles[0];
        console.log(newArr)
        data.file = newArr;
        this.setState({
            data
        })
    }

    render() {
        const { data, errors, loading } = this.state;
        const { id, full_name, organisation, phone, email, file } = data;
        const { index, canAdd, addMore } = this.props;
        let filename = ""
        if(file){
            console.log(file)
            if (file instanceof File){
                filename = file.filename
            }else if(file){
                filename=file.split('/')[file.split('/').length-1]
            }
        }
        
        return (
            <div className="form-head">
                <form key={index} onSubmit={this.handleSubmit}>
                    {this.renderInput("full_name", null, "full_name", full_name, this.handleChange, errors.full_name, false, "Referents Full Name")}
                    {this.renderInput("organisation", null, "organisation", organisation, this.handleChange, errors.organisation, false, "Organisation")}
                    {this.renderInput("phone", null, "phone", phone, this.handleChange, errors.phone, false, "Phone Number")}
                    {this.renderInput("email", null, "email", email, this.handleChange, errors.email, true, "Referents Email")}
                    {filename  &&
                        <span>{filename}</span>
                    }
                    {/* {this.renderUploadInput("files", null, files, 'image', this.handleChange, errors.files, true, 1, true, "If you want to update files, just upload another one up to 10MB")} */}
                    <input type="file" name="file" onChange={(e) => this.onchange(e.target.files)} />
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

export default ReferencesForm;
