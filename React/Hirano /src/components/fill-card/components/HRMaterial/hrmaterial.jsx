import React, { Component } from 'react';
import { getLanguage } from '../../../global/language';

class HRMaterial extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {

        const { toggleList } = this.props;
        return (
            <React.Fragment>
                <div onClick={toggleList.bind(this)} className={`timeline-info`} >
                    <div className={`timeline-click`}>
                        <span className="title">
                            <img src="./assets/img/circle.svg" alt="" />
                            Dorezimi i lendes se pare
                        </span>
                    </div>
                    <div className={`timeline-show`}>
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
                                    {/* <input className={`title`} type="text" placeholder="Title" /> */}
                                    <div className="materials">
                                        <input type="text" placeholder="Dru Bung" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Dru Ah" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Krunde" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Miser i bluar" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Gips" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Shkums" />
                                    </div>
                                    <div className="materials">
                                        <input type="data" placeholder="DD/MM/YYYY" />
                                    </div>
                                    <div className="form-button">
                                        <button>{getLanguage().save_data}</button>
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

export default HRMaterial;