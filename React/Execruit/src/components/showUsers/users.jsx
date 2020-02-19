import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar'
import Grid from '../favorites/grid'
import List from '../favorites/list'
import Filter from '../favorites/filter'
import profileService from '../../services/profileService';
import searchService from '../../services/searchService';
import SearchBar from '../search/search';
import auth from "../../services/authService";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isActive: false,
            isToggleOn: true,
            isFilterOn: false,
            isToggleList: 'grid',
            isToggleOnMobile: true,
            searchValue: '',
            skillsFilterValue: '',
            languageFilter: '',
            educationFilter: '',
            experienceFilter: '',
            drivingLicense: '',
            favorites: [],
            onFilterBySearch: '',
            filter_search: '',
            page :0,
            last_page:1
        };
        this.state.data = this.props.users
    }

    componentDidMount() {
        this.getFilteredUsers();
    }

    // One Filter By All Parameters
    getFilteredUsers = (eventScroll) => {
        let toggleCompany = 'users'
        let { skillsFilterValue, languageFilter, educationFilter, experienceFilter, drivingLicense, page, users, last_page, isFilterOn, filter_search } = this.state;
        console.log(page)
        console.log(eventScroll)
        if (page < last_page) {
            searchService.getSearch(skillsFilterValue, languageFilter, educationFilter, experienceFilter, drivingLicense, toggleCompany, filter_search, page+1).then(({ data: response }) => {
                // if(skillsFilterValue === '' && languageFilter === '' && educationFilter === '' && experienceFilter === '' && drivingLicense === '' && toggleCompany === '' && !isFilterOn){
                if(eventScroll === 'scrollPage')
                {
                    this.setState({
                        users: users.concat(response.users),
                        page:page+1,
                        last_page: response.last_page
                    });
                }
                else{
                    
                    this.setState({
                        users: [].concat(response.users),
                        page:page+1,
                        last_page: response.last_page
                    });
                }
            })
        }
    } 
    
    handleChangePlatform = (e, { value }) => {
        this.setState({
            skillsFilterValue: value,
            page :0,
        },
            this.getFilteredUsers
        );
    }; 

    onFilterBySearch = (event) => {
        const value = event.target.value
        console.log(event.target.value)
        this.setState({
            filter_search: value,
            page :0,
        },
            this.getFilteredUsers
        )
    }

    // Filter By Languages
    onLanguageFilter = (e, { value }) => {
        this.setState({
            languageFilter: value,
            page :0,
        },
            this.getFilteredUsers
        );
    }

    // Filter By Education Degree
    onEducationFilter = (e, { value }) => {
        this.setState({
            educationFilter: value,
            page :0,
        },
            this.getFilteredUsers
        );
    }

    // Filter By Driving License Category
    onDrivingFilter = (e, { value }) => {
        this.setState({
            drivingLicense: value,
            page :0,
        },
            this.getFilteredUsers
        );
    }

    // Filter By wokring experience 
    onExperienceFilter = (e, { value }) => {
        this.setState({
            experienceFilter: value,
            page :0,
        },
            this.getFilteredUsers
        );
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

    render() {
        const { data, value, isToggleOn, isToggleList, isFilterOn, users, isToggleOnMobile, favorites, filter_search } = this.state;
        return (
            <React.Fragment>
                <NavBar users={users} />
                <LeftMenu
                    toggleLeftMenu={this.toggleLeftMenu}
                    isToggleOn={isToggleOn}
                    toggleLeftMenuMobile={this.toggleLeftMenuMobile}
                    isToggleOnMobile={isToggleOnMobile}
                />
                <SearchBar
                    filter_search={filter_search}
                    onFilterBySearch={this.onFilterBySearch}
                />
                <div className={`favorites ${isToggleOn ? '' : 'active'}`}>
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
                    />
                    {users.length === 0 ?
                        <span className="notFound">No User Profile Found!</span>
                        :
                        <React.Fragment>
                            <Grid
                                toggleList={this.toggleList}
                                isToggleList={isToggleList}
                                users={users}
                                value={value}
                                data={data}
                                selectedPage='all-users'
                                favorites={favorites}
                                getUsers={this.getFilteredUsers}
                            />
                            <List
                                toggleList={this.toggleList}
                                isToggleList={isToggleList}
                                users={users}
                                value={value}
                                data={data}
                                getUsers={this.getFilteredUsers}
                            />
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Users;