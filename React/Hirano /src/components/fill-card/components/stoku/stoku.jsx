import React, { Component } from 'react';

class Stoku extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() { 
        const {toggleList} = this.props;
        return ( 
            <React.Fragment>
                <div onClick={toggleList.bind(this)}  className={`timeline-info`} >
                    <div id="stoku" className={`timeline-click`}>
                        <span className="title">
                            <img src="./assets/img/circle.svg" alt=""/>
                            Stoku
                        </span>
                    </div> 
                    <div className={`timeline-show`}>
                        <div className={`timline-helper`}>
                            <div className={`left-timeline`}>
                                <img src="./assets/img/circle.svg" alt=""/>
                                <div className="line">
                                    <div className="line-wrapper"></div>
                                </div>
                            </div>
                            <div className={`right-timeline`}>
                                <div className={`progress`} >
                                    <span>12 July</span>
                                    <span><img src="./assets/img/circle.svg" alt=""/></span>
                                    <span>Start</span>
                                    <span>9:25am</span>
                                </div>
                                <div className={`progress-content`}>
                                    <div className="materials">
                                        <input type="text" placeholder="Emri" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Mbiemri" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Dru Bungu" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Dru Ahu" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Krunde" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Miser i Bluar" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Jarem" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Shkums" />
                                    </div>
                                    <div className="materials">
                                        <input type="text" placeholder="Gips" />
                                    </div>
                                    <div className="form-button">
                                        <button>Ruaj te dhenat</button>
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
 
export default Stoku;