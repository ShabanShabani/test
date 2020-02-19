import React, { Component } from 'react';
import LeftMenu from "../left-menu/left-menu";
import NavBar from '../nav-bar/nav-bar'
import List from '../favorites/list'
// import Filter from '../favorites/filter'
import searchService from '../../services/searchService';
import companyService from '../../services/companyService';
import GridCompany from "../companyProfile/assets/gridCompany"
import SearchBar from '../search/search';

class AllCompanies extends Component {
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
            favorites: [],
            filter_search: '',
            page: 1,
            last_page: 0
        };
        this.state.data = this.props.users
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getFilteredUsers = (value, skillsFilterValue) => {
        searchService.getSearch(value, skillsFilterValue).then(({ data }) => {
            let allUsers = []
            if (data && data.length > 0) {
                allUsers = [].concat(data);
            }
            this.setState({
                users: allUsers
            });
        })
    }

    handleChangePlatform = (e, { value }) => {
        const { searchValue } = this.state;
        this.setState({
            skillsFilterValue: value
        })
        this.getFilteredUsers(searchValue, value);
    };

    getData = () => {
        companyService.getAll().then(({ data }) => {
            let allUsers = []
            if (data && data.length > 0) {
                allUsers = [].concat(data);
            }

            this.setState({
                users: allUsers
            })
        })
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

    onFilterBySearch = (event) => {
        const value = event.target.value
        this.setState({
            filter_search: value
        })
        searchService.getFitlerCompanySearch(value).then(({ data: response }) => {
            this.setState({
                users: [].concat(response)
            })
        })
    }

    render() {
        const { data, value, isToggleOn, isToggleList, filter_search, users, isToggleOnMobile, favorites } = this.state;
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
                <React.Fragment>
                    <div className={`favorites ${isToggleOn ? '' : 'active'}`}>
                        {users.length === 0 ?
                            <span className="notFound">No Company Profiles Found!</span>
                            :
                            <React.Fragment>
                                <GridCompany
                                    toggleList={this.toggleList}
                                    isToggleList={isToggleList}
                                    users={users}
                                    value={value}
                                    data={data}
                                    selectedPage='all-users'
                                    favorites={favorites}
                                />
                                <List
                                    toggleList={this.toggleList}
                                    isToggleList={isToggleList}
                                    users={users}
                                    value={value}
                                    data={data}
                                    company='comp'
                                />
                            </React.Fragment>
                        }
                    </div>
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default AllCompanies;