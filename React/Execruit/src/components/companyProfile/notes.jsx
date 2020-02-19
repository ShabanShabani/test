import React from "react";
import Form from "../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../all/toast";
import { setHasChanges } from '../../globalVariables';
import noteService from "../../services/noteService";


class Notes extends Form {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                userId: this.props.userId,
                section: this.props.section,
                notes: '',
            },
            errors: {},
            loading: false,
            maxCounter: 400
        };
    }

    schema = {
        userId: Joi.number().integer().allow("").optional(),
        section: Joi.string().allow("").optional(),
        notes: Joi.string().allow("").optional()
    };

    componentWillReceiveProps(nextProps) {
        const { data } = this.state;

        data.notes = nextProps.getNotes.notes;
        data.userId = nextProps.userId;
        data.section = nextProps.section;
        this.setState({
            data
        })
    }

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
            setHasChanges(true);
        }
        else {
            setHasChanges(false);
        }
    }

    submitForm = () => {
        this.setState({
            loading: true
        });

        const { notes, section } = this.state.data;
        noteService.putNote(this.props.userId, notes, section).then(({ response }) => {
            this.setState({
                loading: false
            });
            if (notes === '')
                toast.success("Successfully deleted comment.");
            else
                toast.success("Successfully added comment.");
        })
            .catch(err => {
                if (err.response.status === 400)
                    toast.error("Blank comments are not allowed");
                else
                    toast.error("Something went wrong. Please try again");
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        const { errors, loading, data, maxCounter } = this.state;
        const { notes } = data;
        let counter = maxCounter - notes.length;
        return (
            <React.Fragment>
                <div className={`edit-info`}>
                    <div >
                        <span>Notes/Comments</span>
                    </div>
                    <div >
                        <form onSubmit={this.handleSubmit}>
                            {this.renderTextArea(maxCounter, "notes", `Leave your comment about this section. Tip: Use keywords which are easier to search in the future. (${counter} characters left):`, "notes", notes, this.handleChange, errors.notes, false, false, 7, 10)}
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

export default Notes;
