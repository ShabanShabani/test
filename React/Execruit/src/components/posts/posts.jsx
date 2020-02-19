import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import JobsBox from './jobs-box';
import SearchBar from '../search/search';
import * as toast from '../../all/toast';
import searchService from '../../services/searchService';
import createPostService from '../../services/createPostService';
import authService from '../../services/authService';
import NoUserJobsBox from './noUserJobBox';


const user = authService.getCurrentUser();

class PostCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            isToggleOn: true,
            isToggleOnMobile: true,
            posts: [],
            filter_search: '',
            page: 1,
            last_page: 0
        };
    }

    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    toggleLeftMenuMobile = () => {
        this.setState({
            isToggleOnMobile: !this.state.isToggleOnMobile
        });
    };

    componentDidMount() {
        if(user)
        {
            const { filter_search } = this.state;
            let { page } = this.state;
            searchService.getFitlerSearch(filter_search, page).then(({ data: response }) => {
                this.setState({
                    posts: [].concat(response.posts),
                    last_page: response.last_page
                })
            }).catch(err => {
                toast.error('Something went wrong. Please refresh the page.')
            })
            this.handleSearchScrollJobs()
        }
        if(user === null)
        {
            this.onNoneUser()
        }
    }

    handleSearchScrollJobs = () => {
        this.refs.myscroll.addEventListener("scroll", () => {
            if (this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >= this.refs.myscroll.scrollHeight) {
                this.onFilterBySearch();
            }
        });
    }

    onNoneUser = () => {
        createPostService.getAllPosts().then(({ data: response }) => {
            console.log(response)
            this.setState({
                posts: [].concat(response)
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
    }

    onFilterBySearch = (event) => {
        const value = event.target.value
        searchService.getFitlerSearch(value, 1).then(({ data: response }) => {
            this.setState({
                posts: [].concat(response.posts),
                last_page: response.last_page,
                filter_search: value,
                page:1
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
    }

    render() {
        const { isToggleOn, isToggleOnMobile, posts, filter_search, page, last_page } = this.state;
        console.log(posts)
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
                {!user ?
                ''
                :
                <SearchBar
                filter_search={filter_search}
                onFilterBySearch={this.onFilterBySearch}
            />  
                }
                
                <React.Fragment>
                    {user === null ?
                        <div ref="myscroll" className={`jobs ${isToggleOn ? '' : 'active'}`}>
                            {posts && posts.length === 0 ?
                                <span className="notFound">No Job Posts found! no user</span>
                                :
                                <NoUserJobsBox 
                                filter_search={filter_search}
                                posts={posts}
                                myPost=''
                                page={page}
                                last_page={last_page}
                            />
                            }
                        </div>
                        :
                        <div ref="myscroll" className={`jobs ${isToggleOn ? '' : 'active'}`}>
                            {posts && posts.length === 0 ?
                                <span className="notFound">No Job Posts found! user</span>
                                :
                                <JobsBox
                                    filter_search={filter_search}
                                    posts={posts}
                                    myPost=''
                                    page={page}
                                    last_page={last_page}
                                />
                            }
                        </div>
                    }
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default PostCompany;