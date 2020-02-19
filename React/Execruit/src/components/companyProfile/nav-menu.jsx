import React, { Component } from 'react';

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        }
    }

    render() {
        const { toggleCompanyProfile, toggleCompany } = this.props;
        return (
            <React.Fragment>
                <div className={`nav-menu`}>
                    <div onClick={() => toggleCompanyProfile('post')} className={`navmenu-button ${toggleCompany === 'post' ? 'active' : ''}`}>
                        <span>Post</span>
                    </div>
                    <div onClick={() => toggleCompanyProfile('favorites')} className={`navmenu-button ${toggleCompany === 'favorites' ? 'active' : ''}`}>
                        <span>Favorites</span>
                    </div>
                    <div onClick={() => toggleCompanyProfile('notes')} className={`navmenu-button ${toggleCompany === 'notes' ? 'active' : ''}`}>
                        <span>My Candidates/Notes</span>
                    </div>
                    <div onClick={() => toggleCompanyProfile('edit-company')} className={`navmenu-button ${toggleCompany === 'edit-company' ? 'active' : ''}`}>
                        <span>Edit Profile</span>
                    </div>
                    <div onClick={() => toggleCompanyProfile('create-post')} className={`navmenu-button ${toggleCompany === 'create-post' ? 'active' : ''}`}>
                        <span>Create Post</span>
                    </div>
                    {/* <div onClick={() => toggleCompanyProfile('create-post')} className={`right-button ${toggleCompany === 'create-post' ? 'active' : ''}`}>
                        <div className="test">
                            <div className="mytooltip">
                                <span className="tooltiptext left">Create post</span>
                            </div>
                            <span className={`plus`}><span>+</span></span>
                        </div>
                    </div> */}
                </div>
            </React.Fragment>
        )
    }
}

export default NavMenu;

