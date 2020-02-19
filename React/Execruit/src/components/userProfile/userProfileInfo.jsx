import React from 'react';
import authService from '../../services/authService';
import profileService from '../../services/profileService';
import aboutYouService from '../../services/aboutYouService';
import * as toast from '../../all/toast';
import Joi from 'joi-browser';
import Form from '../../all/common/form';
import smoothscroll from 'smoothscroll-polyfill';
import Notes from '../companyProfile/notes';
import noteService from "../../services/noteService";

const { REACT_APP_WEB_API_URL: web_api_url } = process.env;
const role = authService.getCurrentUser();

class UserProfileInfo extends Form {
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
                social_links: []
            },
            favorites: [],
            profile_pic: [],
            show: '',
            errors: {},
            toggleUser: 'profile',
            personal_info: {
                userId: '',
                section: '',
                notes: ''
            },
            prof_summary: {
                userId: '',
                section: '',
                notes: ''
            },
            emp_history: {
                userId: '',
                section: '',
                notes: ''
            },
            edu_history: {
                userId: '',
                section: '',
                notes: ''
            },
            intern_history: {
                userId: '',
                section: '',
                notes: ''
            },
            skills1: {
                userId: '',
                section: '',
                notes: ''
            },
            language1: {
                userId: '',
                section: '',
                notes: ''
            },
            references: {
                userId: '',
                section: '',
                notes: ''
            },
            additional: {
                userId: '',
                section: '',
                notes: ''
            },
            driving: {
                userId: '',
                section: '',
                notes: ''
            }
        }
    }
    schema = {
        profiel_pic: Joi.array(),
    }
    componentDidMount() {
        let { data, personal_info, prof_summary, emp_history, edu_history, intern_history, skills1, language1, references, additional, driving } = this.state;
        const user = authService.getCurrentUser();
        profileService.getUserEdit(this.props.id).then(({ data: response }) => {
            data.id = response.id;
            data.username = response.username;
            data.firstInitial = response.first_initial;
            data.lastInitial = response.last_initial;
            data.firstName = response.first_name;
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
                data,
                show: user.id === this.props.id
            })
            if (role.role === 'company') {
                noteService.getNotes(data.id).then(({ data: response }) => {
                    if (response.personal_info) {
                        personal_info = response.personal_info
                    }
                    if (response.prof_summary) {
                        prof_summary = response.prof_summary
                    }
                    if (response.emp_history) {
                        emp_history = response.emp_history
                    }
                    if (response.edu_history) {
                        edu_history = response.edu_history
                    }
                    if (response.intern_history) {
                        intern_history = response.intern_history
                    }
                    if (response.skills) {
                        skills1 = response.skills
                    }
                    if (response.language) {
                        language1 = response.language
                    }
                    if (response.references) {
                        references = response.references
                    }
                    if (response.additional) {
                        additional = response.additional
                    }
                    if (response.driving) {
                        driving = response.driving
                    }
                    this.setState({
                        personal_info,
                        prof_summary,
                        emp_history,
                        edu_history,
                        intern_history,
                        skills1,
                        language1,
                        references,
                        additional,
                        driving
                    })
                })
            }
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                this.props.history.push('/user-profile')
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
                    this.props.history.push('/user-profile')
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


    render() {
        const { data, dropActive, personal_info, prof_summary, emp_history, edu_history, intern_history, skills1, language1, references, additional, driving } = this.state;
        const { id, username, firstInitial, lastInitial, firstName, lastName, email, birthday, phoneNumber, profile_picture, country, city, address, postal_code, experience_description,
            employment_history, education_history, internship, skills, language, reference, custom, social_links, driving_licenses } = data;
        return (
            <React.Fragment>
                <div className={`main-information`}>
                    <div className={`left-part`}>
                        <div className="exportpdf">
                            <div className="test">
                                <div className={`nav-menu`}>
                                    <div onClick={this.dropdownClick} className={`navmenu-button`}>
                                        <span>Export CV</span>
                                    </div>
                                </div>
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
                        </div>
                        <span className="username">{firstName} {lastName}</span>
                        {/* <a className="copyEmail" href={email}>Send Email</a> */}
                        <div className="social">
                            {social_links.map((element, index) =>
                                <div key={index} className="social-img">
                                    <div className="">
                                        <a href={`https://${element.social_link}`} target="_blank" rel="noopener noreferrer">
                                            <img src={`${element.social_image}`} alt={element.value} />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`right-part right-wrapper`}>
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
                                {role.role === 'company' &&
                                    <Notes
                                        userId={id}
                                        section={'PersonalInfo'}
                                        getNotes={personal_info}
                                    />
                                }
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
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'ProfSummary'}
                                            getNotes={prof_summary}
                                        />
                                    }
                                </div>
                            }
                            {!!employment_history.length &&
                                <div className={`user-boxes-inside`} id="employmentHistory">

                                    <span className="info-title">Employment History</span>
                                    {
                                        employment_history.map(employment =>
                                            <div key={employment.id} className="information">

                                                <div className="info-inside">
                                                    <p>Job Title</p>
                                                    <span>{employment.job_title}</span>
                                                </div>
                                                {employment.employer_name &&
                                                    <div className="info-inside">
                                                        <p>Employer</p>
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
                                                        <span>{employment.start_month} {employment.start_year} </span>
                                                        {/* <span> {employment.start_year}</span> */}
                                                    </div>
                                                }
                                                {!employment.end_month &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Present</span>
                                                    </div>
                                                }
                                                {employment.end_month && employment.end_year !== "None" &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>{employment.end_month} {employment.end_year}</span>
                                                        {/* <span> {employment.end_year}</span> */}
                                                    </div>
                                                }
                                                {employment.job_description &&
                                                    <div className="info-inside">
                                                        <p>Main Duties</p>
                                                        <span>{employment.job_description}</span>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'EmpHistory'}
                                            getNotes={emp_history}
                                        />
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
                                                {!!education.major &&
                                                    <div className="info-inside">
                                                        <p>Major</p>
                                                        <span>{education.major}</span>
                                                    </div>
                                                }
                                                {!!education.start_month && education.start_month !== "None" &&
                                                    <div className="info-inside">
                                                        <p>From</p>
                                                        <span>{education.start_month} {education.start_year}</span>
                                                    </div>
                                                }
                                                {!education.end_month &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Present</span>
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
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'EduHistory'}
                                            getNotes={edu_history}
                                        />
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
                                                {!internship.end_month &&
                                                    <div className="info-inside">
                                                        <p>To</p>
                                                        <span>Present</span>
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
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'InternHistory'}
                                            getNotes={intern_history}
                                        />
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
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'Language'}
                                            getNotes={language1}
                                        />
                                    }
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
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'Skills'}
                                            getNotes={skills1}
                                        />
                                    }
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
                                                        <p>Referents Email</p>
                                                        <span>{references.email}</span>
                                                    </div>
                                                }
                                                {references.file &&
                                                    <div className="info-inside">
                                                        <p>Reference File</p>
                                                        <a target="_blank" rel="noopener noreferrer" href={references.file}>File (click to view)</a>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'References'}
                                            getNotes={references}
                                        />
                                    }
                                </div>
                            }
                            {!!custom.length &&
                                <div className={`user-boxes-inside`} id="custom">

                                    <span className="info-title">Additional Information</span>
                                    {
                                        custom.map(customs =>
                                            <div key={customs.id} className="information">
                                                {!!customs.custom_options &&
                                                    <div className="info-inside">
                                                        <p>Options</p>
                                                        <span>{customs.custom_options}</span>
                                                    </div>
                                                }
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
                                                {!customs.end_month &&
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
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'Additional'}
                                            getNotes={additional}
                                        />
                                    }
                                </div>
                            }
                            {!!driving_licenses.length &&
                                <div className={`user-boxes-inside`} id="drivingLicenses">

                                    <span className="info-title">Driving License</span>
                                    <div className="information">
                                        <div className="info-inside">
                                            {
                                                driving_licenses.map(licence =>
                                                    <div className="skills-box" key={licence.id}>
                                                        <p >{licence.text} </p><br />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {role.role === 'company' &&
                                        <Notes
                                            userId={id}
                                            section={'Driving'}
                                            getNotes={driving}
                                        />
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
export default UserProfileInfo;