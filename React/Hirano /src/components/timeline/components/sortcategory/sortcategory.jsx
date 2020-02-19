import React, { Component } from 'react';

class SortCategoryTimeline extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const { toggleList } = this.props;
        return (
            <React.Fragment>
                <div  className={`timeline-info`} >
                    <div className={`timeline-click `}>
                        <span onClick={toggleList.bind(this)} className="title">
                            <img src="./assets/img/circle.svg" alt="" />
                            Sortimi dhe Paketimi sipas kategorise
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
                                        <span>Numri i Arkave: 20</span>
                                        <span>Mini Arka: 15</span>
                                    </div>
                                    <div className="materials">
                                        <span>Arka te Mesme (A): 30</span>
                                        <span>Arka te Mesme (B): 20</span>
                                    </div>
                                    <div className="materials">
                                        <span>Arka te Medha (A): 30</span>
                                        <span>Arka te Medha (B): 20</span>
                                    </div>
                                    <div className="materials">
                                        <span>Klasa C: 35</span>
                                        <span>Te Thata: 20</span>
                                    </div>
                                    <div className="materials">
                                        <span>DMix: 50</span>
                                        <span>Bishta: 20</span>
                                    </div>
                                    <div className="materials">
                                        <span>Tjer: 10</span>
                                        <span>Pesha bruto e kerpudhave: 400Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Pesha neto e kerpudhave: 400Kg</span>
                                    </div>
                                    <div className="materials">
                                        <span>Data e transferimit te kepudhave: 29 Maj 2019</span>

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

export default SortCategoryTimeline;