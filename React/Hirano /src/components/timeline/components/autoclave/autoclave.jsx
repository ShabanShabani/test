import React, { Component } from 'react';

class AutoclaveTimeline extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const { toggleList } = this.props;
        return (
            <React.Fragment>
                <div className={`timeline-info`} >
                    <div className={`timeline-click `}>
                        <span  onClick={toggleList.bind(this)}  className="title">
                            <img src="./assets/img/circle.svg" alt="" />
                            Autoclave / Dhoma e Sterilizimit
                        </span>
                    </div>
                    <div className={`timeline-show `}>
                        <div className={`timline-helper`}>
                            <div className={`left-timeline`}>
                                <img src="./assets/img/circle.svg" alt="" />
                                <div className="line">
                                    <div className="line-wrapper"></div>
                                </div>
                            </div>
                            <div className={`right-timeline`}>
                                <div className={`progress`} >
                                    <span>12 July</span>
                                    <span><img src="./assets/img/circle.svg" alt="" /></span>
                                    <span>Start</span>
                                    <span>9:25am</span>
                                </div>
                                <div className={`progress-content`}>
                                    <span className="title">Kerkes per te hyra per prodhimin e lendes se pare</span>
                                    <div className="materials">
                                        <span>Humidity Level Start of autoclave: 50 %</span>
                                        <span>Humidity Level End  of autoclave: 40 %</span>
                                    </div>
                                    <div className="materials">
                                        <span>Temperature Start of autoclave: 35 ^C</span>
                                        <span>Temperature End of autoclave: 35 ^C</span>
                                    </div>
                                    <div className="materials">
                                        <span>Numri i Blloqeve: 30</span>
                                    </div>
                                    <div className="materials">
                                        <span>Data Start of autoclav: 29 Mars 2019</span>
                                        <span>Data End of autoclav: 30 Mars 2019</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AutoclaveTimeline;