import React, { Component } from "react";
import * as toast from "../../../../all/toast";
import educationService from "../../../../services/educationService";
import EducationForm from "./educationForm";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'education',
      id: props.id,
      histories: [],
      errors: {},
      loading: false
    };
  }

  componentDidMount() {
    this.getEducation()
  }

  getEducation = () => {
    const { id } = this.state;
    educationService.getUserEducationFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      } else {
        allHostories.push({
          id: "",
          user_id: this.props.id,
          school_name: "",
          degree: "",
          start_month: "",
          start_year: "",
          end_month: "",
          end_year: "",
          city: "",
          country: "",
          edu_web: "",
          description: "",
          major: "",
          checkboxToggle: false,
          show_input_field: ""
        });
      }
      this.setState({
        histories: allHostories
      });
    })
      .catch(() => {
        toast.error("Something went wrong. Please refresh the page.");
      });
  }

  addEducationForm = () => {
    const { id } = this.state;
    educationService.getUserEducationFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      }
      allHostories.push({
        id: '',
        user_id: this.props.id,
        school_name: "",
        degree: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        city: "",
        country: "",
        edu_web: "",
        description: "",
        major: "",
        checkboxToggle: false,
        show_input_field: ""
      });
      this.setState({
        histories: allHostories
      });
    })
      .catch(() => {
        toast.error("Something went wrong. Please refresh the page.");
      });
    const { histories } = this.state;
    histories.push({
      id: "",
      user_id: this.props.id,
      school_name: "",
      degree: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      city: "",
      country: "",
      edu_web: "",
      description: "",
      major: "",
      checkboxToggle: false,
      show_input_field: ""
    });
    this.setState({
      histories
    });
  };

  onEducationDelete = () => {
    let { histories, id } = this.state;
    educationService.getUserEducationFullHistory(id).then(({ data }) => {
      histories = [].concat(data);
      this.setState({ histories });
      if (this.state.histories.length === 0) {
        histories.push({
          id: "",
          user_id: this.props.id,
          school_name: "",
          degree: "",
          start_month: "",
          start_year: "",
          end_month: "",
          end_year: "",
          city: "",
          country: "",
          edu_web: "",
          description: "",
          major: "",
          checkboxToggle: false,
          show_input_field: ""
        });
        this.setState({ histories });
      }
    });
  };

  render() {
    const { toggleCurrentTab, currentTab } = this.props;
    const { histories } = this.state;
    return (
      <React.Fragment>
        <div className={`edit-info`}>
          <div
            className={`edit-info-click ${currentTab === "education" ? "active" : ""}`} onClick={() => toggleCurrentTab("education")} >
            <span>Education</span>
            <div>
              <img className="arrowImg" onClick={() => toggleCurrentTab("education")} src="../img/arrow.png" alt="" />
              {/* <div className="line-edit" /> */}
            </div>
          </div>
          <div className={`edit-info-show ${currentTab === "education" ? "active" : ""}`} >
            {histories.map((history, index) => (
              <EducationForm
                key={index}
                data={history}
                index={index}
                id={history.user_id}
                canAdd={index + 1 === histories.length}
                addMore={this.addEducationForm}
                onDelete={this.onEducationDelete}
                getEducation={this.getEducation}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Education;
