import React, { Component } from 'react'

class BoxWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { data } = this.props;
        let date_birthday =''
        if(data.birthday && data.birthday !== "None")
        {
            let options = {day:'numeric', month: 'short', year: 'numeric'}
            let today_date = data.birthday;
            date_birthday = today_date.toLocaleString('en-GB', options);
        }
        return (
            <div className="user-boxes-wrapper">
                <div className={`user-boxes-inside`} id="personalInformation">
                    <div className={`edit-button active `}>
                        {/* <EditCompopnentProfile
                            toggleEditTab={this.toggleEditTab}
                            editTab={this.editTab}
                            tab="aboutYou"
                        /> */}
                    </div>
                    <span className="info-title">Personal Information</span>
                    <div className="information">
                        {data.firstName && data.lastName &&
                            <div className="info-inside">
                                <p>Full Name</p>
                                <span>{data.firstName} {data.lastName}</span>
                            </div>
                        }
                        {data.phoneNumber &&
                            <div className="info-inside">
                                <p>Phone Number</p>
                                <span>{data.phoneNumber}</span>
                            </div>
                        }
                        {data.email &&
                            <div className="info-inside">
                                <p>Email</p>
                                <span>{data.email}</span>
                            </div>
                        }
                        {data.birthday && data.birthday !== "None" &&
                            <div className="info-inside">
                                <p>Date of Birth</p>
                                <span>{date_birthday}</span>
                            </div>
                        }
                        {data.address && data.city && data.country && data.postal_code &&
                            <div className="info-inside">
                                <p>Loaction</p>
                                <span>{data.address}, <br /> {data.city} ({data.country}), <br /> {data.postal_code} </span>
                            </div>
                        }
                    </div>
                </div>
                {!!data.experience_description &&
                    <div className={`user-boxes-inside`} id="professionalSummary">

                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="profOver"
                                        /> */}
                        </div>
                        <span className="info-title">Professional Summary</span>
                        <div className="information">
                            <div className="info-inside">
                                {/* <p>Professional Summary</p> */}
                                <span>{data.experience_description}</span>
                            </div>
                        </div>
                    </div>
                }
                {!!data.employment_history.length &&
                    <div className={`user-boxes-inside`} id="employmentHistory">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="empHistory"
                                        /> */}
                        </div>
                        <span className="info-title">Employment History</span>
                        {
                            data.employment_history.map(employment =>
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
                                    {employment.start_month && employment.start_month !== "None" &&
                                        <div className="info-inside">
                                            <p>From </p>
                                            <span>{employment.start_month}   {employment.start_year}</span>
                                            {/* <span> {employment.start_year}</span> */}
                                        </div>
                                    }

                                    {!employment.end_month &&
                                        <div className="info-inside">
                                            <p>To </p>
                                            <span>Present</span>
                                        </div>
                                    }
                                    {employment.end_month && employment.end_month !== "None" &&
                                        <div className="info-inside">
                                            <p>To </p>
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
                    </div>
                }
                {!!data.education_history.length &&
                    <div className={`user-boxes-inside`} id="education">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="education"
                                        /> */}
                        </div>
                        <span className="info-title">Education</span>
                        {
                            data.education_history.map(education =>
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
                    </div>
                }
                {!!data.internship.length &&
                    <div className={`user-boxes-inside`} id="internships">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="internship"
                                        /> */}
                        </div>
                        <span className="info-title">Internships</span>
                        {
                            data.internship.map(internship =>
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
                    </div>
                }
                {!!data.language.length &&
                    <div className={`user-boxes-inside`} id="languages">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="language"
                                        /> */}
                        </div>
                        <span className="info-title">Languages</span>
                        <div className="information">
                            <div className="info-inside lang">
                                <div className="language-section">
                                    {
                                        data.language.map(languages =>
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
                {!!data.skills.length &&
                    <div className={`user-boxes-inside`} id="skills">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="skills"
                                        /> */}
                        </div>
                        <span className="info-title">Skills</span>
                        <div className="information">
                            <div className="info-inside">
                                {
                                    data.skills.map(skill =>
                                        <div className="skills-box" key={skill.id}>
                                            <p >{skill.text} </p><br />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
                {!!data.reference.length &&
                    <div className={`user-boxes-inside`} id="references">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="reference"
                                        /> */}
                        </div>
                        <span className="info-title">References</span>
                        {
                            data.reference.map(references =>
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
                    </div>
                }
                {!!data.custom.length &&
                    <div className={`user-boxes-inside`} id="custom">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="customsection"
                                        /> */}
                        </div>
                        <span className="info-title">Additional Information</span>
                        {
                            data.custom.map(customs =>
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
                    </div>
                }
                {!!data.driving_licenses.length &&
                    <div className={`user-boxes-inside`} id="drivingLicenses">
                        <div className={`edit-button active `}>
                            {/* <EditCompopnentProfile
                                            toggleEditTab={this.toggleEditTab}
                                            editTab={this.editTab}
                                            tab="driving"
                                        /> */}
                        </div>
                        <span className="info-title">Driving License</span>
                        <div className="information">
                            <div className="info-inside">
                                {
                                    data.driving_licenses.map(licence =>
                                        <div className="skills-box" key={licence.id}>
                                            <p >{licence.text} </p><br />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default BoxWrapper;