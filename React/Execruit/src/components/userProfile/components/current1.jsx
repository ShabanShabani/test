import React from 'react';
import { Link } from 'react-router-dom';
import profileService from '../../services/profileService';
import aboutYouService from '../../services/aboutYouService';
import * as toast from '../../all/toast';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import smoothscroll from 'smoothscroll-polyfill';
import EditCompopnentProfile from './edit';

class CurrentUserProfileInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                profile_picture: '',
                country: '',
                city: '',
                major: '',
                employment_history: [],
                education_history: [],
                internship: [],
                skills: [],
                language: [],
                reference: [],
                custom: [],
                social_links: [],
            },
            profile_pic: [],
            show: '',
            errors: {},
            editTab: '',
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
            data.major = response.major;
            data.address = response.address;
            data.postal_code = response.postal_code;
            data.experience_description = response.experience_description;
            data.employment_history = response.employment_history;
            data.education_history = response.education_history;
            data.internship = response.internship;
            data.language = response.language;
            data.reference = response.reference;
            data.skills = response.skills;
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

    render() {

        const { data } = this.state;
        const { firstName, lastName, email, birthday, phoneNumber, profile_picture, country, city, address, postal_code, experience_description,
            employment_history, education_history, internship, skills, language, reference, custom, social_links } = data;

        return (
            <React.Fragment>
                {/* <div className="nav-box" onClick={this.handler} onKeyDown={this.handler} >
                        <div className="nav-box-wrapper">
                            <a onClick={this.onScroll} href="#personalInformation">
                                <div className="img1"></div>
                                <span>Personal Information</span>
                            </a>
                        </div>
                        {!!experience_description &&
                            <div className="nav-box-wrapper">
                                <a href="#professionalSummary">
                                    <div className="img1"></div>
                                    <span>Professional Summary</span>
                                </a>
                            </div>
                        }
                        {!!employment_history.length &&
                            <div className="nav-box-wrapper">
                                <a href="#employmentHistory">
                                    <div className="img1"></div>
                                    <span>Employment History</span>
                                </a>
                            </div>
                        }
                        {!!education_history.length &&
                            <div className="nav-box-wrapper">
                                <a href="#education">
                                    <div className="img1"></div>
                                    <span>Education</span>
                                </a>
                            </div>
                        }
                        {!!internship.length &&
                            <div className="nav-box-wrapper">
                                <a href="#internships">
                                    <div className="img1"></div>
                                    <span>Internships</span>
                                </a>
                            </div>
                        }
                        {!!language.length &&
                            <div className="nav-box-wrapper">
                                <a href="#languages">
                                    <div className="img1"></div>
                                    <span>Languages</span>
                                </a>
                            </div>
                        }
                        {!!skills.length &&
                            <div className="nav-box-wrapper">
                                <a href="#skills">
                                    <div className="img1"></div>
                                    <span>Skills</span>
                                </a>
                            </div>
                        }
                        {!!reference.length &&
                            <div className="nav-box-wrapper">
                                <a href="#references">
                                    <div className="img1"></div>
                                    <span>References</span>
                                </a>
                            </div>
                        }
                        {!!custom.length &&
                            <div className="nav-box-wrapper">
                                <a href="#custom">
                                    <div className="img1"></div>
                                    <span>Additional Information</span>
                                </a>
                            </div>
                        }
                    </div> */}
                <div className={`main-information`}>
                    <div className={`left-part`}>
                        <div className="profile-pricture">
                            <img className="profileImg" src={`${profile_picture}`} alt="" />
                            <form>
                                {this.renderUploadInput("profile_pic", null, this.state.profile_pic, 'image', this.autoUpload, this.state.errors.profile_pic, true, 1, true, "If you want to update image, just upload another one up to 10MB")}
                            </form>
                        </div>
                        <span className="username">{firstName} {lastName}</span>
                        <Link className="copyEmail" to={email}>Send Email</Link>
                        <div className="social">
                            {social_links.map((element, index) =>
                                <div key={index} className="social-img">
                                    <div className="">
                                        <a href={`${element.social_link}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`${element.social_image}`} alt={element.value} />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={`edit-button active `}>
                            <Link to={`/edit-user-profile`}>
                                <img src="../img/pen.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={`right-part`}>
                        <div className="user-boxes-wrapper">
                            <div className={`user-boxes-inside`} id="personalInformation">
                                <span className="info-title">Personal Information</span>
                                <div className="information">
                                    {firstName && lastName &&
                                        <div className="info-inside">
                                            <p>Full Name</p>
                                            <span>{firstName} {lastName}</span>
                                        </div>
                                    }
                                    {phoneNumber &&
                                        <div className="info-inside">
                                            <p>Phone Number</p>
                                            <span>{phoneNumber}</span>
                                        </div>
                                    }
                                    {email &&
                                        <div className="info-inside">
                                            <p>Email</p>
                                            <span>{email}</span>
                                        </div>
                                    }
                                    {birthday && birthday !== "None" &&
                                        <div className="info-inside">
                                            <p>Date of Birth</p>
                                            <span>{birthday}</span>
                                        </div>
                                    }
                                    {address && city && country && postal_code &&
                                        <div className="info-inside">
                                            <p>Loaction</p>
                                            <span>{address}, <br /> {city} ({country}), <br /> {postal_code} </span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {!!experience_description &&
                                <div className={`user-boxes-inside`} id="professionalSummary">
                                    <span className="info-title">Professional Summary</span>
                                    <div className="information">
                                        <div className="info-inside">
                                            {/* <p>Professional Summary</p> */}
                                            <span>{experience_description}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!!employment_history.length &&
                                <div className={`user-boxes-inside`} id="employmentHistory">
                                    <span className="info-title">Emplyment History</span>
                                    {
                                        employment_history.map(employment =>
                                            <div key={employment.id} className="information">
                                                <div className="info-inside">
                                                    <p>Job Title</p>
                                                    <span>{employment.job_title}</span>
                                                </div>
                                                {employment.employer_name &&
                                                    <div className="info-inside">
                                                        <p>Emplyer</p>
                                                        <span>{employment.employer_name}</span>
                                                    </div>
                                                }
                                                {employment.job_city &&
                                                    <div className="info-inside">
                                                        <p>City</p>
                                                        <span>{employment.job_city}</span>
                                                    </div>
                                                }

                                                {employment.start_month && employment.start_year !== "None" &&
                                                    <div className="info-inside">
                                                        <p>From</p>
                                                        <span>{employment.start_month}</span>
                                                        <span>{employment.start_year}</span>
                                                    </div>
                                                }
                                                {employment.end_month && employment.end_year === "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Present</span>
                                                    </div>
                                                }
                                                {employment.end_month && employment.end_year !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>{employment.end_month}</span>
                                                        <span>{employment.end_year}</span>
                                                    </div>
                                                }




                                                {/* {employment.star_date && employment.star_date !== "None" &&
                                                    <div className="info-inside">
                                                        <p>From</p>
                                                        <span>{employment.star_date}</span>
                                                    </div>
                                                }
                                                {employment.end_date === "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Present</span>
                                                    </div>
                                                }
                                                {employment.end_date && employment.end_date !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>{employment.end_date}</span>
                                                    </div>
                                                } */}
                                                {employment.job_description &&
                                                    <div className="info-inside">
                                                        <p>Main Duties</p>
                                                        <span>{employment.job_description}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            {!!education_history.length &&
                                <div className={`user-boxes-inside`} id="education">
                                    <span className="info-title">Education</span>
                                    {
                                        education_history.map(education =>
                                            <div key={education.id} className="information">
                                                {!!education.school_name &&
                                                    <div className="info-inside">
                                                        <p>School Name</p>
                                                        <span>{education.school_name}</span>
                                                    </div>
                                                }
                                                {!!education.degree &&
                                                    <div className="info-inside">
                                                        <p>Degree</p>
                                                        <span>{education.degree}</span>
                                                    </div>
                                                }
                                                {!!education.start_month && education.start_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>From</p>
                                                        <span>{education.start_month} {education.start_year}</span>
                                                    </div>
                                                }
                                                {education.end_month === "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Ongoing</span>
                                                    </div>
                                                }
                                                {!!education.end_month && education.end_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>{education.end_month} {education.end_year}</span>
                                                    </div>
                                                }
                                                {!!education.city &&
                                                    <div className="info-inside">
                                                        <p>City</p>
                                                        <span>{education.city}</span>
                                                    </div>
                                                }
                                                {!!education.country &&
                                                    <div className="info-inside">
                                                        <p>Country</p>
                                                        <span>{education.country}</span>
                                                    </div>
                                                }
                                                {!!education.description &&
                                                    <div className="info-inside">
                                                        <p>Description</p>
                                                        <span>{education.description}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            {!!internship.length &&

                                <div className={`user-boxes-inside`} id="internships">
                                    <span className="info-title">Internships</span>
                                    {
                                        internship.map(internship =>
                                            <div key={internship.id} className="information">
                                                {!!internship.title &&
                                                    <div className="info-inside">
                                                        <p>Title</p>
                                                        <span>{internship.title}</span>
                                                    </div>
                                                }
                                                {!!internship.organisation &&
                                                    <div className="info-inside">
                                                        <p>Organisation</p>
                                                        <span>{internship.organisation}</span>
                                                    </div>
                                                }
                                                {!!internship.start_month && internship.start_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>From</p>
                                                        <span>{internship.start_month} {internship.start_year}</span>
                                                    </div>
                                                }
                                                {!!internship.end_month === "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Ongoing</span>
                                                    </div>
                                                }
                                                {!!internship.end_month && internship.end_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>{internship.end_month} {internship.end_year}</span>
                                                    </div>
                                                }
                                                {!!internship.city &&
                                                    <div className="info-inside">
                                                        <p>City</p>
                                                        <span>{internship.city}</span>
                                                    </div>
                                                }
                                                {!!internship.country &&
                                                    <div className="info-inside">
                                                        <p>Country</p>
                                                        <span>{internship.country}</span>
                                                    </div>
                                                }
                                                {!!internship.description &&
                                                    <div className="info-inside">
                                                        <p>Description</p>
                                                        <span>{internship.description}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            {!!language.length &&
                                <div className={`user-boxes-inside`} id="languages">
                                    <span className="info-title">Languages</span>
                                    <div className="information">
                                        <div className="info-inside lang">
                                            <div className="language-section">
                                                {
                                                    language.map(languages =>
                                                        <div key={languages.id} className="language-box">
                                                            <p>{languages.language}{" | " + languages.level}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!!skills.length &&
                                <div className={`user-boxes-inside`} id="skills">
                                    <span className="info-title">Skills</span>
                                    <div className="information">
                                        <div className="info-inside">
                                            {
                                                skills.map(skill =>
                                                    <div className="skills-box" key={skill.id}>
                                                        <p >{skill.text} </p><br />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {!!reference.length &&
                                <div className={`user-boxes-inside`} id="references">
                                    <span className="info-title">References</span>
                                    {
                                        reference.map(references =>
                                            <div key={references.id} className="information">
                                                {references.full_name &&
                                                    <div className="info-inside">
                                                        <p>Referent's Full Name</p>
                                                        <span>{references.full_name}</span>
                                                    </div>
                                                }
                                                {references.organisation &&
                                                    <div className="info-inside">
                                                        <p>Organisation</p>
                                                        <span>{references.organisation}</span>
                                                    </div>
                                                }
                                                {references.phone &&
                                                    <div className="info-inside">
                                                        <p>Phone Number</p>
                                                        <span>{references.phone}</span>
                                                    </div>
                                                }
                                                {references.email &&
                                                    <div className="info-inside">
                                                        <p>Email</p>
                                                        <span>{references.email}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            {!!custom.length &&
                                <div className={`user-boxes-inside`} id="custom">
                                    <span className="info-title">Additional Information</span>
                                    {
                                        custom.map(customs =>
                                            <div key={customs.id} className="information">
                                                {!!customs.activity_name &&
                                                    <div className="info-inside">
                                                        <p>Activity Name</p>
                                                        <span>{customs.activity_name}</span>
                                                    </div>
                                                }
                                                {!!customs.city &&
                                                    <div className="info-inside">
                                                        <p>City</p>
                                                        <span>{customs.city}</span>
                                                    </div>
                                                }
                                                {!!customs.start_month && customs.start_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>From</p>
                                                        <span>{customs.start_month} {customs.start_year}</span>
                                                    </div>
                                                }
                                                {!!customs.end_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Present</span>
                                                    </div>
                                                }
                                                {!!customs.end_month && customs.end_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>{customs.end_month} {customs.end_year}</span>
                                                    </div>
                                                }
                                                {!!customs.description &&
                                                    <div className="info-inside">
                                                        <p>Description</p>

                                                        <span>{customs.description}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default CurrentUserProfileInfo;