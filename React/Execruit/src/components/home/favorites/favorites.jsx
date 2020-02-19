import React, { Component } from 'react';
import profileService from '../../../services/profileService';

class FavoriteUsers extends Component {
    state = {
        users: [],
        isActive: false,
        isToggleOn: false
    }

    toggleLeftMenu = () => {
        this.setState({
            isToggleOn: !this.state.isToggleOn
        });
    };

    componentDidMount() {
        profileService.getFavoritesUser().then(({ data }) => {
            let allUsers = []
            if (data && data.length > 0) {
                allUsers = [].concat(data);
            }
            this.setState({
                users: allUsers
            })
        })
    }

    render() {
        const { isActive } = this.props;
        const { users } = this.state;
        return (
            <React.Fragment>
                <div className={`favorites-section ${isActive ? 'active' : ''}`}>
                    <div className={`favorite-top ${isActive ? 'transparent' : ''}`}>
                        <div className={`fav-left-part`}>
                            <div className={`favorite-img`}>
                                <img src="../img/star.png" alt="" />
                            </div>
                            <span>Favorites</span>
                        </div>
                        {/* <div className={`fav-right-part`}>
                        <a  onClick={() => toggleFavorites(true)}>Show All</a>
                    </div> */}
                    </div>
                    <div className={`little-favorite ${isActive ? 'hide' : ''}`}>
                        <div className="favorite-bottom">

                            {users.map(user =>
                                <div key={user.id} className={`user-favorites`}>
                                    <div className={`user-image`}>
                                        <img src="../img/profile.jpg" alt="" />
                                    </div>
                                    <div className={`user-content`}>
                                        <span>{user.first_name}  {user.last_name}</span>
                                    </div>
                                    <div className={`user-button`}>
                                        <div className={`img-button`}>
                                            <img src="../img/download-button.png" alt="" />
                                        </div>
                                        <div className={`img-star`}>
                                            <img src="../img/star-noncolor.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`favoritesActive ${isActive ? 'show' : 'hide'}`}>
                        <div className={`user-box`}>

                        </div>
                        <div className={`user-box`}>

                        </div>
                        <div className={`user-box`}>

                        </div>
                        <div className={`user-box`}>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FavoriteUsers;