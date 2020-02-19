import React, { Component } from 'react';

class NavMenuProfileinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { toggleUserProfileTab, toggleUserTab } = this.props;
        return (
            <React.Fragment>
                <div className={`nav-menu`}>
                    <div onClick={() => toggleUserProfileTab('profile')} className={`navmenu-button ${toggleUserTab === 'profile' ? 'active' : ''}`}>
                        <span>Profile Info</span>
                    </div>
                    <div onClick={() => toggleUserProfileTab('favorites')} className={`navmenu-button ${toggleUserTab === 'favorites' ? 'active' : ''}`}>
                        <span>Favorite Companies</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NavMenuProfileinfo;

