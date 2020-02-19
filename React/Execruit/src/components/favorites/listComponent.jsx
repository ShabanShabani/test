import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../all/common/form'
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

class LisComponent extends Form {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    dropdownClick = (e) => {
        if (!e.target.parentNode.parentNode.className.includes('open')) {
            e.target.parentNode.parentNode.className += ' open'
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className += ' zIndexUser'
        } else {
            e.target.parentNode.parentNode.className = ' download-img'
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className = ' body-list'
        }
    }

    render() {
        const { user, company ,toggleUserTab, addToShortList, removeFromShortList, schedule, onChangeSchedule , onEditSchedule,cancelInterview} = this.props;

        return (
            // <div key={indexKey} className={`list ${isToggleList === 'list' ? "on" : "off"}`}>
            // <div key={indexKey} className={`list  on`}>
            <React.Fragment>
                {/* <div className={`top-list`}>
                    <div className="top-list-name">
                        <span>Emri</span>
                    </div>
                    <div className="top-list-name">
                        <span>Profesioni</span>
                    </div>
                    <div className="top-list-name">
                        <span>Profili</span>
                    </div>
                    <div className="top-list-name">
                        <span>Resume</span>
                    </div>
                </div> */}
                <div className={`body-list`}>
                    <div>
                        <div key={user.id} className={`user-list`}>
                            <Link to={`/user-profile/${user.username}`}>
                                <div className="user-list-wrapper name">
                                    <span>{user.name} {user.first_name} {user.last_name}</span>
                                </div>
                                <div className="user-list-wrapper profession">
                                    <span>{user.position}</span>
                                </div>
                                </Link>
                                <div className="user-list-wrapper resume">
                                    <div id={user.id} className={`download-img `}>
                                        {toggleUserTab === 'allAplicants' || toggleUserTab === 'shortList' ?
                                        <React.Fragment>
                                        <div className="user-list-wrapper profession">
                                            <span>{user.education}</span>
                                        </div>
                                        </React.Fragment>
                                        :
                                        ''
                                        }
                                    </div>
                                    <div>
                                    {user.date}<br/>
                                    {user.time}
                                    </div>
                                </div>
                            {company === 'comp' ?
                                ''
                                :
                                <div className="user-list-wrapper resume">
                                    {/* <div id={user.id} className={`download-img `}>
                                        {toggleUserTab === 'allAplicants' ?
                                        <React.Fragment>
                                        <div className="testgrid">
                                        <div className="mytooltip">
                                            <p className="tooltiptext">Download CV</p>
                                        </div>
                                        <img onClick={this.dropdownClick} src="../img/download-button.png" alt="" />
                                    </div>
                                    
                                    <div className={`dropdown`}>
                                        <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf/${user.username}/1`}>Europass</a>
                                        <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf/${user.username}/2`}>Creative</a>
                                        <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf/${user.username}/3`}>Chronological</a>
                                    </div>
                                    </React.Fragment>
                                    :
                                    ''
                                    }
                                    </div> */}
                                    {toggleUserTab === 'allAplicants' &&
                                    <React.Fragment>
                                        {user.add ?
                                        <button className="user-short-list active">
                                            Added to short list
                                        </button>
                                        :
                                        <button onClick={addToShortList.bind(this, user.id)}className="user-short-list">
                                            Add to short list
                                        </button>
                                        }
                                    </React.Fragment>
                                    }
                                    {toggleUserTab === 'shortList' &&
                                        <React.Fragment>
                                            <button onClick={removeFromShortList.bind(this, user.id)} className="user-remove-list">
                                                Remove from <br/>short list
                                            </button>
                                                {this.renderDatePicker3(false, "schedule", "Schedule Interview", 'schedule', schedule, onChangeSchedule.bind(this, user.id), '', false, null, false, "schedule")}
                                        </React.Fragment>
                                    }
                                    {toggleUserTab === 'Interviews' &&
                                    <React.Fragment>
                                        {this.renderDatePicker3(false, "schedule", "Reschedule interview", 'schedule', schedule, onEditSchedule.bind(this, user.id), '', false, null, false, "schedule")}
                                        <button onClick={cancelInterview.bind(this,user.id)} className="user-cancel-list">
                                            Cancel <br/>
                                            Interview 
                                        </button>
                                    </React.Fragment>
                                    }
                                </div>
                            }

                        </div>

                    </div>
                </div>
            </React.Fragment>
            // </div>
        );
    }
}

export default LisComponent;