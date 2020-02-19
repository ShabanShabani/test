import React, { Component } from 'react';
import GridComponent from './gridComponent';
import companyService from '../../services/companyService';
import authService from '../../services/authService';
const user = authService.getCurrentUser();

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropActive: false,
            data: [],
            value: '',
            selectedPage: this.props.selectedPage,
            isFavorite: [],
            favorites: [],
            notes: []
        };
        this.state.data = this.props.users;
    }

    componentDidMount() {
        this.getFavorites();
        if (this.props.selectedPage === 'favorites') {
            this.setState({
                favorites: this.props.favorites
            })
            companyService.getFavoriteUsers().then(({ data: response }) => {
                this.setState({
                    favorites: [].concat(response)
                })
            })
        }
        if (this.props.selectedPage === 'notes') {
            this.setState({
                notes: this.props.notes
            })
        }
        this.handleSearchScrollJobs();
        
    }

    handleSearchScrollJobs = () => {
        const ref = this.refs.usersScroll
        ref.addEventListener("scroll", () => {
            console.log("Scrooll")
            if (ref.scrollTop + ref.clientHeight >= ref.scrollHeight) {
                this.props.getUsers('scrollPage');
            }
        });
    }

    getFavorites = () => {
        if (user.role === 'company') {
            companyService.getFavorites().then(({ data: response }) => {
                this.setState({
                    isFavorite: [].concat(response)
                })
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notes) {
            this.setState({
                notes: [].concat(nextProps.notes)
            })
        }
        if (nextProps.favorites) {
            this.setState({
                favorites: [].concat(nextProps.favorites)
            })
        }
    }

    render() {
        const { isToggleList, dropdownClick, users, selectedPage } = this.props;
        const { dropActive, isFavorite, favorites, notes } = this.state;
        return (
            <React.Fragment>
                <div ref="usersScroll" className={`grid ${isToggleList === 'grid' ? "on" : "off"}`}>
                    <div>
                        {selectedPage === "favorites" &&
                            <React.Fragment>
                                {favorites.map((favorite, index) =>
                                    <GridComponent
                                        indexKey={index}
                                        key={index}
                                        user={favorite}
                                        is_active={isFavorite.includes(favorite.id)}
                                        dropActive={dropActive}
                                        dropdownClick={dropdownClick}
                                        getFavorites={this.getFavorites}
                                    />
                                )}
                            </React.Fragment>
                        }
                        {selectedPage === "notes" &&
                            <React.Fragment>
                                {notes.map((favorite, index) =>
                                    <GridComponent
                                        indexKey={index}
                                        key={index}
                                        user={favorite}
                                        is_active={isFavorite.includes(favorite.id)}
                                        dropActive={dropActive}
                                        dropdownClick={dropdownClick}
                                        getFavorites={this.getFavorites}
                                    />
                                )}
                            </React.Fragment>
                        }
                        {selectedPage === "all-users" &&
                            <React.Fragment>
                                {users.map((user, index) =>
                                    <GridComponent
                                        indexKey={index}
                                        key={index}
                                        user={user}
                                        is_active={isFavorite.includes(user.id)}
                                        dropActive={dropActive}
                                        dropdownClick={dropdownClick}
                                        getFavorites={this.getFavorites}
                                    />
                                )}
                            </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Grid;