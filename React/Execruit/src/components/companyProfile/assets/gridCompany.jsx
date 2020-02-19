import React, { Component } from 'react';
import profileService from '../../../services/profileService';
import * as toast from "../../../all/toast";
import GridComponentCompany from './gridComponent';
import authService from '../../../services/authService';
import getSocket from '../../../all/common/socket'
import companyService from '../../../services/companyService';
import { Popover } from 'react-bootstrap';
import { Popup } from 'semantic-ui-react';
const user = authService.getCurrentUser();

class GridCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropActive: false,
            data: [],
            value: '',
            selectedPage: this.props.selectedPage,
            isFavorite: [],
            favorites: [],
            email_confirmed: false,
            users:this.props.users
        };
        this.state.data = this.props.users;
    }

    favoritesFunc = (id, is_active) => {
        profileService.putFavoriteUser(id, !is_active).then(({ response }) => {
            this.getFavorites();
            toast.success("Successfully Favorited User.");
        }).catch(err => {
            toast.error("Something went wrong. Please try again");
        });
        getSocket().emit('notification');
    }


    componentDidMount() {
        this.getFavorites();
        this.setState({
            users:this.props.users
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            users:newProps.users
        })
    }

    getFavorites = () => {
        if (user.role === 'user') {
            profileService.getFavoritesUser().then(({ data: response }) => {
                this.setState({
                    favorites: [].concat(response)
                })
            })
        }
    }


    acceptFunc = (id, index) => {
        const {users}=this.state;
        users[index].email_confirmed = true;
        this.setState({
            users
        })
        authService.confirmCompany(id).then(({ response }) => {
            toast.success("Successfully Confirmed Company.");
        }).catch(err => {
            toast.error("Something went wrong. Please try again");
        });
        
    }

    ignoreFunc = (id, index) => {
        const {users}=this.state;
        this.setState({
            users
        })
        authService.ignoreCompany(id).then(({ response }) => {
            toast.success("Successfully Ignored Company.");
            companyService.getAll().then(({ data }) => {
                this.setState({
                    users: [].concat(data)
                })
            })
        }).catch(err => {
            toast.error("Something went wrong. Please try again");
        });
    }


    render() {
        const { isToggleList, dropdownClick } = this.props;
        const { dropActive, favorites,users } = this.state;
        return (
            <React.Fragment>
                <div className={`grid ${isToggleList === 'grid' ? "on" : "off"}`}>
                    <div>
                        <React.Fragment>
                            {users.map((user, index) =>
                                <GridComponentCompany
                                    indexKey={index}
                                    key={index}
                                    favoritesFunc={this.favoritesFunc}
                                    acceptFunc={this.acceptFunc}
                                    ignoreFunc={this.ignoreFunc}
                                    favorites={this.favorites}
                                    email_confirmed={user.email_confirmed}
                                    company={user}
                                    isActive={favorites.filter(e => e.favorite === user.id).length > 0}
                                    dropActive={dropActive}
                                    dropdownClick={dropdownClick}
                                    getFavorites={this.getFavorites}
                                />
                            )}
                        </React.Fragment>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GridCompany;