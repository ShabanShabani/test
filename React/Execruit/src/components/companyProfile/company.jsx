import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar';
import LeftCompany from '../companyProfile/leftMenuCompany/leftMenu';
import NavMenu from '../companyProfile/nav-menu';
import JobsBox from '../posts/jobs-box';
import createPostService from '../../services/createPostService';
import CreatePost from '../companyProfile/createPost/create-post';
import EditCompanyProfile from '../companyProfile/editCompanyProfile';
import * as toast from '../../all/toast';
import companyService from '../../services/companyService';
import Grid from '../favorites/grid';
// import Filter from '../favorites/filter';
import SearchBar from '../search/search';
import searchService from '../../services/searchService';
import Filter from '../favorites/filter';


class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                nvi: '',
                phone_number: '',
                name: '',
                industry: '',
                location: '',
                country: '',
                city: '',
                address: '',
                postal_code: '',
                profile_picture: '',
                summary: ''
            },
            isFilterOn: false,
            isToggleList: 'grid',
            user_id: this.props.match.params.id,
            posts: [],
            notes: [],
            favorites: [],
            isActive: false,
            isToggleOn: true,
            isToggleOnMobile: true,
            test: 'test',
            toggleCompany: 'edit-company',
            post_id: '',
            onFilterBySearch: '',
            skillsFilterValue: '',
            languageFilter: '',
            educationFilter: '',
            experienceFilter: '',
            drivingLicense: '',
            page: 1,
            last_page:0
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const { page } = this.state;
        companyService.getCurrentCompany().then(({ data: response }) => {
            this.setState({
                data: response
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
        createPostService.getCompanyPosts(page).then(({ data: response }) => {
            this.setState({
                posts: [].concat(response.posts),
                last_page : response.last_page
            })
        }).catch(err => {
            toast.error('Something went wrong. Please refresh the page.')
        })
        companyService.getFavoriteUsers().then(({ data: response }) => {
            this.setState({
                favorites: [].concat(response)
            })
        })
        companyService.getNotesUsers().then(({ data: response }) => {
            this.setState({
                notes: [].concat(response)
            })
        })
    }


    // One Filter By All Parameters
    getFilteredUsersNavMenu = () => {
        const { toggleCompany } = this.state;
        if (toggleCompany === 'favorites' || toggleCompany === 'notes') {
            let { skillsFilterValue, languageFilter, educationFilter, experienceFilter, drivingLicense, toggleCompany } = this.state;
            searchService.getSearch(skillsFilterValue, languageFilter, educationFilter, experienceFilter, drivingLicense, toggleCompany).then(({ data: response }) => {
                let allUsers = []
                if (response && response.length > 0) {
                    allUsers = [].concat(response);
                }
                if (toggleCompany === 'favorites') {
                    this.setState({
                        favorites: allUsers
                    });
                } else {
                    this.setState({
                        notes: allUsers
                    });
                }
            })
        }
    }

    handleChangePlatform = (e, { value }) => {
        this.setState({
            skillsFilterValue: value
        },
            this.getFilteredUsersNavMenu
        );
    };

    // Filter By Languages
    onLanguageFilter = (e, { value }) => {
        this.setState({
            languageFilter: value
        },
            this.getFilteredUsersNavMenu
        );
    }

    // Filter By Education Degree
    onEducationFilter = (e, { value }) => {
        this.setState({
            educationFilter: value
        },
            this.getFilteredUsersNavMenu
        );
    }

    // Filter By Driving License Category
    onDrivingFilter = (e, { value }) => {
        this.setState({
            drivingLicense: value
        },
            this.getFilteredUsersNavMenu
        );
    }

    onExperienceFilter = (e, { value }) => {
        this.setState({
            experienceFilter: value
        },
            this.getFilteredUsersNavMenu
        );
    }


    getCompanyPosts = () => {
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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

    onFilterBySearch = (event) => {
        const value = event.target.value
        this.setState({
            filter_search: value
        })
        searchService.getCandidatesNotesSearch(value).then(({ data: response }) => {
            this.setState({
                notes: [].concat(response)
            })
        })
    }

    render() {
        const { isToggleOn, isFilterOn, isToggleList, isToggleOnMobile, data, toggleCompany, posts, post_id, favorites, notes, filter_search, last_page } = this.state;
        const { id } = data
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
                <div className={` jobs ${isToggleOn ? '' : 'active'}`}>
                    <div className={`main-information`}>
                        <LeftCompany
                            data={data}
                        />
                        <NavMenu
                            toggleCompanyProfile={this.toggleCompanyProfile}
                            toggleCompany={toggleCompany}
                        />
                        <div className={`right-part `}>
                            <div className={`create-post ${toggleCompany === 'create-post' ? '' : 'displayNone'} `}>
                                <CreatePost
                                    company_id={id}
                                    post_id={post_id}
                                />
                            </div>
                            <div className={`my-posts inside-compnay ${toggleCompany === 'post' ? '' : 'displayNone'}`} >
                                {posts.length === 0 ?
                                    <span className="notFound" >No Jobs found!</span>
                                    :
                                    <JobsBox
                                        posts={posts}
                                        myPost="mypost"
                                        onEditPost={this.onEditPost}
                                        getCompanyPosts={this.getCompanyPosts}
                                        last_page={last_page}
                                    />
                                }
                            </div>
                            <div className={`my-favorites ${toggleCompany === 'favorites' ? '' : 'displayNone'}`}>
                                <Filter
                                    toggleList={this.toggleList}
                                    isToggleList={isToggleList}
                                    toggleFilter={this.toggleFilter}
                                    isFilterOn={isFilterOn}
                                    handleChange={this.handleChangePlatform}
                                    educationChange={this.onEducationFilter}
                                    languageChange={this.onLanguageFilter}
                                    drivingChange={this.onDrivingFilter}
                                    experienceChange={this.onExperienceFilter}
                                    selectedPage='favorites'
                                />
                                <div className={`grid`}>
                                    {favorites.length === 0 ?
                                        <span className="notFound" >No favorite users found!</span>
                                        :
                                        <Grid
                                            selectedPage="favorites"
                                            favorites={favorites}
                                        />
                                    }
                                </div>
                            </div>
                            <div className={`my-notes ${toggleCompany === 'notes' ? '' : 'displayNone'}`}>
                                <div className={`grid`}>
                                    <SearchBar
                                        filter_search={filter_search}
                                        onFilterBySearch={this.onFilterBySearch}
                                    />
                                    <Filter
                                        toggleList={this.toggleList}
                                        isToggleList={isToggleList}
                                        toggleFilter={this.toggleFilter}
                                        isFilterOn={isFilterOn}
                                        handleChange={this.handleChangePlatform}
                                        educationChange={this.onEducationFilter}
                                        languageChange={this.onLanguageFilter}
                                        drivingChange={this.onDrivingFilter}
                                        experienceChange={this.onExperienceFilter}
                                        selectedPage="notes"
                                    />
                                    {notes.length === 0 ?
                                        <span className="notFound" >No users found!</span>
                                        :
                                        <React.Fragment>
                                            <Grid
                                                selectedPage="notes"
                                                notes={notes}
                                            />
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                            <div className="editi">
                                <div className={`edit-profile ${toggleCompany === 'edit-company' ? '' : 'displayNone'}`}>
                                    <EditCompanyProfile
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CompanyProfile;