import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from '../../services/authService';
import { getLanguage } from '../global/language';

class LeftMenu extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isActive: false
        }
    }

    onToggleMenu = () => {
        if(this.props.toggleLang)
        {
            document.body.classList.toggle('active');
        }
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        const user = auth.getCurrentUser();
        const { isActive } = this.state;
        return (
            <React.Fragment>    
                <div onClick={this.onToggleMenu} className={`toggle-menu ${isActive ? 'active' : ''}`}>
                    <div className={`line-menu`}></div>
                    <div className={`line-menu`}></div>
                    <div className={`line-menu`}></div>
                </div>
                <div onClick={this.onToggleMenu} className={`white-background ${isActive ? 'disable' : ''}`}>
                </div>
                <div onClick={this.onToggleMenu} className={`left-menu ${isActive ? 'active' : ''}`}>
                    <div className={`logo`}>
                        <div className="logo-img" ></div>
                    </div>
                    <div className={`left-menu-buttons`} >
                        {user && user.access_dashboard &&
                            <Link to="/home">
                                <img src="./assets/img/5.png" alt="" />
                                {getLanguage().home}
                            </Link>
                        }
                        <Link to="/cards">
                            <img src="./assets/img/2.png" alt="" />
                                {getLanguage().cards}
                        </Link>
                        {user && user.access_reports &&
                            <Link to="/raporti">
                                <img src="./assets/img/1.png" alt=""/>
                                {getLanguage().report}
                            </Link>
                        }
                        {user && user.access_reports &&
                            <Link to="/faturimi">
                                <img src="./assets/img/bill.png" alt=""/>
                                {getLanguage().invoices}
                            </Link>
                        }
                        {user && user.access_temperatures &&
                            <Link to="/temperatura">
                                <img src="./assets/img/thermometer-black.svg" alt=""/>
                                {getLanguage().temperature}
                            </Link>
                        }
                        {user && user.access_fatura &&
                            <Link to="/faturimi">
                                <img src="./assets/img/2.svg" alt=""/>
                                {getLanguage().bill}
                            </Link>
                        }
                        {user && user.access_stock &&
                            <Link to="/stoku">
                                <img src="./assets/img/warehouse.png" alt="" />
                                {getLanguage().stock}
                            </Link>
                        }
                        {user && user.access_fridge &&
                            <Link to="/fridge">
                                <img src="./assets/img/refrigerator.svg" alt="" />
                                {getLanguage().fridge}
                            </Link>
                        }
                        {user && user.access_fridge &&
                            <Link to="/activities">
                                <img src="./assets/img/organize.svg" alt="" />
                                {getLanguage().activities}
                            </Link>
                        }
                        {user && user.access_users &&
                            <Link to="/all-users">
                                <img src="./assets/img/users.png" alt="" />
                                {getLanguage().all_users}
                            </Link>
                        }
                        <Link to="/logout">
                            <img src="./assets/img/9.png" alt="" />
                            {getLanguage().logout}
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LeftMenu;