import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import CurrentUserProfileInfo from './currentUserProfileInfo';

class CurrentUserProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isActive: false,
            isToggleOn: true,
            isFilterOn: false,
            isToggleList: 'grid',
            isToggleOnMobile: true,
            value: '',
            toggleUser: 'profile',
            favorites: [],
        };

        this.state.data = this.props.users;
    }

    componentDidMount() {
        this._isMounted = true;
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

    toggleUserProfile = (toggleUser) => {
        this.setState({
            toggleUser: toggleUser
        })
    }

    render() {
        const { isToggleOn, isToggleOnMobile } = this.state;

        return (
            <React.Fragment>
                <NavBar />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                />
                <div className={`parent ${isToggleOn ? '' : 'active'}`}>
                    <div className={`profile my-profile`}>
                        <CurrentUserProfileInfo />
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default CurrentUserProfile;