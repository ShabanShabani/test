import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import UserProfileEdit from './userProfileEdit';
import PopUp from '../popup/popup';
import { setHasChanges, hasChanges } from '../../globalVariables';

class EditUserProfile extends Component {
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
            currentTab: 'aboutYou'
        }
        this.toggleCurrentTab = this.toggleCurrentTab.bind(this.currentTab);
        console.log(hasChanges)
    }


    onYesClick = () => {
        console.log(hasChanges)
        setHasChanges(false);
        document.getElementById('popup-id').className = 'popup'
        this.setState({
            currentTab: ''
        })
    }

    onNoClick = () => {
        
        setHasChanges(true);
        document.getElementById('popup-id').className = 'popup'
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('edit-profile');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('edit-profile');
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

    toggleCurrentTab = tab => {
        console.log(hasChanges)
        if (hasChanges) {
            if (!document.getElementById('popup-id').className.includes('active')) {
                document.getElementById('popup-id').className += ' active'
            }
        } else {
            if (this.state.currentTab === tab) {
                this.setState({
                    currentTab: ''
                });
            } else {
                this.setState({
                    currentTab: tab
                });
            }
        }
    };

    render() {
        const { isToggleOn, isToggleOnMobile, currentTab } = this.state;
        return (

            <React.Fragment>
                <NavBar />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                />
                <PopUp
                    onYesClick={this.onYesClick}
                    onNoClick={this.onNoClick}
                />
                <div className={`parent ${isToggleOn ? '' : 'active'}`}>
                    {/* <NavProfile /> */}
                    <UserProfileEdit id={this.props.match.params.id} currentTab={currentTab} toggleCurrentTab={this.toggleCurrentTab} />
                </div>
            </React.Fragment>
        );
    }
}

export default EditUserProfile;