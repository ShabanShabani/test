import React, { Component } from 'react';

class CompanyPostGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
        this.state.data = this.props.users;
    }

    render() {

        return (
            <React.Fragment>
                <div className={`jobsbox post-job`}>
                    <div className={`grid-box`}>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/new-logo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Back-End Developer</span>
                                <span className={`company-content`}>TechFrame is a technology & customer experience company based in Prishtina.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/new-logo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Shites Ambulantiv</span>
                                <span className={`company-content`}>
                                    Coca cola  is company based in Prishtina.
                                    Shitje e mallit ne teren me kombi ne te gjithe Kosoven si dhe rajon.
                                </span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">
                                        <span>+12</span>
                                    </div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/tframe.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Back-End Developer</span>
                                <span className={`company-content`}>TechFrame is a technology & customer experience company based in Prishtina.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/httpool.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Shites Ambulantiv</span>
                                <span className={`company-content`}>Coca cola  is company based in Prishtina.
shitje e mallit ne teren me kombi ne te gjithe Kosoven si dhe rajon.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/cocaLogo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Back-End Developer</span>
                                <span className={`company-content`}>TechFrame is a technology & customer experience company based in Prishtina.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/cocaLogo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Shites Ambulantiv</span>
                                <span className={`company-content`}>Coca cola  is company based in Prishtina.
shitje e mallit ne teren me kombi ne te gjithe Kosoven si dhe rajon.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/cocaLogo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Back-End Developer</span>
                                <span className={`company-content`}>TechFrame is a technology & customer experience company based in Prishtina.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/cocaLogo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Shites Ambulantiv</span>
                                <span className={`company-content`}>Coca cola  is company based in Prishtina.
shitje e mallit ne teren me kombi ne te gjithe Kosoven si dhe rajon.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/cocaLogo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Back-End Developer</span>
                                <span className={`company-content`}>TechFrame is a technology & customer experience company based in Prishtina.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                        <div className={`grid-3 grid-2 grid-1 job-box`}>
                            <div className={`company-logo`}>
                                <img className="logo" src="../img/cocaLogo.png" alt="" />
                                <div className={`company-badge`}>
                                    <img src="../img/save-border.png" alt="" />
                                </div>
                            </div>
                            <div className={`box-content`}>
                                <span className={`title`}>Shites Ambulantiv</span>
                                <span className={`company-content`}>Coca cola  is company based in Prishtina.
shitje e mallit ne teren me kombi ne te gjithe Kosoven si dhe rajon.</span>
                            </div>
                            <div className={`little-box`}>
                                <div className={`seenby`}>
                                    <div className="top">
                                        <img src="../img/imageimage.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/vajza.jpeg" alt="" />
                                    </div>
                                    <div className="top">
                                        <img src="../img/img123.jpeg" alt="" />
                                    </div>

                                    <div className="top">+12</div>
                                </div>
                                <div className={`time`}>
                                    <div className="left-days">
                                        <span><img src="../img/clock1.svg" alt="" /> 2 days left</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`buttons`}>
                                <button>View Post</button>
                                <button>Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default CompanyPostGrid;