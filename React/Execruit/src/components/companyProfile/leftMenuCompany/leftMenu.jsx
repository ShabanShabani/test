import React from 'react';
import Joi from 'joi-browser';
import Form from '../../../all/common/form';
import * as toast from '../../../all/toast';
import companyService from '../../../services/companyService';
import authService from '../../../services/authService'
import profileService from '../../../services/profileService';

const currentCompany = authService.getCurrentUser();

class LeftCompany extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            profile_pic: [],
            show: '',
            errors: {},
            numPages: null,
            pageNumber: 1,
            toggleActive: false,
            follow: {
                favorite: '',
                isActive: false
            }
        }
    }

    schema = {
        profile_pic: Joi.array(),
    }

    componentDidMount() {
        if (currentCompany.role === 'user') {
            profileService.getFavoritesUser().then(({ data: response }) => {
                this.setState({
                    follow: [].concat(response)
                })
            })
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.data
        })
    }

    autoUpload = ({ currentTarget: input }) => {
        if (input.value[0].type.split('/').includes('image')) {
            this.state.request = false
            const { data } = this.state;
            companyService.autoUpload(input.value[0]).then(({ data: response }) => {
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

    toggleClass = () => {
        this.setState({
            toggleActive: !this.state.toggleActive
        })
    }


    handleDelete = (user) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
        }
    };

    render() {
        const { data, toggleActive } = this.state;
        const { name, email, profile_picture, location, phone_number, address } = data;
        let initials = '';
        if (name) {
            initials = name.split('', 2);
        }
        return (
            <React.Fragment>
                <div className={`left-part company-left-part`}>
                    <div className="profile-pricture">
                        {profile_picture &&
                            <img className="profileImg" src={`${profile_picture}`} alt="" />
                        }
                        {!profile_picture &&
                            <span className="initial">{initials}</span>
                        }
                        {currentCompany.email === email &&
                            <form>
                                {this.renderUploadInput("profile_pic", null, this.state.profile_pic, 'image', this.autoUpload, this.state.errors.profile_pic, true, 1, true, "If you want to update image, just upload another one up to 10MB")}
                            </form>
                        }
                    </div>
                    <span className="username">{name}</span>
                    {/* {isActive ?
                        <span className={``} onClick={this.favorites}>Unfollow</span>
                        :
                        <span className={``} onClick={this.favorites}>Follow</span>
                    } */}
                    {/* <div className="social">
                        {social_links.map((element, index) =>
                            <div key={index} className="social-img">
                                <div className="">
                                    <a href={`${element.social_link}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`${element.social_image}`} alt={element.value} />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div> */}
                    <div className={`more-details ${toggleActive ? 'active' : ''}`}>
                        <div onClick={this.toggleClass} className="details-part-title">
                            <h6><img src="../img/line-menu.svg" alt="" />More Details</h6>
                        </div>
                        <div className="details-part">
                            <ul className="left-list">
                                <li>Contact:</li>
                                <li>Address:</li>
                                <li>Email:</li>
                                <li>Locations:</li>
                            </ul>
                            <ul className="right-list">
                                <li>{phone_number}</li>
                                <li>{address}</li>
                                <li>{email}</li>
                                <li>{location}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LeftCompany;