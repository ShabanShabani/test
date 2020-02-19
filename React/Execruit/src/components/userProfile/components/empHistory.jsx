import React, { Component } from "react";
import * as toast from "../../../all/toast";
import employmentService from "../../../services/employmentService";
import AddEmpHistory from "../../userProfile/components/empHistoryForm";

class EmploymentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      histories: [],
      errors: {},
      loading: false
    };
  }

  componentDidMount() {
    const { id } = this.state;
    employmentService
      .getUserEmpFullHistory(id)
      .then(({ data }) => {
        let allHostories = [];
        if (data.length > 0) {
          allHostories = [].concat(data);
        } else {
          allHostories.push({
            id: "",
            user_id: id,
            job_title: "",
            employer_name: "",
            start_month: "",
            start_year: "",
            end_month: "",
            end_year: "",
            job_city: "",
            emp_web: "",
            job_description: "",
            checkboxToggle: false
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

  addEmpHistoryForm = () => {
    const { id } = this.state;
    employmentService.getUserEmpFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      }
      allHostories.push({
        id: "",
        user_id: id,
        job_title: "",
        employer_name: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        job_city: "",
        emp_web: "",
        job_description: "",
        checkboxToggle: false
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
      user_id: id,
      job_title: "",
      employer_name: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      job_city: "",
      emp_web: "",
      job_description: "",
      checkboxToggle: false
    });
    this.setState({
      histories
    });
  };

  onEmpDelete = () => {
    let { histories, id } = this.state;
    employmentService.getUserEmpFullHistory(id).then(({ data }) => {
      histories = [].concat(data);
      this.setState({ histories });
      if (this.state.histories.length === 0) {
        histories.push({
          id: "",
          user_id: this.props.id,
          job_title: "",
          employer_name: "",
          start_month: "",
          start_year: "",
          end_month: "",
          end_year: "",
          job_city: "",
          emp_web: "",
          job_description: "",
          checkboxToggle: false
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
          <div onClick={() => toggleCurrentTab("empHistory")} className={`edit-info-click ${currentTab === "empHistory" ? "active" : ""}`}>
            <span>Employment History</span>
            <div>
              <img
                className="arrowImg"
                onClick={() => toggleCurrentTab("empHistory")}
                src="../img/arrow.png"
                alt=""
              />
              {/* <div className="line-edit" /> */}
            </div>
          </div>
          <div

            className={`edit-info-show ${currentTab === "empHistory" ? "active" : ""}`} >

            {histories.map((history, index) => (
              <AddEmpHistory
                toggleCurrentTab={toggleCurrentTab} currentTab={currentTab}
                key={index}
                data={history}
                index={index}
                id={history.user_id}
                canAdd={index + 1 === histories.length}
                addMore={this.addEmpHistoryForm}
                onDelete={this.onEmpDelete}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmploymentHistory;
