import React from "react";
import Form from "../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../all/toast";
import skillsService from "../../../services/skillsService";
import { Dropdown } from "semantic-ui-react";
import { setHasChanges } from '../../../globalVariables';


class Skills extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: props.id,
        value: [],
        text: ""
      },
      skills: [],
      errors: {},
      loading: false,
      options: []
    };
    this.state.skills = this.props.data;
  }

  componentDidUpdate() {
    if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
      setHasChanges(true);
    }
    else {
      setHasChanges(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    // data.value = [].concat(nextProps.data);
    this.setState({
      data: {
        value: [].concat(nextProps.data)
      }
    })
  }

  schema = {
    id: Joi.string().allow("").optional(),
    text: Joi.string().allow("").optional(),
    value: Joi.array()
  };

  componentDidMount() {
    const { options } = this.state;
    skillsService.getSkills().then(({ data: response }) => {
      let skills = options;
      response.forEach(skill => {
        skills.push({ id: "", text: skill.text, value: skill.value });
      });
      this.setState({
        options: skills,
        skills: this.props.data
      });
    })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          this.props.history.push("/user-profile");
        }
        toast.error("Something went wrong. Please refresh the page123.");
      });
  }

  submitForm = () => {
    this.setState({
      loading: true
    });
    const { id, value } = this.state.data;
    skillsService
      .addSkills(id, value)
      .then(({ response }) => {
        this.setState({
          loading: false
        });
        setHasChanges(false);
        toast.success("Successfully edited User.");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong. Please try again");
      });
  };

  handleAddition = e => {
    let { options } = this.state;
    let tag = e.target.value;
    if (e.key === "Enter") {
      options.push({
        text: tag,
        value: tag
      });
      this.setState({
        options
      });
      skillsService.skill(tag).then(({ data: response }) => {
      })
        .catch(err => {
          if (err.response && err.response.status === 400) {
            this.props.history.push("/user-profile");
          }
          toast.error("Duplicate.");
        });
    }
  };

  handleChange = (e, { value }) => {
    const { data } = this.state;
    let skills = [];
    value.forEach(skill => {
      skills.push(skill);
    });
    data.value = skills;
    this.setState({
      data
    });
  };

  render() {
    const { loading, options, skills } = this.state;
    const { toggleCurrentTab, currentTab } = this.props;

    return (
      <React.Fragment>
        <div className={`edit-info`}>
          <div className={`edit-info-click ${currentTab === "skills" ? "active" : ""}`} onClick={() => toggleCurrentTab("skills")}>
            <span>Skills</span>
            <img className="arrowImg" onClick={() => toggleCurrentTab("skills")} src="../img/arrow.png" alt="" />
          </div>
          <div className={`edit-info-show ${currentTab === "skills" ? "active" : ""}`} >
            <form className="skills-form" onSubmit={this.handleSubmit}>
              <span className="description">Type your skills and press Enter</span>
              <Dropdown
                allowAdditions={true}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
                placeholder="Skills"
                defaultValue={skills}
                defaultOpen={true}
                fluid
                multiple
                search
                selection
                options={options}
              />
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

export default Skills;
