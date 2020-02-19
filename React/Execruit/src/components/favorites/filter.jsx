import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import skillsFilter from '../../json/skills.json'
import degreeChoice from '../../json/degreeName.json'
import language from '../../json/languages.json'
import experience from '../../json/experience.json';
import driving from '../../json/categories.json';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterOn: false,
      users: [],
      value: ''
    };
    this.state.data = this.props.users;
  }

  render() {
    const { toggleList, isToggleList, toggleFilter, isFilterOn, handleChange, educationChange, languageChange, drivingChange, experienceChange } = this.props;
    return (
      <React.Fragment>
        <div className={`top`}>
          <div onClick={() => toggleList('list')} className={`list-button ${isToggleList === 'list' ? 'active' : ''}`}>
            <div className="list-button-inside"></div>
            <div className="list-button-inside"></div>
            <div className="list-button-inside"></div>
          </div>
          <div onClick={() => toggleList('grid')} className={`grid-button ${isToggleList === 'grid' ? 'active' : ''}`}>
            <div className="grid-button-inside"></div>
            <div className="grid-button-inside"></div>
            <div className="grid-button-inside"></div>
            <div className="grid-button-inside"></div>
          </div>
          <div onClick={() => toggleFilter(true)} className={`filter-button ${isFilterOn ? 'active' : ''}`} >
            <img src="../img/filter-tool-black-shape.png" alt="" />
          </div>

          <div className={`filter-box ${isFilterOn ? 'active' : ''}`}>
            <Dropdown
              // multiple
              placeholder='Select Skill'
              fluid
              clearable
              selection
              options={skillsFilter.skills}
              onChange={handleChange}
            />
            <Dropdown
              // multiple
              placeholder='Education Degree'
              fluid
              clearable
              selection
              options={degreeChoice.degreeName}
              onChange={educationChange}
            />
            <Dropdown
              placeholder='Language'
              fluid
              clearable
              selection
              options={language.languagesOptions}
              onChange={languageChange}
            />
            <Dropdown
              placeholder='Experience'
              fluid
              clearable
              selection
              options={experience.experience}
              onChange={experienceChange}
            />
            <Dropdown
              placeholder='Driving License'
              fluid
              clearable
              selection
              options={driving.categories}
              onChange={drivingChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;