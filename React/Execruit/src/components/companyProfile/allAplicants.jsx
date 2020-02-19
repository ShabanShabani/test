import React, { Component } from 'react';
import LisComponent from '../favorites/listComponent';
// import Filter from '../favorites/filter';
// import { Grid } from 'semantic-ui-react';
import NavBar from '../nav-bar/nav-bar';
import LeftMenu from '../left-menu/left-menu';
import createPostService from '../../services/createPostService';
import * as toast from '../../all/toast';
import getSocket from '../../all/common/socket'
class AllAplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropActive: false,
            users: [],
            value: '',
            isFilterOn: false,
            isToggleList: 'list',
            isToggleOn: true,
            isToggleOnMobile: true,
            toggleUserTab: 'allAplicants',
            schedule: '',
            // page: 1,
            // last_page: 0
        };
        this.state.data = this.props.users;
    }


    componentDidMount() {
        let jobId = this.props.location.pathname.split('/')[2]
        createPostService.getPostApplicants(jobId).then(({ data: response }) => {
            this.setState({
                users: [].concat(response)
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
    }

    addToShortList = (userID) => {
        console.log(userID)
        let jobId = this.props.location.pathname.split('/')[2]
        createPostService.postShortApplicants(jobId, userID).then(({ data: response }) => {
            toast.success('Successfully added to short list')
            createPostService.getPostApplicants(jobId).then(({ data: response }) => {
                this.setState({
                    users: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }).catch(err => {
            toast.error('This user already exist in Short list.')
        })
    }

    removeFromShortList = (userID) => {
        let jobId = this.props.location.pathname.split('/')[2]
        createPostService.removeFromShortList(jobId, userID).then(({ data: response }) => {
            toast.success('Successfully removed from short list')
            createPostService.getShortApplicants(jobId).then(({ data: response }) => {
                this.setState({
                    users: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }).catch(err => {
            toast.error('Something went wrong.')
        })
    }

    onChangeSchedule = (userID, date ) => {
        console.log(date)
        let { schedule } = this.state;
        schedule = date;
        this.setState({ 
            schedule 
        },
            this.interviewDate(userID, schedule)
        )
       
    }

    onEditSchedule = (userID, date ) => {
        let { schedule } = this.state;
        schedule = date;
        this.setState({ 
            schedule 
        },
            this.EditinterviewDate(userID, schedule)
        )
    }

    interviewDate = (userID, schedule) => {
        let jobId = this.props.location.pathname.split('/')[2]
        console.log(schedule)
        createPostService.interviewDate(jobId, userID, schedule).then(({ data: response }) => {
            toast.success('Successfully added to interview  list')
        }).catch(err => {
            toast.error('This user already exist in interview list')
        })
        getSocket().emit('notification');
    }

    EditinterviewDate = (userID,schedule) => {
        let jobId = this.props.location.pathname.split('/')[2]
        createPostService.EditinterviewDate(jobId, userID, schedule).then(({ data: response }) => {
            toast.success('Successfully edited date of interview')
        }).catch(err => {
            toast.error('Something went wrong.')
        })
        getSocket().emit('notification');
    }

    cancelInterview = (userID,) => {
        let jobId = this.props.location.pathname.split('/')[2]
        createPostService.cancelInterview(jobId, userID).then(({ data: response }) => {
            toast.success('Successfully removed from short list')
            createPostService.getInterviewsUsers(jobId).then(({ data: response }) => {
                this.setState({
                    users: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }).catch(err => {
            toast.error('Something went wrong.')
        })
        getSocket().emit('notification');
    }

    // toggleUserProfileTab = (toggleUserTab) => {
    //     this.setState({
    //         toggleUserTab: toggleUserTab
    //     },this.getUsers(toggleUserTab))
    // }

    // getUsers=(toggleUserTab) =>{
    //     let jobId = this.props.location.pathname.split('/')[2]
    //     const{users,page}=this.state
    //     if (!toggleUserTab) {
    //         toggleUserTab = this.state.toggleUserTab
    //     }
    //     if(toggleUserTab === 'allAplicants'){
    //         createPostService.getPostApplicants(jobId,page+1).then(({ data: response }) => {
    //             this.setState({
    //                 users: users.concat(response.applicants),
    //                 last_page: response.last_page,
    //                 page:page+1
    //             })
    //         }).catch(err => {
    //             toast.error('Something went wrong. Please refresh the page.')
    //         })
    //     }
    //     else if(toggleUserTab ==='shortList') {
    //         createPostService.getShortApplicants(jobId).then(({ data: response }) => {
    //             this.setState({
    //                 users: [].concat(response)
    //             })
    //         }).catch(err => {
    //             toast.error('Something went wrong. Please refresh the page.')
    //         })
    //     }
    //     else {
    //         createPostService.getInterviewsUsers(jobId).then(({ data: response }) => {
    //             this.setState({
    //                 users: [].concat(response)
    //             })
    //         }).catch(err => {
    //             toast.error('Something went wrong. Please refresh the page.')
    //         })
    //     }
    // }

    toggleUserProfileTab = (toggleUserTab) => {
        this.setState({
            toggleUserTab: toggleUserTab
        })
        console.log(toggleUserTab)
        let jobId = this.props.location.pathname.split('/')[2]
        if(toggleUserTab === 'allAplicants'){
            createPostService.getPostApplicants(jobId).then(({ data: response }) => {
                this.setState({
                    users: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
        else if(toggleUserTab ==='shortList') {
            createPostService.getShortApplicants(jobId).then(({ data: response }) => {
                this.setState({
                    users: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
        else {
            createPostService.getInterviewsUsers(jobId).then(({ data: response }) => {
                this.setState({
                    users: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
    }

    toggleFilter = () => {
        this.setState({
            isFilterOn: !this.state.isFilterOn
        });
    };

    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
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

    toggleCompanyProfile = (toggleCompany) => {
        this.setState({
            toggleCompany: toggleCompany
        })
    }

    onEditPost = (toggleCompany, id) => {
        this.setState({
            toggleCompany: toggleCompany,
            post_id: id
        })
    }


    render() {
        const { dropdownClick, company } = this.props;
        const { dropActive, users, isToggleOn, isToggleOnMobile, toggleUserTab, schedule } = this.state;
        return (
            <React.Fragment>
                <NavBar
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                />
                <div className={`favorites`}>
                    <div className={`nav-menu`}>
                        <div onClick={this.toggleUserProfileTab.bind(this, 'allAplicants')} className={`navmenu-button ${toggleUserTab === 'allAplicants' ? 'active' : ''}`}>
                            <span>All Aplicants</span>
                        </div>
                        <div onClick={this.toggleUserProfileTab.bind(this, 'shortList')} className={`navmenu-button ${toggleUserTab === 'shortList' ? 'active' : ''}`}>
                            <span>Short List</span>
                        </div>
                        <div onClick={this.toggleUserProfileTab.bind(this, 'Interviews')} className={`navmenu-button ${toggleUserTab === 'Interviews' ? 'active' : ''}`}>
                            <span>Interviews</span>
                        </div>
                    </div>
                    <div  ref="myscroll" className={`list on`}>
                        <div className={`top-list`}>
                            <div className="top-list-name">
                                <span>Emri</span>
                            </div>
                            <div className="top-list-name">
                                <span>Position</span>
                            </div>
                            {toggleUserTab !== 'Interviews' &&
                            <div className="top-list-name">
                                <span>Education</span>
                            </div>
                            }
                            {toggleUserTab === 'Interviews' &&
                            <div className="top-list-name">
                                <span>Interview Time</span>
                            </div>
                            }
                            {company === 'comp' && toggleUserTab === 'allAplicants' ?
                                ''
                                :
                                <div className="top-list-name">
                                    <span>Schedule</span>
                                </div>
                            }
                        </div>
                        <div>
                            {users.map((user, index) =>
                                <LisComponent 
                                    indexKey={index}
                                    key={index}
                                    user={user}
                                    dropActive={dropActive}
                                    dropdownClick={dropdownClick}
                                    company={company}
                                    toggleUserTab={toggleUserTab}
                                    addToShortList={this.addToShortList}
                                    removeFromShortList={this.removeFromShortList}
                                    interviewDate={this.interviewDate}
                                    EditinterviewDate={this.EditinterviewDate}
                                    onChangeSchedule={this.onChangeSchedule}
                                    onEditSchedule={this.onEditSchedule}
                                    schedule={schedule}
                                    cancelInterview={this.cancelInterview}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default AllAplicants;
