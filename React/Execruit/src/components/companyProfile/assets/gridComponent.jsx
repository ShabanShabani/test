import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../../services/authService'


class GridComponentCompany extends Component {

    render() {
        const { company, indexKey, acceptFunc, favoritesFunc, ignoreFunc, isActive, email_confirmed } = this.props;
        const user = auth.getCurrentUser()
        let initials = '';
        if (company.name) {
            initials = company.name.split('', 2);
        }
        return (
            <React.Fragment>
                <div key={indexKey} className={`user-grid`}>
                    <div className="top">
                        {company.profile_picture &&
                            <img src={`${company.profile_picture}`} alt="" />
                        }
                        {!company.profile_picture &&
                            <span className="initial">{initials}</span>
                        }
                    </div>
                    <div className="middle">
                        <span>{company.name}</span>
                        <span className="role" >{company.email}</span>
                        <div className={`middle-buttons`}>
                            <div>
                                {user.role === 'admin' ?
                                    <div>
                                        {email_confirmed !== true ?
                                            <React.Fragment>
                                                <button className={`company-approve`} onClick={acceptFunc.bind(this, company.id)}>Approve</button>
                                                <button className={`company-ignore`} onClick={ignoreFunc.bind(this, company.id)}>Ignore</button>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <button className={`company-approved`}>Approved</button>
                                                <button className={`company-ignore`} onClick={ignoreFunc.bind(this, company.id)}>Ignore</button>
                                            </React.Fragment>
                                        }
                                    </div>
                                    :
                                    <React.Fragment>
                                        {isActive ?
                                            <button className={`company-unfollow`} onClick={favoritesFunc.bind(this, company.id, isActive)}>Unfollow</button>
                                            :
                                            <button className={`company-follow`} onClick={favoritesFunc.bind(this, company.id, isActive)}>Follow</button>
                                        }
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <Link to={`/company/${company.id}`}>View Profile</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GridComponentCompany;