import React from 'react';
import createPostService from '../../services/createPostService';
import * as toast from '../../all/toast';
import getSocket from '../../all/common/socket';
import Form  from "./../../all/common/form";
import Joi from "joi-browser";

class PopupSchedule extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                interviewMessage: '',
            },
            test: false,
            errors: {},
            loading: false,
            maxCounter: 400,
            activities: [],
            togglePopup:false
        }

    }

    schema = {
        interviewMessage:Joi.string().required()
    }

  

    submitForm = () => {
        const { postId, userId } = this.props
        const { interviewMessage } = this.state.data
        // this.setState({
        //     loading: true
        // });
        console.log(interviewMessage)
        console.log(postId)
        console.log(userId)
        createPostService.requestReschedule(interviewMessage, postId, userId).then(({ data: response }) => {
            toast.success("Successfully sent request.");
        }).catch(err => {
            toast.error('Something went wrong.')
        })
        getSocket().emit('notification');
    };

    render() {
        const { errors, loading, data, maxCounter } = this.state;
        const { interviewMessage } = data;
        const { togglePopup, onRemovePopUp } = this.props;
        let counter = maxCounter - interviewMessage.length;
        return (
            <React.Fragment>
                <div id={'popup-id'} className={`popup ${togglePopup ? 'active' : ''}`}>
                    <div className={`popup-inside`}>
                        <form onSubmit={this.handleSubmit} >
                            {this.renderTextArea(maxCounter, "interviewMessage", `This text its going to be included in email asking to reschedule interview. (${counter} characters left):`, "", interviewMessage, this.handleChange, errors.interviewMessage, false, false, 7, 10)}
                            <div className="form-buttons" >
                                {this.renderSubmitButton("Send", loading, "") }
                            </div>
                        </form>
                        <button onClick={onRemovePopUp}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PopupSchedule;