import React, { Component } from 'react';
import auth from "../../services/authService";


class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.posts
        })
    }

    render() {
        // const {  } = this.state;
        const user = auth.getCurrentUser()
        const { myPost, onEditPost, element, index, onApplyNow, onCancel, viewPost, addClass, onViewPost } = this.props;
        let initials = '';
        if (element.company_name) {
            initials = element.company_name.split('', 2);
        }

        return (
            <React.Fragment>
                <div key={index} className={`${addClass(myPost, viewPost)} grid-3 grid-2 grid-1 job-box`}>
                    <div className={`box-inside`}>
                        <div className={`company-logo`}>
                            <img src={element.image} alt="" />
                        </div>
                        {/* <div className={`add-to-favorites`}>
                            <img className={`add-to-favorites-btn`} src="../img/star-noncolor.png" alt="" />
                        </div> */}
                        {myPost === 'mypost' &&
                            <React.Fragment>
                                <div className={`click-bullet-menu`} onClick={onEditPost.bind(this, 'create-post', element.id)} >
                                    <div className="test">
                                        <div className="mytooltip">
                                            <span className="tooltiptext">Edit post</span>
                                        </div>
                                        <img className="bullet-menu-pic" src="../img/pen.png" alt="" />
                                    </div>
                                </div>

                            </React.Fragment>
                        }
                        <div className={'job-logo'}>
                            {element.profile_picture &&
                                <img className={`job-logo-pic`} src={element.profile_picture} alt="" />
                            }
                            {!element.profile_picture &&
                                <span className="initial">{initials}</span>
                            }
                        </div>
                        <div className={`box-content`}>
                            <span className={`title`}>{element.title}</span>
                            <span className={`company-content`}>{element.company_name}</span>
                            <span className={`company-content`}>{element.end_date}</span>
                            <span className={`company-content`}>{element.city}</span>
                        </div>
                        <div className={`buttons`}>
                            <React.Fragment>
                                {user && user.role !== "user" ?
                                    <button className={"onlyadmin"} onClick={onViewPost.bind(this, element.id)}>View Post</button>
                                    :
                                    <React.Fragment>
                                        <button onClick={onViewPost.bind(this, element.id)}>View Post</button>
                                        {!user ?
                                        ''
                                        :
                                        <React.Fragment>
                                            {element.applied ?
                                            <button onClick={onCancel.bind(this, element.id,index)}>Cancel Application!</button>
                                            :
                                            <button onClick={onApplyNow.bind(this, element.id, index)}>Apply Now</button>
                                            }
                                        </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MapBox;