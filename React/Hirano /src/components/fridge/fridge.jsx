import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import SecondChart from './charts/second-chart';
import FirstChart from './charts/first-chart';
import StockTable from './table';
import Popup from './popup';
import fridgeService from '../../services/fridgeService';
import { getLanguage } from '../global/language';

class Fridge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            data : [],
            userRow: {}
        };
    }

    togglePopup = (rowData) => {
        this.setState({
            toggle: !this.state.toggle,
            userRow: rowData
        })
    }

    componentDidMount(){
        let { data } = this.state;
        fridgeService.getFridgeProducts().then(({ data : response }) => {
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
        fridgeService.getFridgeProducts().then(({ data : response }) => {
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
        const {toggle, data, userRow} = this.state;
        return (
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                <Popup 
                    togglePopup={this.togglePopup}
                    toggle={toggle}
                    tableWillUpdate={this.tableWillUpdate}
                    userRow={userRow}
                />
                <div id="stock" className={`main`} >
                    <div className={`first-stock`}>
                        <div className={`first-chart`}>
                            <FirstChart data={data} />
                        </div>
                        <div className={`second-chart`}>
                            <SecondChart data={data} />
                        </div>
                    </div>
                    <div className={`add-button`}>
                        <div onClick={this.togglePopup} className={``}>
                            <span>{getLanguage().add_stock}</span>
                        </div>
                        <div onClick={this.togglePopup} className={``}>
                            <img src="./assets/img/plus-color.svg" alt=""/>
                        </div>
                    </div>
                    <div className={`second-stock`}>
                        <StockTable 
                            data={data}
                            togglePopup={this.togglePopup}
                            toggle={toggle}
                            tableWillUpdate={this.tableWillUpdate}
                        />
                    </div>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Fridge;