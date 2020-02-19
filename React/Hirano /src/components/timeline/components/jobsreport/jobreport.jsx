import React, { Component } from 'react';

class JobeReport extends Component {
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
                            Raporti i Punes
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
                                        <span>Emri: Melos</span>
                                        <span>Mbiemri: Bojku</span>
                                    </div>
                                    <div className="materials">
                                        <span>Sasia e parashikuar per prodhim ne Blloqeve: 200 kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Data: 01 Mars 2019</span>
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

export default JobeReport;