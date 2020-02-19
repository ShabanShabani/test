import React, { Component } from 'react';
import * as toast from "../../../all/toast"
import createPostService from "../../../services/createPostService";
import createPost from "./create-post"

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            user_id: this.props.id,
            logoPhoto: '',
            photo: '',
            name: '',
            description: ''
        }
    }
    render() {
        const { toggleCurrentTab, currentTab } = this.props;
        const { histories } = this.state;
        return (
            <React.Fragment>
                <div className={`add-post-part`}>
                    <p>Create new post</p>
                    <div className={`add-post`}>
                        <div className={`add-post-left-part`}>
                            <div className={`add-post-left`}>
                                <div className={`upload-logo-part`}>
                                    <div className={`upload-logo`}><div className={`text`}><form action="" className={`create-post-form`}><input type="file" /></form></div></div>
                                </div>
                                <div className={`upload-photo-part`}>
                                    <div className={`upload-photo`}><div className={`text`}><form action="" className={`create-post-form`}><input type="file" /></form></div></div>
                                </div>
                            </div>
                            <div className={`input`}>
                                <input placeholder="Name" type="text" />
                            </div>
                        </div>
                        <div className={`add-post-right-part`}>
                            <div className={`add-post-right`}>
                                <textarea name="" id="" cols="30" rows="10" placeholder="Description"></textarea>
                            </div>
                            <div className={`add-post-buttons`}>
                                <div className="tooltip-part-btn">
                                    <button><img src="../img/globe.svg" alt="" /></button>
                                    <div className="tooltiptext"><span>Public</span><p> Private</p></div>
                                </div>
                                <button>Delete</button>
                                <button>save

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Create;