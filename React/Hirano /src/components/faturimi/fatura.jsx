import React from 'react';
import Form from '../../all/common/form';
import * as toast from '../../all/toast'
import Joi from 'joi-browser';
import TableFatura from './tableFatura';
import invoiceService from '../../services/invoiceService';
import Popup from './popup';
import { getLanguage } from '../global/language';

class Fatura extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                client_name: '',
                business_number: '',
                address: '',
                type: 'blloqe',
                plants: [],
                total: 0,
                sasia: 0
            },
            errors: {},
            loading: '',
            product: [],
            showPopup: false,
            rowData: {}
        };
    }

    schema = {
        id: Joi.number().integer().optional(),
        client_name: Joi.string().required(),
        business_number: Joi.number().integer().required(),
        address: Joi.string().required(),
        type: Joi.string().required(),
        plants: Joi.array(),
        total: Joi.number().integer().required(),
        sasia: Joi.number().integer().required(),
    }

    dropdDownChange = (e) => {
        let { product, data } = this.state;
        data.type = e.target.value;
        this.setState({
            data
        });
        if (data.type === 'blloqe') {
            invoiceService.getBlocks().then(({ data: response }) => {
                product = [].concat(response);
                this.setState({
                    product
                })
            }).catch(err => {
                this.setState({
                    loading: false
                })
            })
        } else {
            invoiceService.getMushroom().then(({ data: response }) => {
                product = [].concat(response);
                this.setState({
                    product
                })
            }).catch(err => {
                this.setState({
                    loading: false
                })
            })
        }
    }

    onClientName = (event) => {
        const { data } = this.state;
        const value = event.target.value
        data.client_name = value;
        this.setState({
            data
        })
    }

    onBusinessNumber = (event) => {
        const { data } = this.state;
        const value = event.target.value
        data.business_number = value;
        this.setState({
            data
        })
    }

    onAddress = (event) => {
        const { data } = this.state;
        const value = event.target.value
        data.address = value;
        this.setState({
            data
        })
    }

    componentDidMount() {
        let { product } = this.state;
        invoiceService.getBlocks().then(({ data: response }) => {
            product = [].concat(response);
            this.setState({
                product
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        const { client_name, business_number, address, plants, total, sasia } = this.state.data;

        invoiceService.post(client_name, business_number, address, plants, total, sasia).then(({ data }) => {
            this.setState({
                loading: false
            })
            toast.success("Success.");
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    toggleClick = (rowData) => {
        // this.props.history.push({
        //     pathname: '/order',
        //     state: { 
        //         data: rowData,
        //         client_id: client_id,
        //         appointment_id: appointment_id
        //     }
        // })  
        this.setState({
            showPopup: !this.state.showPopup,
            rowData: rowData

        })
    }

    togglePopup = () => {
        this.setState({
            showPopup: false
        })
    }

    addPlant = (price) => {
        let { rowData, data, product } = this.state;
        let { plants, type } = data;
        plants.push(
            {
                plant_id: rowData.id,
                nr_blocks: rowData.nr_produced_blocks,
                price: price,
                type: type
            }
        )
        const tasks = product.filter(task => task.id !== rowData.id);
        data.total = parseInt(data.total) + parseInt(price);
        data.sasia += rowData.nr_produced_blocks;
        this.setState({
            data,
            showPopup: false,
            product: tasks
        })
    }

    // onRemoveProduct = (plant_id) => {
    //     let { data } = this.state;
    //     const tasks = data.plants.filter(task => task.plant_id !== plant_id);
    //     data.plants = tasks; 
    //     this.setState({
    //         data
    //     })
    // }

    onPrintButton = () => {
        window.print()
    }

    render() {
        const { data, errors, loading, product, showPopup } = this.state;
        const { client_name, business_number, address, type, plants, total, description, quantity, volume, unit_price } = data;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today = new Date().toLocaleString('en-GB', options);
        return (
            <React.Fragment>
                <div className={`fatura`} >
                    <div className={`edit-invoice`}>
                        <Popup
                            togglePopup={this.togglePopup}
                            toggle={showPopup}
                            addPlant={this.addPlant}
                        />
                        <form onSubmit={this.handleSubmit}>
                            <div className="materials">
                                {this.renderInput2(this.onClientName, "client_name", null, 'client_name', client_name, this.handleChange, errors.client_name, false, `${getLanguage().client_name}`)}
                            </div>
                            <div className="materials">
                                {this.renderInput2(this.onBusinessNumber, "business_number", null, 'business_number', business_number, this.handleChange, errors.business_number, false, `${getLanguage().business_nr}`)}
                            </div>
                            <div className="materials">
                                {this.renderInput2(this.onAddress, "address", null, 'address', address, this.handleChange, errors.address, false, `${getLanguage().address}`)}
                            </div>
                            <div className="materials">
                                {this.renderInput2(this.onDescription, "description", null, 'description', description, this.handleChange, errors.description, false, `${getLanguage().description}`)}
                            </div>
                            <div className="materials">
                                {this.renderInput2(this.onQuantity, "quantity", null, 'quantity', quantity, this.handleChange, errors.quantity, false, `${getLanguage().quantity}`)}
                            </div>
                            <div className="materials">
                                {this.renderInput2(this.onVolume, "volume", null, 'volume', volume, this.handleChange, errors.volume, false, `${getLanguage().volume}`)}
                            </div>
                            <div className="materials">
                                {this.renderInput2(this.onUnitprice, "unit_price", null, 'unit_price', unit_price, this.handleChange, errors.unit_price, false, `${getLanguage().unit_price}`)}
                            </div>
                            <div className="materials">
                                <div className="input-field input-form input-control">
                                    <span className="input-name">{getLanguage().pick_product}</span>
                                    <select name="type" id="type" value={type} onChange={this.dropdDownChange}>
                                        <option value="" default>{getLanguage().pick_product}</option>
                                        <option value="blloqe">{getLanguage().blocks}</option>
                                        <option value="kerpurdha">{getLanguage().mushrooms}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-button">
                                {this.renderSubmitButton(`${getLanguage().save_data}`, loading, "")}
                            </div>
                        </form>
                        <div className={`table-add`}>
                            <TableFatura
                                data={product}
                                toggleClick={this.toggleClick}
                            />
                        </div>
                        <div className="form-button">
                            <button onClick={this.onPrintButton} className={`no-print`} >{getLanguage().print}</button>
                        </div>
                    </div>
                    <div className={`container-fatura`}>
                        <div className={`header`}>
                            <div className={`content`}>
                                <div className={`invoice`}>
                                    <span>{getLanguage().invoice}</span>
                                </div>
                                <div className={`date`}>
                                    {/* <span>{getLanguage().date}:</span> */}
                                    <span>06/11/2019</span>
                                </div>
                            </div>
                            <div className={`logo`}>
                                <img src="./assets/img/logoWhite.png" alt="" />
                            </div>
                        </div>
                        <div className="body">
                            <div className="date-price">
                                <div className="dates">
                                    <div className="invoice-date">
                                        <span className="invoice-type">Invoice Date:</span> <span>{today}</span>
                                    </div>
                                    <div className="payment-date">
                                        <span className="invoice-type">Payment Due:</span> <span>{today}</span>
                                    </div>
                                </div>
                                <div className="price">
                                    <span>{total}€</span>
                                </div>
                            </div>
                            <div className="unloading-bill">
                                <div className="uloading">
                                    <p className="darker-text">Unloading Place</p>
                                    <p>Company:</p>
                                    <p>Contact Person:</p>
                                    <p>Address:</p>
                                    <p>Phone:</p>
                                </div>
                                <div className="bill">
                                    <p className="darker-text">BILL TO: </p>
                                    <p>Company:</p>
                                    <p>Contact Person: {client_name}</p>
                                    <p>Address: {address}</p>
                                    <p>Phone:</p>
                                </div>
                            </div>
                            <div className="table-data">
                                <table className="invoice-table">
                                    <tr>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Volume</th>
                                        <th>Unit Price</th>
                                        <th>Quantity NET <br /> (KG)</th>
                                        <th>Gross Quantity<br /> (KG)</th>
                                        <th>{getLanguage().total}</th>
                                    </tr>
                                    {
                                        plants.map((plant, index) =>
                                            <tr key={index}>
                                                <td>Sterilized Shiitake Substrate (Shiitake Mushroom Spawn)</td>
                                                <td>{plant.nr_blocks}</td>
                                                <td>1.20 kg</td>
                                                <td>0.90 €</td>
                                                <td>240.00 kg</td>
                                                <td>240.00 kg</td>
                                                <td>180€</td>
                                            </tr>
                                        )
                                    }
                                </table>
                            </div>
                            <div className="input-invoices">
                                <div className="first-invoiceinput">
                                    <span>Port crossing point</span>
                                    <input type="text" value="PKK Jarinje" />
                                </div>
                                <div className="first-invoiceinput">
                                    <span>Entry Port to UK</span>
                                    <input type="text" value="Entry port to UK" />
                                </div>
                            </div>
                            <div className="last-invoice-part">
                                <div className="left-invoice-part">
                                    <ul>
                                        <li><span className="darker-text-span">PLATES:</span></li>
                                        <li><span className="darker-text-span">Pallets:</span> 1</li>
                                        <li><span className="darker-text-span">Net Weight Total:</span> 240.00 kg</li>
                                        <li><span className="darker-text-span">Gross Weight Total:</span>262.00 kg</li>
                                    </ul>
                                </div>
                                <div className="right-invoice-part">
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li><span className="darker-text-span">Discount</span> 0.00 €</li>
                                        <li><span className="darker-text-span">Net Total:</span>{total}€</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="payment-company">
                                <div className="payment">
                                    <p className="darker-text">Payment Details:</p>
                                    <p>Name of Benificiary:</p>
                                    <p>Name of Bank:</p>
                                    <p>Account Number:</p>
                                    <p>Routing Number</p>
                                    <p>Payment Reference</p>
                                </div>
                                <div className="company">
                                    <p className="darker-text">{getLanguage().company_details}:</p>
                                    <p>{client_name}</p>
                                    <p>VAT number: {business_number}</p>
                                    <p>Fiscal Number:</p>
                                    <p>{address}</p>
                                    <p></p>
                                </div>
                            </div>
                            {/* <div className={`body-info`}>
                                <div className={`body-left`}>
                                    <span className={`size`}>{getLanguage().company_details}: </span>
                                    <span className={``}><strong>{getLanguage().first_name}:</strong> Hirano Mushroom</span>
                                    <span className={``}><strong>{getLanguage().company}:</strong> Hirano Mushroom</span>
                                    <span className={``}><strong>{getLanguage().address}:</strong> Mitrovice</span>
                                </div>
                                <div className={`body-right`}>
                                    <span className={`size`}>Bill to: </span>
                                    <span className={``}><strong>{getLanguage().first_name}:</strong> {client_name}</span>
                                    <span className={``}><strong>{getLanguage().company}:</strong> {business_number}</span>
                                    <span className={``}><strong>{getLanguage().address}:</strong> {address}</span>
                                </div>
                            </div> */}
                            {/* <div className={`table`}>
                                <div className={`table-header`}>
                                    <div className={`head big`} >{getLanguage().name_of_product}</div>
                                    <div className={`head`} >{getLanguage().quantity}</div>
                                    <div className={`head`} >{getLanguage().price}</div>
                                    <div className={`head`} >{getLanguage().unit}</div>
                                </div>
                                <div className={`table-body`} >
                                    {
                                        plants.map((plant, index) =>
                                            <div key={index} className={`table-row`}>
                                                <div className={`head big`}>{plant.plant_id}</div>
                                                <div className={`head`}>{plant.nr_blocks}</div>
                                                <div className={`head`}>{plant.price}€</div>
                                                <div className={`head`}>{plant.type}</div>
                                                <span onClick={this.onRemoveProduct.bind(this, plant.plant_id )}>X</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={`total-table`}>
                                <div className={`head big`} >{getLanguage().total}</div>
                                <div className={`head`} >{sasia}</div>
                                <div className={`head`} >{total}€</div>
                                <div className={`head`} >----</div>
                                <div className={`head`} >----</div>
                            </div>  */}
                        </div>
                        {/* <div className={`footer`}>
                            <div className={`logo`}>
                                <img src="./assets/img/logo2.png" alt="" />
                            </div>
                            <div className={`content`}>
                                <div className={`info`}>
                                    <span>www.hiranomushroom.com</span>
                                </div>
                                <div className={`date`}>
                                    <span>info@hirano.com</span>
                                    <span>049-111-111</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Fatura;