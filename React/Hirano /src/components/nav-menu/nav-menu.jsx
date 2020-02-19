import React from 'react';
import getSocket from '../../all/common/socket';
import authService from "../../services/authService";
import userService from "../../services/userService";
import Form from '../../all/common/form';
import * as toast from '../../all/toast';
import Joi from 'joi-browser';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { getLanguage } from '../global/language'

const user = authService.getCurrentUser();

class NavMenu extends Form {
    constructor(props){
        super(props);
        this.state = {
            data: {
                profilepicture: ''
            },
            toggleNotification: false,
            activities: [],
            profile_pic: [],
            errors: {},
            toggleClass: false,
        }
        this.onEsc = this.onEsc.bind(this)
    }

    schema = {
        profile_picture: Joi.array(),
    }

    onClick = () =>
    {
        this.setState({
            toggleNotification: !this.state.toggleNotification
        })
    }

    componentDidMount(){
        userService.getCurrentUser().then(({ data: response }) => {
            this.setState({
                profile_pic : response.profile_picture,
            })
        })
        getSocket().on("activity", (data) => {
            userService.getNotification().then(({ data: response }) => {
                this.setState({
                    activities: [].concat(response)
                })
            })
        });
        userService.getNotification().then(({ data: response }) => {
            this.setState({
                activities: [].concat(response)
            })
        })
        if(user)
        {
            this.setState({
                language: user.language
            })
        }
        document.addEventListener("keydown", this.onEsc, false);
        document.body.addEventListener('click', this.onEsc, true);
    }

    componentWillUnmount()
    {
        document.addEventListener("keydown", null, false);
        document.body.addEventListener('click', null, true);
    }

    onClickNotification = () => {
        userService.postNotification().then(({ data: response }) => {
        })
    }

    activityClick = (plant_id, id) => {
        userService.postNotification(id).then(({ data: response }) => {
        })

        this.props.history.push({
            pathname: '/fill-card',
            state: {
                plant_id: plant_id
            }
        })
    }

    autoUpload = ({currentTarget: input}) => {
        if(input.value[0].type.split('/').includes('image')){
            userService.autoUpload(input.value[0]).then(({ data: response }) => {
                this.setState({
                    profile_pic : response.profile_picture
                })
            }).catch(err => {
                if (err.response && err.response.status === 400) {
                    this.props.history.push('/user-profile')
                }
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
        else{
            toast.error('Invalid file');
        }
    }

    toggleClassNav = () => {
        this.setState({
            toggleClass: !this.state.toggleClass,
        })
    }
    
    onEsc = (e) => {
        if(e.keyCode === 27)
        {
            this.setState({
                toggleClass: false,
                toggleNotification: false
            })
        }
        else if(e.type === 'click')
        {
            this.setState({
                toggleClass: false,
                toggleNotification: false
            })
        }
    }

    render() { 
        const { profile_pic, data, toggleNotification, activities, toggleClass } = this.state;
        const { profile_picture } = data;
        let activitiesLength = activities.length
        if(activities.length > 100)
        {
            activitiesLength = '99+'
        }
        return ( 
            <React.Fragment>
                <div className={`notification-drop ${toggleNotification ? 'active' : ''}`}  >
                    { 
                        activities.map((activity,index) =>
                            <div key={index} className={`news`} onClick={this.activityClick.bind(this, activity.plant_id, activity.id)} >
                                <div className={`left-part-inside`} >
                                    <div className={`profile-img`}>
                                        {profile_pic &&
                                            <img className="profileImg" src={`${profile_pic}`} alt=""/>
                                        }
                                        {!profile_pic &&
                                            <span className="initial">{authService.getInitials()}</span>
                                        }
                                    </div>
                                    <div className={`line`}>
                                        <div className={`line-wrapper`}></div>
                                    </div>
                                </div>
                                <div className={`right-part-inside`} >
                                    <span className="username">{activity.message_al}</span>
                                </div>
                            </div>
                        )
                    }
                    <div className={`triangle`}></div>
                </div>
                <div className={`nav-menu`}>
                    <div className={`nav-menu-inside`}>
                        <div className={`notification`}>
                            <img onClick={this.onClick} src="./assets/img/notification.png" alt=""/>
                            <div className={`count-notification ${activities.length > 100 ? 'active' : ''}`}>
                                <span>{activitiesLength}</span>
                            </div>
                        </div>
                        <div onClick={this.toggleClassNav} className={`profile-img`}>
                            {profile_pic &&
                                <img className="profileImg" src={`${profile_pic}`} alt=""/>
                            }
                            {!profile_pic &&
                                <span className="initial">{authService.getInitials()}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className={`nav-dropdown ${toggleClass ? 'active':''}`}>
                    <div className={`dropdown-inside`}>
                        <span>{getLanguage().ch_profilepic}
                            <form>
                                {this.renderUploadInput("profile_picture", profile_picture, 'image', this.autoUpload, this.state.errors, 1)}
                            </form>
                        </span>
                        <Link to="/logout">
                            <img src="./assets/img/9.png" alt="" />
                            {getLanguage().logout}
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(NavMenu);