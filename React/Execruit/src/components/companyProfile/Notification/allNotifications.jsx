import React, { Component } from 'react';
import NavBar from '../../nav-bar/nav-bar';
import LeftMenu from '../../left-menu/left-menu';
import authService from '../../../services/authService';
import userService from '../../../services/userService';
import getSocket from '../../../all/common/socket';
import createPostService from '../../../services/createPostService';
import * as toast from './../../../all/toast';
import PopupSchedule from '../../../components/popup/schedulePopUp'
import {Link} from 'react-router-dom'

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                profile_picture: '',
                firstInitial: '',
                lastInitial: '',
                date_notified: ''
            },
            value: '',
            isToggleOn: true,
            isToggleOnMobile: true,
            toggleNotificaiton: false,
            activities: [],
            togglePopup: false,
            postId:''
        };
        this.state.data = this.props.users;
        
    }

    componentDidMount() {
        const { data} = this.state;
        const user = authService.getCurrentUser();
        userService.getCurrentUser().then(({ data: response }) => {
            this.setState({
                profile_pic: response.profile_picture,
            })
        })
        if (user.role === 'company') {
            getSocket().on("notification", (data) => {
                userService.getNotification().then(({ data: response }) => {
                    this.setState({
                        activities: [].concat(response.notifications)
                    })
                })
            });

            userService.getNotification().then(({ data: response }) => {
                this.setState({
                    activities: [].concat(response.notifications)
                })
            })
        } if (user.role === 'user') {
            getSocket().on("notification", (data) => {
                userService.getInterviewNotification().then(({ data: response }) => {
                    console.log(response)
                    this.setState({
                        activities: [].concat(response.notifications),
                        count: response.count
                    })
                })
            });
            
            userService.getInterviewNotification().then(({ data: response }) => {
                console.log(response, response.notifications)
                this.setState({
                    activities: [].concat(response.notifications),
                    count: response.count
                })
            })
        }
        // data.id = user.id;
        // data.profile_picture = user.profile_picture;
        // data.firstInitial = user.first_initial;
        // data.lastInitial = user.last_initial;
        this.setState({
            data
        })
        document.addEventListener("keydown", this.onEsc, false);
        document.body.addEventListener('click', this.onEsc, true);
    }
    ontoggleNotificaiton = () => {
        this.setState({
            toggleNotificaiton: !this.state.toggleNotificaiton
        })
    }
    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };
    toggleLeftMenuMobile = () => {
        this.setState({
            isToggleOnMobile: !this.state.isToggleOnMobile
        });
    };

    onTogglePopup = (postId) => {
        this.setState({
            togglePopup: !this.state.togglePopup,
            postId: postId
        })   
    }

    onRemovePopUp = () => {
        console.log('cancel')
        this.setState({
            togglePopup: false
        })
    }

  

    render() {
        const { isToggleOn, isToggleOnMobile, activities, togglePopup, postId } = this.state;
        const user = authService.getCurrentUser();
        
        return (
            <React.Fragment>
                <PopupSchedule 
                    togglePopup={togglePopup}
                    onRemovePopUp={this.onRemovePopUp}
                    postId={postId}
                    userId={user.id}
                />
                <NavBar />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                />
                <div className={`notification-part`}>
                    <div className={`notification-top`}>
                        <div className={`your-notification-left`}>
                            <div className={`your-notification`}>
                                <div className={`notification-bell`}>
                                    <img class="img" src="../img/alert.png" alt="" />
                                </div>
                                <span>Your Notifications</span>
                            </div>
                        </div>
                        {/* <div className={`your-notification-right`}>
                            <div className={`settings-part`}>
                                <img src="../img/settings.svg" alt="" />
                            </div>
                        </div> */}
                    </div>
                    <div className={`notification-bottom`}>
                        <div className={`notification-first-part`}>
                            {/* <div className={`check-notification checkbox`}>
                                <input type="checkbox" id="checkbox_1" />
                                <label for="checkbox_1"></label>
                            </div>
                            <div className={`delete-notification`}>
                                <img className={`notification-bin`} src="../img/delete1.png" alt="" onClick={this.ondeleteAllNotifications} />
                            </div> */}
                            <p>ALL NOTIFICATIONS</p>
                        </div>
                        <div className={`notification-second-part`}>
                            {activities.map((activity, index) =>
                                <div className={`display-notification`}>
                                    <div className={`check-notification checkbox`}>
                                        {/* <input type="checkbox" id="checkbox_2"  />
                                        <label for="checkbox_2"></label> */}
                                    </div>
                                    <div className={`notification-from`}>
                                        {activity.profile_picture &&
                                            <img src={`${activity.profile_picture}`} alt="" />
                                        }
                                        {!activity.profile_picture &&
                                            <span className="initial">{activity.first_initial}{activity.last_initial}</span>
                                        }
                                    </div>
                                    <div className={`notification-message`}>
                                        {activity.message.includes("requested") ?
                                        <React.Fragment>
                                        <Link to={`/all-applicants/${activity.post_id}`}>
                                        <span>{activity.first_name} {activity.last_name}</span><br />
                                        <span>{activity.message}</span>
                                        </Link>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                        <span>{activity.first_name} {activity.last_name}</span><br />
                                        <span>{activity.message}</span>
                                        </React.Fragment>
                                        }
                                        
                                    </div>
                                    <div className={`notification-follow`}>
                                    {activity.message.includes("requested") &&
                                        <button>
                                                <Link to={`/all-applicants/${activity.post_id}`}>View</Link>
                                        </button> 
                                    }
                                    </div>
                                    <div className={`notification-follow`}>
                                        {user.role === 'user' && !activity.message.includes("cancel") &&
                                            <button onClick={() => this.onTogglePopup(activity.post_id)}>
                                                
                                                Request reschedule
                                            </button> 
                                        }
                                    </div>
                                    <div className={`notification-follow`}>
                                        {/* {user.role === 'user' && !activity.message.includes("cancel") &&
                                            <button>Ignore</button> 
                                        } */}
                                    </div>
                                    <div className={`delete-notification`}>
                                        {/* <a href="a"><img className={`notification-bin`} src="../img/delete1.png" alt="" /></a> */}
                                    </div>
                                    <div>
                                        <p> {activity.date_notified}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Notification;