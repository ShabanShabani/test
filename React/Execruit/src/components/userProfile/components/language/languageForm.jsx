import React from "react";
import Form from "../../../../all/common/form";
import Joi from "joi-browser";
import * as toast from "../../../../all/toast";
import languageService from "../../../../services/languageService";
import { Dropdown } from 'semantic-ui-react'
import languages from '../../../../json/languages.json'
import { setHasChanges } from '../../../../globalVariables';

class LanguageForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: '',
        user_id: this.props.id,
        language: "",
        level: "",
      },
      errors: {},
      loading: false
    };
    this.state.data = this.props.data;
  }

  componentDidUpdate() {
    if (JSON.stringify(this.props.data) !== JSON.stringify(this.state.data)) {
      setHasChanges(false);
    }
    else {
      setHasChanges(true);
    }
  }

  componentWillReceiveProps(props) {
    let { data } = this.state;
    data = props.data;
    this.setState({
      data
    });
  }

  schema = {
    user_id: Joi.number().integer().allow("").optional(),
    id: Joi.number().integer().allow("").optional(),
    language: Joi.string().required(),
    level: Joi.string().required()
  };

  submitForm = () => {
    const { data } = this.state;
    this.setState({
      loading: true
    });
    const { id, user_id, language, level } = this.state.data;
    if (id) {
      languageService.language_history(id, language, level).then(({ response }) => {
        this.setState({
          loading: false,
        });
        setHasChanges(false);
        toast.success("Successfully edited Language Section.");
      })
        .catch(err => {
          this.setState({
            loading: false
          });
          toast.error("Something went wrong. Please try again");
        });
    } else {
      languageService.language_history2(user_id, language, level).then(({ data: response }) => {
        data.id = response.languageId;
        this.setState({
          loading: false,
          data
        });
        setHasChanges(false);
        toast.success("Successfully edited Language Section.");
      })
        .catch(err => {
          this.setState({
            loading: false
          });
          toast.error("Something went wrong. Please try again");
        });
    }
    this.props.addMore();
  };

  onDeleteClick(id, index) {
    const { data } = this.state;
    languageService.language_history_delete(id).then(() => {
      data.id = "";
      this.setState({
        data
      });
      this.props.onDelete(index);
    }).catch(() => {
      toast.error("Something went wrong. Please refresh the page.");
    });
  }

  handleChangeLanguage = (e, { value }) => {
    const { data } = this.state;
    data.language = value;
    this.setState({
      data
    });
  };

  handleChangeLevel = (e, { value }) => {
    const { data } = this.state;
    data.level = value;
    this.setState({
      data
    });
  };

  render() {
    const { data, loading } = this.state;
    const { id, language, level } = data;
    const { index, canAdd, addMore } = this.props;
    return (
      <div className="form-head">
        <form key={index} onSubmit={this.handleSubmit}>
          <Dropdown
            placeholder='Select Language'
            onChange={this.handleChangeLanguage}
            fluid
            search
            selection
            value={language}
            options={languages.languagesOptions}
          />
          <Dropdown
            placeholder='Select Level'
            onChange={this.handleChangeLevel}
            fluid
            search
            selection
            value={level}
            options={languages.levelOptions}
          />
          <div className="form-buttons">
            {this.renderSubmitButton("Save", loading, "")}
            {canAdd && id &&
              <button type="button" onClick={addMore}> Add More</button>
            }
            {id &&
              <button type="button" onClick={this.onDeleteClick.bind(this, id, index)}>Delete</button>
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



export default LanguageForm;
