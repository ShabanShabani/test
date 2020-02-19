import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import Stoku from './components/stoku/stoku';
import JobeReport from './components/jobsreport/jobreport';
import FirstSubjecttimeline from './components/AFSubject/afsubject';
import HRMaterialtimeline from './components/HRMaterial/hrmaterial';
import MixerProductiontimeline from './components/mixerproduction/mixerproduction';
import Weightofsubstratestimeline from './components/weightofsubstrates/weightofsubstrates';
import AutoclaveTimeline from './components/autoclave/autoclave';
import InoculationRoomTimeline from './components/inoculationroom/inoculationroom';
import ControlSubstrates from './components/infectedsubstrates/infectedsubstrates';
import ReedHarvestingTimeline from './components/reedharvesting/reedharvesting';
import SortCategoryTimeline from './components/sortcategory/sortcategory';

class Timeline extends Component {
    // constructor(props) {
    //     super(props);
    // }


    toggleList = (e) => {
        if (!e.target.parentNode.parentNode.className.includes('active')) {
            e.target.parentNode.parentNode.className += ' active'
        }
        else {
            e.target.parentNode.parentNode.className = e.target.parentNode.parentNode.className.split(' ')[0]
        }
    };

    render() {

        return (
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                {/* <RightPart /> */}
                <div id="timeline" className={`main`} >
                    <div className={`first-timeline`} >
                        <span>Karta</span>
                    </div>
                    <div className={`second-timeline`}>
                        <Stoku
                            toggleList={this.toggleList}
                        />
                        <JobeReport
                            toggleList={this.toggleList}
                        />
                        <FirstSubjecttimeline
                            toggleList={this.toggleList}
                        />
                        <HRMaterialtimeline
                            toggleList={this.toggleList}
                        />
                        <MixerProductiontimeline
                            toggleList={this.toggleList}
                        />
                        <Weightofsubstratestimeline
                            toggleList={this.toggleList}
                        />
                        <AutoclaveTimeline
                            toggleList={this.toggleList}
                        />
                        <InoculationRoomTimeline
                            toggleList={this.toggleList}
                        />
                        <ControlSubstrates
                            toggleList={this.toggleList}
                        />
                        <ReedHarvestingTimeline
                            toggleList={this.toggleList}
                        />
                        <SortCategoryTimeline
                            toggleList={this.toggleList}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Timeline;