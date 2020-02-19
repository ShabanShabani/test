import React from "react";
import Form from "../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../all/toast";
import userService from "../../../services/userService";

class ProfOverview extends Form {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'profOverview',
      data: {
        userName: ""
      },
      errors: {}
    };
  };

  schema = {
    userName: Joi.string().required()
  };
  componentWillReceiveProps() {
    const { data } = this.state;
    this.setState({
      data
    });
  }

  submitForm = () => {
    this.setState({
      loading: true
    });
    const { userName } = this.state.data;
    const user = {
      userName
    };

    userService
      .add(user)
      .then(({ data }) => {
        window.location = "/";
      })
      .catch(err => {
        toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const { data, errors } = this.state;
    const { toggleCurrentTab, currentTab } = this.props;
    const { userName } = data;
    return (
      <React.Fragment>
        <div className={`edit-info`}>
          <div
            className={`edit-info-click ${
              currentTab === "profOver" ? "active" : ""
              }`}
            onClick={() => toggleCurrentTab("aboutYou")}
          >
            <span>Add a professional Overview</span>
            <img
              onClick={() => toggleCurrentTab("profOver")}
              src="../img/arrow.png"
              alt=""
            />
          </div>
          <div
            className={`edit-info-show ${
              currentTab === "profOver" ? "active" : ""
              }`}
          >
            {this.renderInput(
              "userName",
              null,
              "userName",
              userName,
              this.handleChange,
              errors.userName,
              false,
              "First Name"
            )}
            {this.renderInput(
              "userName",
              null,
              "userName",
              userName,
              this.handleChange,
              errors.userName,
              false,
              "First Name"
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfOverview;
