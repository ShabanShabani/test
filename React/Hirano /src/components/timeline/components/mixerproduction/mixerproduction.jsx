import React, { Component } from 'react';

class MixerProductiontimeline extends Component {
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
                            Mixer dhe Prodhimi i Blloqeve
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
                                        <span>Dru Bung: 500Kg</span>
                                        <span>Dru Ahu: 400Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Krunde: 500Kg</span>
                                        <span>Miser i Bluar: 400Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Gips: 500Kg</span>
                                        <span>Shkums: 400Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Uje: 50L</span>
                                    </div>
                                    <div className="materials">
                                        <span>PH Level Start of Mixer: 3</span>
                                        <span>PH Level End of Mixer: 6</span>
                                    </div>
                                    <div className="materials">
                                        <span>Humidity Level Start of Mixer: 3</span>
                                        <span>Humidity Level End of Mixer: 3</span>
                                    </div>
                                    <div className="materials">
                                        <span>Numri i blloqeve: 10</span>
                                    </div>
                                    <div className="materials">
                                        <span>Data: 10 Mars 2019</span>
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

export default MixerProductiontimeline;