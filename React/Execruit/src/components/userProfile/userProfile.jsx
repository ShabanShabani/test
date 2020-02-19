import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import NavProfile from './navProfile';
import UserProfileInfo from './userProfileInfo';

class UserProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        const { params } = props.match;
        if (!params.username) props.history.push('/user-profile');

        this.state = {
            users: [],
            isActive: false,
            isToggleOn: true,
            isFilterOn: false,
            isToggleList: 'grid',
            isToggleOnMobile: true,
            value: ''
        };
        this.state.data = this.props.users;
    }



    componentWillUnmount() {
        this._isMounted = false;
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

    toggleLeftMenuMobile = () => {
        this.setState({
            isToggleOnMobile: !this.state.isToggleOnMobile
        });
    };

    render() {
        const { isToggleOn, isToggleOnMobile } = this.state;
        const { role } = this.props;


        return (
            <React.Fragment>
                <NavBar />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                    role={role}
                />
                <div className={`parent ${isToggleOn ? '' : 'active'}`}>
                    <NavProfile />
                    <UserProfileInfo id={this.props.match.params.username} />
                </div>
            </React.Fragment>
        );
    }
}

export default UserProfile;