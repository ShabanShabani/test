import React, { Component } from 'react';

class ChooseTransfer extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const { toggleList, pointer } = this.props;
        let options2 = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options2);
        return (
            <React.Fragment>
                <div onClick={toggleList.bind(this)} className={`timeline-info ${pointer === 1 ? 'active' : ''}`} >
                        <div className={`timeline-click`}>
                            <span className="title">
                                <img src="./assets/img/circle.svg" alt="" />
                                Zgjedh Bartjen
                            </span>
                        </div>
                        <div className={`timeline-show ${pointer === 1 ? 'active' : ''}`}>
                            <div className={`timline-helper`}>
                                <div className={`left-timeline`}>
                                    <img src="./assets/img/circle.svg" alt="" />
                                    <div className="line">
                                        <div className="line-wrapper"></div>
                                    </div>
                                </div>
                                <div className={`right-timeline`}>
                                    <div className={`progress`} >
                                        <span>{today}</span>
                                        <span><img src="./assets/img/circle.svg" alt="" /></span>
                                        <span>Start</span>
                                        <span>{today}</span>
                                    </div>
                                    <div className={`progress-content`}>
                                        <form autoComplete="off" onSubmit={this.handleSubmit} className={`choose-transfer`} >
                                            <button className={`choose-button`}>ritje</button>
                                            <button className={`choose-button`}>friz</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default ChooseTransfer;