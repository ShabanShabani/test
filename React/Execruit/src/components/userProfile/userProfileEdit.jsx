import React, { Component } from "react";
import MoreAboutYou from "./components/aboutYou";
import ProfSummary from "./components/profSummary";
import EmploymentHistory from "./components/empHistory";
import Skills from "./components/skills";
import profileService from "../../services/profileService";
import * as toast from "../../all/toast";
import Education from "./components/education/education";
import Internship from "./components/internship/internship";
import References from "./components/references/references";
import SocialLink from "./components/socialLinks/socialLinks";
import Language from './components/language/lagnuage';
import CustomSection from './components/customeSection/customSection';
import DrivingLicence from "./components/drivingLicence/drivinglicence";

class UserProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.props.currentTab,
      data: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        birthday: "",
        country: "",
        city: "",
        address: "",
        postalCode: ""
      },
      summary: {
        id: "",
        experience_description: ""
      },
      skills: [],
      driving_licenses: []
    };
    // this.state.currentTab = this.props.currentTab
    // this.toggleCurrentTab = this.toggleCurrentTab.bind(this.currentTab);
  }

  // toggleCurrentTab = tab => {
  //   if (this.state.currentTab === tab) {
  //     this.setState({
  //       currentTab: ""
  //     });
  //   } else {
  //     this.setState({
  //       currentTab: tab
  //     });
  //   }
  // };


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      currentTab: nextProps.currentTab,
    })
  }

  componentDidMount() {
    const { data, summary, skills, driving_licenses } = this.state;
    profileService.getCurrentUser().then(({ data: response }) => {
      data.id = response.id;
      data.firstName = response.first_name;
      data.lastName = response.last_name;
      data.email = response.email;
      data.city = response.city;
      data.country = response.country;
      data.address = response.address;
      data.postalCode = response.postal_code;
      data.phoneNumber = response.phone_number;
      data.privacy = response.privacy;
      if (response.birthday !== "None") {
        data.birthday = response.birthday;
      }

      summary.id = response.id;
      summary.experience_description = response.experience_description;
      response.skills.forEach(element => {
        skills.push(element.value);
      });
      response.driving_licenses.forEach(element => {
        driving_licenses.push(element.value);
      });
      this.setState({
        data,
        summary,
        skills,
        driving_licenses
      });
    })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          this.props.history.push("/user-profile");
        }
        toast.error("Something went wrong. Please refresh the page test.");
      });
  }

  render() {
    const { data, summary, skills, driving_licenses, currentTab } = this.state;
    const { toggleCurrentTab} = this.props;
    return (
      <div className={`main-information`}>
        <MoreAboutYou
          data={data}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <ProfSummary
          data={summary}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <EmploymentHistory
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <Education
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <Internship
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <Skills
          id={this.props.id}
          data={skills}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <Language
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <References
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <SocialLink
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <DrivingLicence
          id={this.props.id}
          data={driving_licenses}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />
        <CustomSection
          id={this.props.id}
          toggleCurrentTab={toggleCurrentTab}
          currentTab={currentTab}
        />

        {/* <div className="form-buttons">
          <Link to='/profile'>COMPLETE</Link>
        </div> */}
      </div>
    );
  }
}

export default UserProfileEdit;
