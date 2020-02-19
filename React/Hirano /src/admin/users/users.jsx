import React, { Component } from 'react';
import LeftMenu from '../../components/left-menu/left-menu'
import UserTable from './table';
import PopUp from './popup';
import userService from '../../services/userService'
import NavMenu from '../../components/nav-menu/nav-menu'
import Privileges from './privileges';
import { getLanguage } from '../../../src/components/global/language'

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userRow: {},
            toggle: false,
            togglePrivileges: false
        };
    }

    togglePopup = (rowData) => {
        this.setState({
            toggle: !this.state.toggle,
            userRow: rowData
        })
    }

    togglePopupPrivileges = (rowData) => {
        this.setState({
            togglePrivileges: !this.state.togglePrivileges,
            userRow: rowData
        })
    }

    componentDidMount(){
        let { data } = this.state;
        userService.getAll().then(({ data : response }) => {
            data = [].concat(response);
            this.setState({
                data,
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    tableWillUpdate = () => {
        let { data } = this.state;
        userService.getAll().then(({ data : response }) => {
            data = [].concat(response);
            this.setState({
                data,
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    render() { 
        const {toggle, togglePrivileges, data, userRow} = this.state;

        return (
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                <PopUp 
                    togglePopup={this.togglePopup}
                    toggle={toggle}
                    tableWillUpdate={this.tableWillUpdate}
                    userRow={userRow}
                />
                <Privileges 
                    togglePopupPrivileges={this.togglePopupPrivileges}
                    togglePrivileges={togglePrivileges}
                    tableWillUpdate={this.tableWillUpdate}
                    userRow={userRow}
                />
                <div id="all-users" className={`main`}>
                    <div className="first">
                        <span className="first-title">{getLanguage().all_users}</span>
                        <div className={`create-button`}>
                            <span className="title">{getLanguage().create_user}</span>
                            <div onClick={this.togglePopup} className={`button`}>
                                <img src="./assets/img/plus.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="second">
                        <UserTable
                            data={data}
                            togglePopup={this.togglePopup}
                            togglePopupPrivileges={this.togglePopupPrivileges}
                            togglePrivileges={togglePrivileges}
                            toggle={toggle}
                            tableWillUpdate={this.tableWillUpdate}
                            userRow={userRow}
                        />
                    </div>
                </div>
            </React.Fragment>
          );
    }
}
 
export default AllUsers;