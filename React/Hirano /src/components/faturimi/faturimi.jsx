import React from 'react';
import Form from '../../all/common/form';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import StockTable from './table';
import invoiceService from '../../services/invoiceService';
import { getLanguage } from '../global/language'

class Faturimi extends Form {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            errors: {},
            loading: '',
            invoices: []
        };
    }

    togglePopup = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    componentDidMount() {
        let { invoices } = this.state;
        invoiceService.getAll().then(({ data : response }) => {
            invoices = [].concat(response);
            this.setState({
                invoices
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    render() { 
        const {invoices} = this.state;
        return (
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                {/* <RightPart /> */}
                <div id="faturimi" className={`main`} >
                    <div className={`first-faturimi`} >
                        <span className="faturimi-title">Faturimi</span>
                        <div className={`create-button`}>
                            <span className="title">{getLanguage().create_invoice}</span>
                            <a href="/fatura" target="_blank" >
                                <div className={`button`}>
                                    <img src="./assets/img/plus.svg" alt=""/>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={`second-faturimi`}>
                        <StockTable
                            data={invoices}
                        />
                    </div>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Faturimi;