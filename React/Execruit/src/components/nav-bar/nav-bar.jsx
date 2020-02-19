import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import authService from '../../services/authService';
import userService from '../../services/userService';
import getSocket from '../../all/common/socket';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                profile_picture: '',
                firstInitial: '',
                lastInitial: '',
                date_notified:''
            },
            toggleNotificaiton: false,
            toggleClass: false,
            activities: [],
            profile_pic: [],
            count: 0
        }
        this.onEsc = this.onEsc.bind(this)
    }  
    componentDidMount() {
        const { data} = this.state;
        const user = authService.getCurrentUser();
        userService.getCurrentUser().then(({ data: response }) => {
            this.setState({
                profile_pic: response.profile_picture,
            })
        })
        if (user && user.role === 'company') {
            getSocket().on("notification", (data) => {
                userService.getNotification().then(({ data: response }) => {
                    console.log(response)
                    this.setState({
                        activities: [].concat(response.notifications),
                        count: response.count
                    })
                })
            });
            userService.getNotification().then(({ data: response }) => {
                console.log(response, response.notifications)
                this.setState({
                    activities: [].concat(response.notifications),
                    count: response.count
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
        if(user)
        {
            data.id = user.id;
            data.profile_picture = user.profile_picture;
            data.firstInitial = user.first_initial;
            data.lastInitial = user.last_initial;
            this.setState({
                data
            })
        }
        document.addEventListener("keydown", this.onEsc, false);
        document.body.addEventListener('click', this.onEsc, true);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", null, false);
        document.body.addEventListener('click', null, true);
    }

    ontoggleNotificaiton = (activities) => {
        const user = authService.getCurrentUser();
       if (user && user.role === "company") {
            userService.viewAllNotifications().then(({data: response}) => {
                this.setState({
                    toggleNotificaiton: !this.state.toggleNotificaiton,
                })
            })
        } if (user.role === 'user') {
            userService.viewAllUsersNotifications().then(({data: response}) => {
                    this.setState({
                    toggleNotificaiton: !this.state.toggleNotificaiton,
                })
            })
       } 
    }
    
    onClickNotification = () => {
        userService.postNotification().then(({ data: response }) => {
        })
    }

    onEsc = (e) => {
        if (e.keyCode === 27) {
            this.setState({
                toggleClass: false,
                toggleNotificaiton: false
            })
        }
        else if (e.type === 'click') {
            this.setState({
                toggleClass: false,
                toggleNotificaiton: false
            })
        }
    }
    toggleClassNav = () => {
        this.setState({
            toggleClass: !this.state.toggleClass,
        })
    }

    render() {
        const { data, toggleNotificaiton, activities, count } = this.state;
        const { profile_picture, firstInitial, lastInitial } = data;
        let activitiesLength = activities.length
        if (activities.length > 100) {
            activitiesLength = '99+'
        }
        const user = authService.getCurrentUser();
        return (
            <div className={`nav-bar`}>
                <div className={`header-inside`}>
                    <div className={`left-part`}>
                        <div className={'logo'}>
                            <Link to="/Home">
                                <img src="../img/new-logo.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={`nav`}>
                        <div className={`nav-wrapper`}>
                            {!user ?
                            ''
                            :
                            <React.Fragment>
                                <div className={`click`} to="">
                                    <img onClick={this.ontoggleNotificaiton} className="img" src="../img/alert.png" alt="" />
                                </div>
                                <div className={`count-notification ${activities.length > 100 ? 'active' : ''}`}>
                                    <span>{count}</span>
                                </div>
                            </React.Fragment>
                            }
                            <div className={`notification-drop ${toggleNotificaiton ? 'active' : ''}`}>
                                <div className={`triangle`}></div>
                                {activitiesLength !== 0 ?
                                    <React.Fragment>
                                        <div className="notification-show-top">
                                            {activities.map((activity, index) =>
                                                <div key={index} className="drop-notification">
                                                    <div className="notification-img-text">
                                                        <div className="drop-notification-img">
                                                            {activity.profile_picture &&
                                                                <img src={`${activity.profile_picture}`} alt="" />
                                                            }
                                                            {!activity.profile_picture &&
                                                                <span className="initial">{activity.first_initial}{activity.last_initial}</span>
                                                            }
                                                        </div>
                                                        <div className="drop-notification-text">
                                                            <span>{activity.first_name} {activity.last_name} {activity.message}</span>
                                                        </div>
                                                        <div>
                                                        {activity.message.includes("requested") &&
                                                            <button>
                                                                    <Link to={`/all-applicants/${activity.post_id}`}>View</Link>
                                                            </button> 
                                                        }
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="notification-date">
                                                        <span>{activity.date_notified}</span>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        </div>
                                        <div className="more-notification">
                                            <Link to="/notifications">
                                                See All
                                            </Link>
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className="drop-notification">
                                        <p>No Notification Found</p>
                                    </div>
                                }
                            </div>
                            {!user ?
                                ''
                                :
                                <Dropdown as={ButtonGroup}>
                                    <div className="profile">
                                        {profile_picture &&
                                            <img className="profileImg" src={`${profile_picture}`} alt="" />
                                        }
                                        {!profile_picture &&
                                            <span className={`initial`}>{firstInitial} {lastInitial}</span>
                                        }
                                        </div>
                                        <div className="button">
                                        <Dropdown.Toggle split variant="" id="dropdown-split-basic" />
                                    </div>
                                        <Dropdown.Menu>
                                            <Link to="/logout">Log out</Link>
                                        </Dropdown.Menu>
                                </Dropdown>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default NavBar;
