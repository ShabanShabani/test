import React, { Component } from 'react';
import { getLanguage } from '../../../global/language';

class Weightofsubstratestimeline extends Component {
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
                                {getLanguage().avg_weight_sub}
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
                                        <span>Substrati 1: 50Kg</span>
                                        <span>Substrati 2: 40Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Substrati 3: 50Kg</span>
                                        <span>Substrati 4: 40Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Substrati 5: 50Kg</span>
                                        <span>Substrati 6: 40Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Substrati 7: 50Kg</span>
                                        <span>Substrati 8: 40Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Substrati 9: 50Kg</span>
                                        <span>Pesha mesatare e Blloqeve: 40kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Data e Mixerit: 10 Mars 2019</span>
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

export default Weightofsubstratestimeline;