import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import RightPart from '../right-part/right-part';
import Fabric from './fabric';
import TableInfo from './info-box/table';
import { withRouter } from "react-router";
import auth from '../../services/authService';

class Home extends Component {
    componentDidMount()
    {
        document.body.classList.add('dashboard-page');
    }
    
    componentWillUnmount()
    {
        document.body.classList.remove('dashboard-page');        
    }
    
    render() { 
        const user = auth.getCurrentUser();
        
        return ( 
            <React.Fragment>
                <LeftMenu />
                <div className="home-menu-wrapper">
                    <NavMenu />
                </div>
                <RightPart />
                {user && !user.access_dashboard &&
                    <div className="no-access">
                        <div className="no-access-title">
                            <span>Ju nuk keni qasje ne dashboard, per me shum kontaktoni adminin!</span>
                        </div>
                    </div>
                }
                <div id="dashboard" className={`main`} >
                    <div className={`first-section`} >
                        <Fabric />
                    </div>
                    <div className={`second-section`}>
                        <TableInfo />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}

export default withRouter(Home);