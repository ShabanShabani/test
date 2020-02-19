import React from "react";
import Form from "../../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../../all/toast";
import educationService from "../../../../services/educationService";
import { Dropdown } from 'semantic-ui-react'
import degreeJson from '../../../../json/degreeName.json'
import { setHasChanges } from '../../../../globalVariables';
import startMonthJson from '../../../../json/startMonth.json';
import startYearJson from '../../../../json/startYear.json';

class EducationForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'educationForm',
      data: {
        id: '',
        user_id: this.props.id,
        school_name: "",
        degree: "",
        start_month: '',
        start_year: '',
        end_month: '',
        end_year: '',
        city: "",
        country: "",
        edu_web: "",
        description: "",
        major: '',
        show_input_field: '',
        checkboxToggle: false
      },
      errors: {},
      loading: false,
      toggleInput: false,
      maxCounter: 400
    };
  }

  schema = {
    user_id: Joi.number().integer().allow("").optional(),
    id: Joi.number().integer().allow("").optional(),
    school_name: Joi.string().required().label("School Name"),
    degree: Joi.string().allow("").optional(),
    start_month: Joi.string().required().label("Start Month"),
    start_year: Joi.string().required().label("Start Year"),
    end_month: Joi.string().allow('').optional(),
    end_year: Joi.string().allow('').optional(),
    city: Joi.string().required().label("City"),
    country: Joi.string().required().label("Country"),
    edu_web: Joi.string().allow('').optional(),
    description: Joi.string().allow("").optional(),
    major: Joi.string().allow('').optional().label("Major"),
    show_input_field: Joi.string().allow('').optional().label("Name"),
    checkboxToggle: Joi.boolean().allow('').optional()
  };

  componentWillReceiveProps(props) {
    let { data } = this.state
    data = props.data;
    if (data.show_input_field) {
      this.setState({
        toggleInput: true
      })
    }
    if (data.start_month === "None") {
      data.start_month = '';
    }
    if (data.end_month === 'None') {
      data.end_month = '';
    }
    this.setState({
      data
    })
  }


  componentDidUpdate() {
    if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
      setHasChanges(true);
    }
    else {
      setHasChanges(false);
    }
  }
  componentWillUpdate() {
    let { data } = this.state
    if (data.checkboxToggle) {
      this.schema.end_month = Joi.string().allow('').optional()
      this.schema.end_year = Joi.string().allow('').optional()
    } else {
      this.schema.end_month = Joi.string().required()
      this.schema.end_year = Joi.string().required()
    }
  }

  onChangeEndDate = date => {
    const { data } = this.state;
    data.end_month = date.toISOString().slice(0, 10).replace('T', ' ');
    this.setState({ data })
  }

  onChangeStartDate = date => {
    const { data } = this.state;
    data.start_month = date.toISOString().slice(0, 10).replace('T', ' ');
    this.setState({ data })
  }

  submitForm = () => {
    const { data } = this.state;
    this.setState({
      loading: true
    });
    const { id, user_id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, description, major, show_input_field, checkboxToggle } = this.state.data;
    if (id) {
      educationService.education_history(id, user_id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, description, major, show_input_field, checkboxToggle).then(({ response }) => {
        this.props.getEducation()
        this.setState({
          loading: false,
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
    } else {
      educationService.education_history2(user_id, school_name, degree, start_month, end_month, start_year, end_year, city, country, edu_web, description, major, show_input_field, checkboxToggle).then(({ data: response }) => {
        data.id = response.eduId;
        this.props.getEducation()
        this.setState({
          loading: false,
          data
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
    }
  };
  onDeleteClick(id, index) {
    const { data } = this.state;
    educationService.education_history_delete(id).then(() => {
      data.id = "";
      this.setState({
        data
      });
      this.props.onDelete(index);
    }).catch(() => {
      toast.error("Something went wrong. Please refresh the page.");
    });
  }

  handleChangePlatform = (e, { value }) => {
    const { data } = this.state;
    // let degree = null;
    if (value === "Other") {
      this.setState({
        toggleInput: true
      })
    } else {
      this.setState({
        toggleInput: false
      })
    }
    data.degree = value;
    this.setState({
      data
    });
  };


  handleChangeStartMonth = (e, { value }) => {
    const { data } = this.state;
    // let start_month = null;
    startMonthJson.start_Month.forEach(element => {
      if (element.value === value) {
        data.start_month = element;
      }
    });
    data.start_month = value;
    this.setState({
      data
    });
  };

  handleChangeStartYear = (e, { value }) => {
    const { data } = this.state;
    // let start_year = null;
    startYearJson.start_year.forEach(element => {
      if (element.value === value) {
        data.start_year = element;
      }
    });
    data.start_year = value;
    this.setState({
      data
    });
  };

  handleChangeEndMonth = (e, { value }) => {
    const { data } = this.state;
    // let end_month = null;
    startMonthJson.start_Month.forEach(element => {
      if (element.value === value) {
        data.end_month = element;
      }
    });
    data.end_month = value;
    this.setState({
      data
    });
  };

  handleChangeEndYear = (e, { value }) => {
    const { data } = this.state;
    // let end_year = null;
    startYearJson.start_year.forEach(element => {
      if (element.value === value) {
        data.end_year = element;
      }
    });
    data.end_year = value;
    this.setState({
      data
    });
  };

  onChangeCheckBox = event => {
    let { data } = this.state;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    data.checkboxToggle = value;
    this.setState({
      data
    });
  };

  render() {
    const { data, errors, loading, toggleInput, maxCounter } = this.state;
    const { id, school_name, degree, start_month, start_year, end_month, end_year, city, country, edu_web, description, major, show_input_field, checkboxToggle } = data;
    const { index, canAdd, addMore } = this.props;
    let counter = maxCounter - description.length;

    return (
      <div className="form-head">
        <form key={index} onSubmit={this.handleSubmit}>
          {this.renderInput("school_name", null, "school_name", school_name, this.handleChange, errors.school_name, false, "Name of Institution")}
          <div className={`input-form`}>
            <Dropdown
              placeholder='Degree'
              onChange={this.handleChangePlatform}
              fluid
              search
              selection
              value={degree}
              defaultOpen={false}
              options={degreeJson.degreeName}
            />
          </div>
          {toggleInput &&
            this.renderInput("show_input_field", null, "show_input_field", show_input_field, this.handleChange, errors.show_input_field, false, "Name")
          }
          {this.renderInput("major", null, "major", major, this.handleChange, errors.major, false, "Major")}
          {this.renderInput("city", null, "city", city, this.handleChange, errors.city, false, "City")}
          {this.renderInput("country", null, "country", country, this.handleChange, errors.country, false, "Country")}
          {this.renderInput("edu_web", null, 'edu_web', edu_web, this.handleChange, errors.edu_web, false, "Institution Web")}
          {/* <div className="date-grid"> */}
          <div className={`input-form`}>
            <Dropdown
              placeholder='Start Month'
              onChange={this.handleChangeStartMonth}
              fluid
              search
              selection
              value={start_month}
              defaultOpen={false}
              options={startMonthJson.start_Month}
            />
          </div>
          <div className={`input-form`}>
            <Dropdown
              placeholder='Start Year'
              onChange={this.handleChangeStartYear}
              fluid
              search
              selection
              value={start_year}
              defaultOpen={false}
              options={startYearJson.start_year}
            />
          </div>
          <div className={`input-form`}>
            <Dropdown
              placeholder='End Month'
              onChange={this.handleChangeEndMonth}
              fluid
              search
              selection
              value={end_month}
              defaultOpen={false}
              options={startMonthJson.start_Month}
              disabled={checkboxToggle}
            />
            <div className={"presentdiv"}>
              <input className={'checkbox-input'} onClick={this.onChangeCheckBox} type="checkbox" checked={checkboxToggle} />
              <label >Present</label>
            </div>
          </div>
          <div className={`input-form`} >
            <Dropdown
              placeholder='End Year'
              onChange={this.handleChangeEndYear}
              fluid
              search
              selection
              value={end_year}
              defaultOpen={false}
              options={startYearJson.start_year}
              disabled={checkboxToggle}
            />
          </div>
          {/* </div> */}
          {this.renderTextArea(maxCounter, "description", `Include 2-3 sentences about your experience (${counter} characters left):`, "description", description, this.handleChange, errors.description, false, false, 7)}

          <div className="form-buttons">
            {this.renderSubmitButton("Save", loading, "")}
            {canAdd && id &&
              <button type="button" onClick={addMore}> Add More</button>
            }
            {id &&
              <button type="button" onClick={this.onDeleteClick.bind(this, id, index)} >Delete </button>
            }
          </div>
        </form>
        {!canAdd && id &&
          <div className="bottom-line"></div>
        }
      </div>
    );
  }
}

export default EducationForm;
