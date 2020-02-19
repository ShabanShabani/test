import React, { Component } from 'react';
import { getLanguage } from '../../../global/language';

class ControlSubstrates extends Component {
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
                            {getLanguage().control_of_infectedsub}
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
                                        <span>Substratet me infeksion te Gjelber: 20</span>
                                        <span>Substratet me infeksion te Portokall: 50</span>
                                    </div>
                                    <div className="materials">
                                        <span>Substratet me infeksion te Verdge: 20</span>
                                        <span>Substratet me infeksion te Zeze: 60</span>
                                    </div>
                                    <div className="materials">
                                        <span>Substratet me infeksion te Kuqe: 20</span>
                                        <span>Numri i Seres: 15</span>
                                    </div>
                                    <div className="materials">
                                        <span>Totali i Blloqeve te infektuara: 230</span>
                                        <span>Data e Kontrolles: 10 Shkurt 2019</span>
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

export default ControlSubstrates;