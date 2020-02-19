import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import profileService from '../../services/profileService';
import authService from '../../services/authService'

class UserProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isActive: false,
            isToggleOn: false,
            isFilterOn: false,
            isToggleList: 'grid'
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    getData = () => {
        let { users } = this.state;

        profileService.getUsers().then(({ data }) => {
            let allUsers = users;
            data.forEach(user => {
                allUsers.push({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
            })

            if (this._isMounted) {
                this.setState({
                    users: allUsers
                })
            }
        })
    }


    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    toggleList = (toggle) => {
        this.setState({
            isToggleList: toggle
        });
    };

    toggleFilter = () => {
        this.setState({
            isFilterOn: !this.state.isFilterOn
        });
    };

    render() {
        const user = authService.getCurrentUser();
        const { isToggleOn, users } = this.state;
        return (
            <React.Fragment>
                <NavBar />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                />
                <div className={`parent ${isToggleOn ? '' : 'active'}`}>
                    <div className={`main-information`}>
                        <div className={`left-part`}>
                            <span>{user.id}</span>
                            <span>{user.username}</span>
                            <span>{user.email}</span>

                        </div>

                        <div className={`right-part`}>
                            {users.map(user =>
                                <div key={user.id} className="melos">
                                    <div className={`user-boxes-inside`}>
                                        <span>{user.id}</span>
                                    </div>
                                    <div className={`user-boxes-inside`}>
                                        <span>{user.username}</span>
                                    </div>
                                    <div className={`user-boxes-inside`}>
                                        <span>{user.email}</span>
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

export default UserProfile;