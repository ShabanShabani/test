import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as toast from "../../all/toast";
import companyService from '../../services/companyService';
import auth from '../../services/authService';
const { REACT_APP_WEB_API_URL: web_api_url } = process.env;
const role = auth.getCurrentUser()

class GridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                favorite: this.props.user.id,
                isActive: this.props.is_active
            },
            x: 0,
            y: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { data } = this.state;
        data.isActive = nextProps.is_active
        this.setState({
            data
        })
    }

    favorites = (e) => {
        const { data } = this.state;
        const { favorite, isActive } = data;
        data.favorite = e;
        companyService.putFavorites(favorite, !isActive).then(({ response }) => {
            this.props.getFavorites();
            this.setState({
                data
            });
            toast.success("Successfully Favorited User.");
        })
            .catch(err => {
                toast.error("Something went wrong. Please try again");
            });
    }

    dropdownClick = (e) => {
        if (!e.target.parentNode.parentNode.className.includes('open')) {
            e.target.parentNode.parentNode.className += ' open'
        } else {
            e.target.parentNode.parentNode.className = 'download-img'
        }
        this.setState({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        })
    }

    render() {
        const { x, y } = this.state;
        const { isActive, isDeleted } = this.state.data;
        const { dropActive, user, indexKey } = this.props;
        return (
            <React.Fragment>
                <div key={indexKey} className={`user-grid ${isDeleted ? 'deleted' : ''}`}>
                    <div className="top">
                        {user.profile_picture &&
                            <img src={`${user.profile_picture}`} alt="" />
                        }
                        {!user.profile_picture &&
                            <span className="initial">{user.first_initial} {user.last_initial}</span>
                        }
                    </div>
                    {role.role === 'company' &&
                        <div className="favorit-star">
                            <img className={`${isActive ? 'active' : ''}`}
                                onClick={this.favorites.bind(this, user.id)}
                                src="../img/star-noncolor.png" alt=""
                            />
                        </div>


                    }
                    <div className="middle">
                        <span>{user.first_name} {user.last_name}</span>
                        <span className="role" >{user.email}</span>
                        {/* <span className="role" >{user.id}</span> */}
                        <div className={`middle-buttons`}>
                            <div id={user.id} className={'download-img'}>
                                <div className="testgrid">
                                    <div className="mytooltip">
                                        <p className="tooltiptext">Download CV</p>
                                    </div>
                                    <img onClick={this.dropdownClick} src="../img/download-button.png" alt="" />
                                </div>
                                <div className={`dropdown ${dropActive ? 'open' : ''}`} style={{
                                    top: x + '%', left: y + '%', transform: 'translate(30%, 50%)'
                                }}>
                                    <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf/${user.username}/1`}>Europass</a>
                                    <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf/${user.username}/2`}>Creative</a>
                                    <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf/${user.username}/3`}>Chronological</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <Link to={`/user-profile/${user.username}`}>View Profile</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GridComponent;