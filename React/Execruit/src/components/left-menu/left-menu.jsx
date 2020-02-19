import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            isToggleOnMobile: false,
            isActive: '',
            data: {
                id: '',
                role: ''
            }
        }
    }

    toggleList = (isActive) => {
        this.setState({
            isActive: isActive
        })
    };

    componentDidMount() {
        const user = authService.getCurrentUser();
        if(user)
        {
            this.setState({
                data: {
                    role: user.role
                }
            })
        }
    }

    render() {
        const { isActive, data } = this.state;
        const { toggleLeftMenu, toggleLeftMenuMobile, isToggleOnMobile, isToggleOn } = this.props;
        const { role } = data;
        return (
            <React.Fragment>
                <div className={`left-menu ${isToggleOn ? '' : 'active'} || ${isToggleOnMobile ? '' : 'activeMobile'}`}>
                    <div className="left-menu-buttons">
                        {role !== "user" &&
                            <Link onClick={this.toggleList} to="/home" className={`${isActive === 'home' ? 'active' : ''}`}>
                                <img src="../img/home1.png" alt="" />
                                <span>Home</span>
                            </Link>
                        }
                        <Link onClick={this.toggleList} to="/jobs" className={`${isActive === 'jobs' ? 'active' : ''}`}>
                            <img src="../img/job.png" alt="" />
                            <span>Jobs</span>
                        </Link>
                        {role === 'user' &&
                            <Link onClick={this.toggleList} to={`/profile`} className={`${isActive === 'profile' ? 'active' : ''}`}>
                                <img src="../img/man-user.png" alt="" />
                                <span>Profile</span>
                            </Link>
                        }
                        {role !== 'user' &&
                            <Link onClick={this.toggleList} to="/all-users" className={`${isActive === 'users' ? 'active' : ''}`}>
                                <img src="../img/group.png" alt="" />
                               <span>Users</span>
                            </Link>
                        }
                        {role === 'company' &&
                            <Link onClick={this.toggleList} to="/company" className={`${isActive === 'users' ? 'active' : ''}`}>
                                <img src="../img/visit.png" alt="" />
                                <span>Company</span>
                            </Link>
                        }
                        {role !== 'company' &&
                            <Link onClick={this.toggleList} to="/all-company" className={`${isActive === 'users' ? 'active' : ''}`}>
                                <img src="../img/visit.png" alt="" />
                                <span>Companies</span>
                            </Link>
                        }
                    </div>
                </div>
                <span className={`toggleLeftMenu ${isToggleOn ? '' : 'active'}`} onClick={() => toggleLeftMenu(true)}>
                    <img src="../img/arrow-point-to-right.svg" alt="" />
                </span>
                <span className={`toggleLeftMenuMobile ${isToggleOnMobile ? '' : 'active'}`} onClick={() => toggleLeftMenuMobile(true)}>
                    <div className={`burger-line`}></div>
                    <div className={`burger-line`}></div>
                    <div className={`burger-line`}></div>
                </span>
            </React.Fragment>
        )
    }
}

export default LeftMenu;
