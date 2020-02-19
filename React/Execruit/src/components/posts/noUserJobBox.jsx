import React, { Component } from 'react';
import createPostService from '../../services/createPostService';
import * as toast from '../../all/toast';
import MapBox from './mapBox';
import { Link } from 'react-router-dom';
import auth from "../../services/authService";
import renderHTML from 'react-render-html';
import getSocket from '../../all/common/socket'
import searchService from '../../services/searchService';

class NoUserJobsBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '',
            isToggleList: 'grid',
            toggleNotificaiton: false,
            isFilterOn: false,
            viewPostData: {
                company_id: '',
                description: '',
                end_date: '',
                id: '',
                image: '',
                post_date: '',
                title: '',
                days_left: '',
                start_date: '',
                company_name: '',
                applicants: [],
                nr_applicants: '',
            },
            x: 0,
            y: 0,
            currentTab: 'post',
            page: 1,
            last_page: this.props.last_page,
            search: ''
        };
    }

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

    componentWillReceiveProps(newProps) {
        if (this.props.myPost !== 'mypost') {
            this.setState({
                data: newProps.posts,
                search: newProps.filter_search,
                page : newProps.page,
                last_page : newProps.last_page
            })
        }else{
            this.setState({
                data: newProps.posts,
                last_page : newProps.last_page
            })
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.posts
        })
        if (window.location.href.split(`/`).length === 5) {
            let location = window.location.href.split('/')
            if (location[3]=== "jobs"){
                let viewPostId = location[4]
                this.onViewPost(viewPostId)
            }
        }
        this.handleScrollJobs()
    }

    handleScrollJobs = () => {
        this.refs.myscroll.addEventListener("scroll", () => {
            if (this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >= this.refs.myscroll.scrollHeight) {
                this.loadMore();
            }
        });
    }

    loadMore = () => {
        let { page, data, last_page, search } = this.state;
        let { myPost } = this.props;
        if (page+1 <= last_page) {
            if (myPost === 'mypost') {
                createPostService.getCompanyPosts(page + 1).then(({ data: response }) => {
                    this.setState({
                        data: data.concat(response.posts),
                        last_page: response.last_page,
                        page: page + 1
                    })
                }).catch(err => {
                    toast.error('Something went wrong. Please refresh the page.')
                })
            } else {
                searchService.getFitlerSearch(search, page + 1).then(({ data: response }) => {
                    this.setState({
                        data: data.concat(response.posts),
                        last_page: response.last_page,
                        page: page + 1
                    })
                }).catch(err => {
                    toast.error('Something went wrong. Please refresh the page.')
                })
            }
        }
    }

    ontoggleNotificaiton = () => {
        this.setState({
            toggleNotificaiton: !this.state.toggleNotificaiton
        })
    }

    onApplyNow = (id) => {
        createPostService.applyNow(id).then(({ data: response }) => {
            toast.success('You applied to this job!')
            createPostService.getAllPosts().then(({ data: response }) => {
                this.setState({
                    data: [].concat(response)
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
        }).catch(err => {
            toast.error('You need to be loged in order to apply for a job position .')
        })
        getSocket().emit('notification');
    }

    // onCancel = (id) => {
    //     createPostService.onCancel(id).then(({ data: response }) => {
    //         toast.success('You cancelled your application to this job!')
    //         createPostService.getAllPosts().then(({ data: response }) => {
    //             this.setState({
    //                 data: [].concat(response)
    //             })
    //         }).catch(err => {
    //             toast.error('Something went wrong. Please refresh the page.')
    //         })
    //     }).catch(err => {
    //         toast.error('Something went wrong. Please refresh the page.')
    //     })
    // }

    onViewPost = (id) => {
        const { viewPostData } = this.state;
        createPostService.getClickedPostNoUser(id).then(({ data: response }) => {
            viewPostData.company_id = response.company_id;
            viewPostData.description = response.description;
            viewPostData.end_date = response.end_date;
            viewPostData.id = response.id;
            viewPostData.image = response.image;
            viewPostData.post_date = response.post_date;
            viewPostData.title = response.title;
            viewPostData.profile_picture = response.profile_picture;
            viewPostData.days_left = response.days_left;
            viewPostData.start_date = response.start_date;
            viewPostData.company_name = response.company_name;
            viewPostData.first_initial = response.first_initial;
            viewPostData.last_initial = response.last_initial;
            viewPostData.city = response.city;
            this.setState({
                viewPostData
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
        this.setState({
            viewPost: true
        })
    }

    addClass = (myPost, viewPost) => {
        let className = ''
        if (!myPost) {
            className = "grid-6 grid-5 grid-4"
        }
        if (myPost) {
            className = "grid-4"
        }
        if (viewPost) {
            className = ''
        }
        return className;
    }

    onRemoveViewPost = () => {
        this.setState({
            viewPost: false
        })
    }

    dropdownClick = (e) => {
        if (!e.target.parentNode.className.includes('open')) {
            e.target.parentNode.className += ' open'
        } else {
            e.target.parentNode.className = 'download-img'
        }
        this.setState({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        })
    }

    render() {
        const { data, viewPost, viewPostData, x, y } = this.state;
        const { myPost, onEditPost } = this.props;
        let location1 = window.location.href.split('/')
        console.log(data)
        return (
            <React.Fragment>
                <div className={`jobsbox`}>
                    <div ref="myscroll" className={`grid-box`}>
                        <div className={`post-left ${viewPost ? 'active' : ''}`}>
                            {data &&
                                data.map((element, index) =>
                                    <MapBox
                                        element={element}
                                        index={index}
                                        onApplyNow={this.onApplyNow}
                                        onCancel={this.onCancel}
                                        myPost={myPost}
                                        onEditPost={onEditPost}
                                        key={index}
                                        viewPost={viewPost}
                                        addClass={this.addClass}
                                        onViewPost={this.onViewPost}
                                    />
                                )
                            }
                        </div>
                        {viewPost &&
                            <div className={`post-right ${viewPost ? 'active' : ''}`}>
                                <img className={`remove`} onClick={this.onRemoveViewPost} src='../img/close.svg' alt="" />
                                <img className={`job-post-pic`} src={viewPostData.image} alt="" />
                                <div className={`job-post-details`}>
                                    <div className={`job-post-title job-box-dark`}>{viewPostData.title}</div>
                                    <div className={`job-post-first-row`}>
                                        <div className={`place`}>
                                            <Link to={`company/${viewPostData.company_id}`}>{viewPostData.company_name}</Link>  {viewPostData.city}</div>
                                        <div className={`posted`}>Posted on: {viewPostData.start_date} </div>
                                    </div>
                                    <div className={`job-box-description`}>
                                        {renderHTML(viewPostData.description)}
                                    </div>
                                </div>

                                <div className={`post-logo`}>
                                    {viewPostData.profile_picture &&
                                        <img className={`post-logo-pic`} src={viewPostData.profile_picture} alt=""></img>
                                    }
                                    {!viewPostData.profile_picture &&
                                        <span className="initial">{viewPostData.first_initial}{viewPostData.last_initial}</span>
                                    }
                                </div>
                                <p>{location1[0]}/{location1[1]}/{location1[2]}/{location1[3]}/{viewPostData.id}</p>
                                <div className="applicants little-box">
                                    {/* <div>
                                        <span>Applicants:</span>
                                    </div> */}
                                    <div className={`seenby`}>
                                        <div className={`applicants-circle`}>
                                            {/* {currentCompany === viewPostData.company_id || role === 'admin' ? */}
                                                {/* <React.Fragment> */}
                                                    {/* {viewPostData.applicants.length === 0 &&
                                                        <span>No Applicants</span>
                                                    } */}
                                                    {/* {viewPostData.applicants &&
                                                        viewPostData.applicants.map((element, index) =>
                                                            index < 3 ?
                                                                <Link to={`user-profile/${element.username}`}>
                                                                    {element.profile_picture &&
                                                                        <img className={`top`} src={element.profile_picture} alt="" />
                                                                    }
                                                                    {!element.profile_picture &&
                                                                        <span className="initial no-photo">{element.first_initial}{element.last_initial}</span>
                                                                    }
                                                                </Link>
                                                                :
                                                                ''
                                                        ) 
                                                    } */}
                                                    {/* {viewPostData.applicants.length > 0 && viewPostData.applicants.length < 3 &&
                                                        <span className={`seeall-wrapper`}>
                                                            <Link to={`/all-applicants/${viewPostData.id}`} >See All</Link>
                                                        </span>
                                                    } */}
                                                    {/* {viewPostData.applicants.length > 3 &&
                                                        <div className={`download-img`}>
                                                            <div onClick={this.dropdownClick} className={`plus-top`}>{"+" + (viewPostData.applicants.length - 3)}</div>
                                                            <div className={`dropdown`} style={{
                                                                top: x + '%', left: y + '%', transform: 'translate(20%, 30%)', overflowY: 'scroll'
                                                            }}>
                                                                {
                                                                    viewPostData.applicants.map((element, index) =>
                                                                        index < 3 ?
                                                                            ''
                                                                            :
                                                                            <React.Fragment>
                                                                                <Link to={`user-profile/${element.username}`}>
                                                                                    {element.profile_picture &&
                                                                                        <img className={`top drop-img`} src={element.profile_picture} alt="" />
                                                                                    }
                                                                                    {!element.profile_picture &&
                                                                                        <span className="initial inside">{element.first_initial}{element.last_initial}</span>
                                                                                    }
                                                                                    <span>{element.first_name}{element.last_name}</span>
                                                                                </Link>

                                                                            </React.Fragment>
                                                                    )

                                                                }
                                                                <div className="seall">
                                                                    <span>
                                                                        <Link to={`/all-applicants/${viewPostData.id}`} >See All</Link>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    } */}
                                                {/* </React.Fragment>
                                                :
                                                } */}
                                                {/* <React.Fragment>
                                                    {(viewPostData.nr_applicants && viewPostData.nr_applicants >= 0) ||
                                                        viewPostData.nr_applicants < 10 ?
                                                        <React.Fragment>
                                                            {viewPostData.nr_applicants === 0 ?
                                                                <span>No Applicants</span> :
                                                                <div className={`plus-top`}>{viewPostData.nr_applicants} </div>
                                                            }
                                                        </React.Fragment>
                                                        :
                                                        <div className={`plus-top`}>{"10+"}</div>
                                                    }
                                                </React.Fragment> */}
                                        </div>
                                        <div className={`seenby-box`}>
                                            <div className={`time`}>
                                                <div className="left-days">
                                                    {viewPostData.days_left <= 0 ?
                                                        <React.Fragment>
                                                            {viewPostData.days_left < 0 ?
                                                                <span><img src="../img/clock1.svg" alt="" />Expired</span>
                                                                :
                                                                <span><img src="../img/clock1.svg" alt="" />Last Day</span>
                                                            }
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            {viewPostData.days_left === 1 ?
                                                                <span><img src="../img/clock1.svg" alt="" />{viewPostData.days_left} Day left</span>
                                                                :
                                                                <span><img src="../img/clock1.svg" alt="" />{viewPostData.days_left} Days left</span>
                                                            }
                                                        </React.Fragment>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NoUserJobsBox;