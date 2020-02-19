import React from 'react';
import { Link } from 'react-router-dom';
import profileService from '../../services/profileService';
import aboutYouService from '../../services/aboutYouService';
import * as toast from '../../all/toast';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import smoothscroll from 'smoothscroll-polyfill';
import NavMenuProfileinfo from './NavMenuProfileinfo';
import BoxWrapper from './userboxwrapper'
import GridCompany from '../companyProfile/assets/gridCompany'

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;

class CurrentUserProfileInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            dropActive: false,
            data: {
                id: '',
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                profile_picture: '',
                country: '',
                city: '',
                employment_history: [],
                education_history: [],
                internship: [],
                skills: [],
                driving_licenses: [],
                language: [],
                reference: [],
                custom: [],
                social_links: [],
            },
            profile_pic: [],
            show: '',
            errors: {},
            editTab: '',
            toggleUser: '',
            favorites: [],
            toggleUserTab: 'profile'
        }
        this.toggleEditTab = this.toggleEditTab.bind(this.currentTab);
    }
    schema = {
        profiel_pic: Joi.array(),
    }
    componentDidMount() {
        const { data } = this.state;
        profileService.getCurrentUser().then(({ data: response }) => {
            data.id = response.id;
            data.username = response.username;
            data.firstName = response.first_name;
            data.firstInitial = response.first_initial;
            data.lastInitial = response.last_initial;
            data.email = response.email;
            data.birthday = response.birthday;
            data.lastName = response.last_name;
            data.phoneNumber = response.phone_number;
            data.profile_picture = response.profile_picture;
            data.country = response.country;
            data.city = response.city;
            data.address = response.address;
            data.postal_code = response.postal_code;
            data.experience_description = response.experience_description;
            data.employment_history = response.employment_history;
            data.education_history = response.education_history;
            data.internship = response.internship;
            data.language = response.language;
            data.reference = response.reference;
            data.skills = response.skills;
            data.driving_licenses = response.driving_licenses;
            data.custom = response.custom;
            data.social_links = response.social_links;
            this.setState({
                data
            })
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                this.props.history.push('/profile')
            }
            toast.error('Something went wrong. Please refresh the page.')
        })

        profileService.getFavoriteCompanies().then(({ data: response }) => {
            this.setState({
                favorites: [].concat(response)
            })
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                this.props.history.push('/profile')
            }
            toast.error('Something went wrong. Please refresh the page.')
        })
    }

    autoUpload = ({ currentTarget: input }) => {
        if (input.value[0].type.split('/').includes('image')) {
            this.state.request = false
            const { data } = this.state;
            aboutYouService.autoUpload(input.value[0]).then(({ data: response }) => {
                data.profile_picture = response.profile_picture;
                this.setState({
                    data,
                })
            }).catch(err => {
                if (err.response && err.response.status === 400) {
                    this.props.history.push('/profile')
                }
                toast.error('Something went wrong. Please refresh the page.')
            })
        }
        else {
            toast.error('Invalid file');
        }
    }

    onScroll = () => {
        smoothscroll.polyfill();
        window.scrollTo({ behavior: 'smooth' });
    }

    toggleEditTab = tab => {
        if (this.state.editTab === tab) {
            this.setState({
                editTab: ''
            });
        } else {
            this.setState({
                editTab: 'tab'
            });
        }
    };

    dropdownClick = () => {
        this.setState({
            dropActive: !this.state.dropActive
        })
    }

    toggleUserProfile = (toggleUser) => {
        this.setState({
            toggleUser: toggleUser
        })
    }

    toggleUserProfileTab = (toggleUserTab) => {
        this.setState({
            toggleUserTab: toggleUserTab
        })
    }

    render() {
        const { data, dropActive, favorites, toggleUserTab } = this.state;
        const { username, firstInitial, lastInitial, firstName, lastName,  profile_picture, social_links } = data;
        return (
            <React.Fragment>
                <div className={`main-information`}>
                    <div className={`left-part`}>
                        <div className="exportpdf">
                            <div className="pen-tooltip">
                                <div className="mytooltip">
                                    <span className="tooltiptext">Edit Profile</span>
                                </div>
                                <Link to={`/edit-user-profile`}>
                                    <img className={`pen`} src="../img/pen.png" alt="" />
                                </Link>
                            </div>
                            <div className="test">
                                {/* <div className="mytooltip">
                                    <span className="tooltiptext">Export CV</span>
                                </div> */}
                                <div className={`nav-menu`}>
                                    <div onClick={this.dropdownClick} className={`navmenu-button`}>
                                        <span>Export CV</span>
                                    </div>
                                </div>
                                {/* <img className={`export-img`} onClick={this.dropdownClick} src="../img/export1.png" alt="" /> */}
                            </div>
                            <div className={`dropdown ${dropActive ? 'open' : ''}`}>
                                <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf-open/${username}/1`}>Europass</a>
                                <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf-open/${username}/2`}>Creative</a>
                                <a target="_blank" rel="noopener noreferrer" href={`${web_api_url}/pdf-open/${username}/3`}>Chronological</a>
                            </div>
                        </div>
                        <div className="profile-pricture">
                            {profile_picture &&
                                <img className="profileImg" src={`${profile_picture}`} alt="" />
                            }
                            {!profile_picture &&
                                <span className="initial">{firstInitial} {lastInitial}</span>
                            }
                            <form>
                                {this.renderUploadInput("profile_pic", null, this.state.profile_pic, 'image', this.autoUpload, this.state.errors.profile_pic, true, 1, true, "If you want to update image, just upload another one up to 10MB")}
                            </form>
                        </div>
                        <span className="username">{firstName} {lastName}</span>
                        {/* <a className="copyEmail" href={email}>Send Email</a> */}
                        <div className="social">
                            {social_links.map((element, index) =>
                                <div key={index} className="social-img">
                                    <div className="">
                                        {/* <a href={`${element.social_link}`} rel={'external'} target="_blank" rel="noopener noreferrer">
                                            <img src={`${element.social_image}`} alt={element.value} />
                                        </a> */}
                                        <a href={`https://${element.social_link}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`${element.social_image}`} alt={element.value} />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`right-part current-user-profile-info`}>
                        <NavMenuProfileinfo
                            toggleUserProfileTab={this.toggleUserProfileTab}
                            toggleUserTab={toggleUserTab}
                        />
                        <div className={`box-wrapper ${toggleUserTab === 'profile' ? '' : 'displayNone'}`}>
                            <BoxWrapper
                                data={data}
                            />
                        </div>
                        <div className={`favorite-grid ${toggleUserTab === 'favorites' ? '' : 'displayNone'}`}>
                            <div className={`grid`}>
                                {favorites.length === 0 ?
                                    <span className="notFound" >No favorite companies found!</span>
                                    :
                                    <GridCompany
                                        selectedPage="favorites"
                                        users={favorites}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default CurrentUserProfileInfo; 