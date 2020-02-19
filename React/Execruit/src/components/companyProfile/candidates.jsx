import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileService from '../../services/profileService';
import * as toast from "../../all/toast";

class MyCandidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '',
            favorite: '',
            isActive: false,
        };
        this.state.data = this.props.users;
    }

    favorites = () => {
        const { favorite } = this.state;
        profileService.postFavoriteUser(favorite).then(({ response }) => {
            this.setState({
                loading: false,
                isActive: !this.state.isActive
            });
            toast.success("Successfully Favoritet User.");
        })
            .catch(err => {
                this.setState({
                    loading: false
                });
                toast.error("Something went wrong. Please try again");
            });
    };

    render() {
        return (
            <React.Fragment>
                <div className={`grid on`}>
                    <div className={`user-grid`}>
                        <div className="top">
                            <img src="../img/img123.jpeg" alt="" />
                        </div>
                        <div className="favorit-star">
                            <img src="../img/star-noncolor.png" alt="" />
                        </div>
                        <div className="middle">
                            <span>Filan Fisteku</span>
                            <span className="role" >arben@mehmeti.gmail</span>
                            <div className={`middle-buttons`}>
                                <div className={'delete-img'}>
                                    <img src="../img/delete1.png" alt="" />
                                </div>
                                <div className={'download-img'}>
                                    <img src="../img/download-button.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <Link>View Profile</Link>
                        </div>
                    </div>
                    <div className={`user-grid`}>
                        <div className="top">
                            <img src="../img/imageimage.jpeg" alt="" />
                        </div>
                        <div className="favorit-star">
                            <img src="../img/star-noncolor.png" alt="" />
                        </div>
                        <div className="middle">
                            <span>Filan Fisteku</span>
                            <span className="role" >arben@mehmeti.gmail</span>
                            <div className={`middle-buttons`}>
                                <div className={'delete-img'}>
                                    <img src="../img/delete1.png" alt="" />
                                </div>
                                <div className={'download-img'}>
                                    <img src="../img/download-button.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <Link>View Profile</Link>
                        </div>
                    </div>
                    <div className={`user-grid`}>
                        <div className="top">
                            <img src="../img/djali.jpeg" alt="" />
                        </div>
                        <div className="favorit-star">
                            <img src="../img/star-noncolor.png" alt="" />
                        </div>
                        <div className="middle">
                            <span>Filan Fisteku</span>
                            <span className="role" >arben@mehmeti.gmail</span>
                            <div className={`middle-buttons`}>
                                <div className={'delete-img'}>
                                    <img src="../img/delete1.png" alt="" />
                                </div>
                                <div className={'download-img'}>
                                    <img src="../img/download-button.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <Link>View Profile</Link>
                        </div>
                    </div>
                    <div className={`user-grid`}>
                        <div className="top">
                            <img src="../img/vajza1.jpeg" alt="" />
                        </div>
                        <div className="favorit-star">
                            <img src="../img/star-noncolor.png" alt="" />
                        </div>
                        <div className="middle">
                            <span>Filan Fisteku</span>
                            <span className="role" >arben@mehmeti.gmail</span>
                            <div className={`middle-buttons`}>
                                <div className={'delete-img'}>
                                    <img src="../img/delete1.png" alt="" />
                                </div>
                                <div className={'download-img'}>
                                    <img src="../img/download-button.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <Link>View Profile</Link>
                        </div>
                    </div>
                    <div className={`user-grid`}>
                        <div className="top">
                            <img src="../img/djali.jpeg" alt="" />
                        </div>
                        <div className="favorit-star">
                            <img src="../img/star-noncolor.png" alt="" />
                        </div>
                        <div className="middle">
                            <span>Filan Fisteku</span>
                            <span className="role" >arben@mehmeti.gmail</span>
                            <div className={`middle-buttons`}>
                                <div className={'delete-img'}>
                                    <img src="../img/delete1.png" alt="" />
                                </div>
                                <div className={'download-img'}>
                                    <img src="../img/download-button.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <Link>View Profile</Link>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MyCandidates;