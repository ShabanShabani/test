import React, { Component } from 'react';
import searchService from '../../services/searchService';
import companyService from '../../services/companyService';
import GridCompany from "../companyProfile/assets/gridCompany"

class FollowedCompanies extends Component {
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
        };
        this.state.data = this.props.users
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePlatform = this.handleChangePlatform.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = event => {
        const { value } = event.target;
        const { skillsFilterValue } = this.state;
        this.setState({
            searchValue: value
        })
        event.preventDefault();
        this.getFilteredUsers(value, skillsFilterValue);
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

    render() {
        const { data, value, isToggleList, users, favorites } = this.state;
        return (
            <React.Fragment>
                <div>
                    <GridCompany
                        toggleList={this.toggleList}
                        isToggleList={isToggleList}
                        users={users}
                        value={value}
                        data={data}
                        selectedPage='all-users'
                        favorites={favorites}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default FollowedCompanies;