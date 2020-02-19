import React, { Component } from "react";
import * as toast from "../../../../all/toast";
import languageService from "../../../../services/languageService";
import LanguageForm from "./languageForm";

class Language extends Component {
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
    languageService.getUserLanguagesFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      } else {
        allHostories.push({
          id: "",
          user_id: this.props.id,
          language: "",
          level: "",
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

  addLanguageForm = () => {
    const { id } = this.state;
    languageService.getUserLanguagesFullHistory(id).then(({ data }) => {
      let allHostories = [];
      if (data.length > 0) {
        allHostories = [].concat(data);
      }
      allHostories.push({
        id: '',
        user_id: this.props.id,
        language: "",
        level: "",
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
      language: "",
      level: "",
    });
    this.setState({
      histories
    });
  };

  onLanguageDelete = () => {
    let { histories, id } = this.state;
    languageService.getUserLanguagesFullHistory(id).then(({ data }) => {
      histories = [].concat(data);
      this.setState({ histories });
      if (this.state.histories.length === 0) {
        histories.push({
          id: "",
          user_id: this.props.id,
          language: "",
          level: "",
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
            className={`edit-info-click ${currentTab === "language" ? "active" : ""}`} onClick={() => toggleCurrentTab("language")} >
            <span>Language</span>
            <div>
              <img className="arrowImg" onClick={() => toggleCurrentTab("language")} src="../img/arrow.png" alt="" />
              {/* <div className="line-edit" /> */}
            </div>
          </div>
          <div className={`edit-info-show ${currentTab === "language" ? "active" : ""}`} >
            {histories.map((history, index) => (
              <LanguageForm
                key={index}
                data={history}
                index={index}
                id={history.user_id}
                canAdd={index + 1 === histories.length}
                addMore={this.addLanguageForm}
                onDelete={this.onLanguageDelete}
              />
            ))}
            <a href='https://europass.cedefop.europa.eu/sites/default/files/cefr-en.pdf' target='_blank' rel="noopener noreferrer">European language levels - Self Assessment Grid</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Language;
