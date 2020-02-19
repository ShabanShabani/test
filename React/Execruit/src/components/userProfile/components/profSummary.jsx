import React from "react";
import Form from "../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../all/toast";
import profileService from "../../../services/profileService";
import { setHasChanges } from '../../../globalVariables';


class ProfSummary extends Form {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'profOver',
      data: {
        id: props.id,
        experience_description: ""
      },
      errors: {},
      loading: false,
      maxCounter: 600
    };
    this.state.data = this.props.data;
  }

  // componentDidMount() {
  //   this.experience_description()
  // }
  schema = {
    id: Joi.number().integer().allow("").optional(),
    experience_description: Joi.string().min(0).max(400).allow("").optional()
  };

  componentDidUpdate() {
    this.onChange()
  }

  onChange = () => {
    if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
      setHasChanges(true);
    }
    else {
      setHasChanges(false);
    }
  }

  componentWillReceiveProps(newProps){
    let { data } = this.state;
    if(setHasChanges())
    {
      data.experience_description = ''
      this.setState({
        data
      })
    }else{
      data.experience_description = newProps.data.experience_description
      this.setState({
        data
      })
    }
  }

  submitForm = () => {
    this.setState({
      loading: true
    });
    const { id, experience_description } = this.state.data;
    profileService.experience_description(id, experience_description).then(({ response }) => {
      // this.getSummary()
      this.setState({
        loading: false
      });
      setHasChanges(false);
      toast.success("Successfully edited User.");
      }).catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong. Please try again");
      });
  };

  render() {
    const { data, errors, loading, maxCounter } = this.state;
    const { toggleCurrentTab, currentTab, tab } = this.props;
    const { experience_description } = data;
    let counter = maxCounter - experience_description.length;
    return (
      <React.Fragment>
        <div className={`edit-info`}>
          <div className={`edit-info-click ${currentTab === "profOver" || tab === 'profOver' ? "active" : ""}`} onClick={() => toggleCurrentTab("profOver")} onChange={this.onChange}>
            <span>Professional Summary</span>
            <img className="arrowImg" onClick={() => toggleCurrentTab("profOver")} src="../img/arrow.png" alt="" />
          </div>
          <div className={`edit-info-show ${currentTab === "profOver" || tab === 'profOver' ? "active" : ""}`}>
            <form onSubmit={this.handleSubmit}>
              {this.renderTextArea(maxCounter, "experience_description", `Include 2-3 sentences about your experience (${counter} characters left):`, "experience_description", experience_description, this.handleChange, errors.experience_description, false, false, 7, 10)}
              <div className="form-buttons">
                {this.renderSubmitButton("Save", loading, "")}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfSummary;
