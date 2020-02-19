import React, { Component } from "react";
import * as toast from "../../../../all/toast";
import internshipService from "../../../../services/internshipService";
import InternshipForm from "./internshipForm";

class Internship extends Component {
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
    internshipService.getUserinternshipsFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      } else {
        allHostories.push({
          id: "",
          user_id: this.props.id,
          title: "",
          organisation: "",
          start_month: "",
          start_year: "",
          end_month: "",
          end_year: "",
          city: "",
          country: "",
          description: "",
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

  addInternshipForm = () => {
    const { id } = this.state;
    internshipService.getUserinternshipsFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      }
      allHostories.push({
        id: '',
        user_id: this.props.id,
        title: "",
        organisation: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        city: "",
        country: "",
        description: "",
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
      user_id: this.props.id,
      title: "",
      organisation: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      city: "",
      country: "",
      description: "",
      checkboxToggle: false
    });
    this.setState({
      histories
    });
  };

  onInternshipDelete = () => {
    let { histories, id } = this.state;
    internshipService.getUserinternshipsFullHistory(id).then(({ data }) => {
      histories = [].concat(data);
      this.setState({ histories });
      if (this.state.histories.length === 0) {
        histories.push({
          id: "",
          user_id: this.props.id,
          title: "",
          organisation: "",
          start_month: "",
          start_year: "",
          end_month: "",
          end_year: "",
          city: "",
          country: "",
          description: "",
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
          <div
            className={`edit-info-click ${currentTab === "internship" ? "active" : ""}`} onClick={() => toggleCurrentTab("internship")} >
            <span>Internship</span>
            <div>
              <img className="arrowImg" onClick={() => toggleCurrentTab("internship")} src="../img/arrow.png" alt="" />
              {/* <div className="line-edit" /> */}
            </div>
          </div>
          <div className={`edit-info-show ${currentTab === "internship" ? "active" : ""}`} >
            {histories.map((history, index) => (
              <InternshipForm
                key={index}
                data={history}
                index={index}
                id={history.user_id}
                canAdd={index + 1 === histories.length}
                addMore={this.addInternshipForm}
                onDelete={this.onInternshipDelete}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Internship;
