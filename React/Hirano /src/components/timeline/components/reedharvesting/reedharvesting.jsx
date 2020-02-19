import React, { Component } from 'react';

class ReedHarvestingTimeline extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const { toggleList } = this.props;
        return (
            <React.Fragment>
                <div className={`timeline-info`} >
                    <div className={`timeline-click `}>
                        <span onClick={toggleList.bind(this)} className="title">
                            <img src="./assets/img/circle.svg" alt="" />
                            Korrja e Kerpudhave
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
                                        <span>Emri: Lorem</span>
                                        <span>Mbiemri: Ipsum</span>
                                    </div>
                                    <div className="materials">
                                        <span>Ore Pune: 38h</span>
                                        <span>Numri total i Arkave: 50</span>
                                    </div>
                                    <div className="materials">
                                        <span>Pesha Bruto e kerpudhave: 450kg</span>
                                        <span>Pesha Bruto e kerpudhave: 450kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Mesatarja e korrjeve per ore ne kg: 45kg</span>
                                        <span>Numri i seres: 20 </span>
                                    </div>
                                    <div className="materials">
                                        <span>Data: 29 Mars 2019</span>
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

export default ReedHarvestingTimeline;