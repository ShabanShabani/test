import React from 'react';
import Form from '../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../all/toast';
import { Dropdown } from "semantic-ui-react";
import stockService from '../../services/stockService';
import 'semantic-ui-css/semantic.min.css'
import { getLanguage } from '../global/language'

class Popup extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                quantity: '',
                unit: '',
                price: '',
                supplier: '',
                otherName: '',
                min_stock: 0
            },
            errors: {},
            options: [],
            loading: ''
        };
    }

    schema = {
        id: Joi.number().integer().allow('').optional(),
        name: Joi.string().required(),        
        otherName: Joi.string().allow('').optional(),        
        quantity: Joi.number().integer().required(),        
        unit: Joi.string().required(),
        price: Joi.number().integer().required(),
        min_stock: Joi.number().integer().required(),
        supplier: Joi.string().when('id', { 
            is: '',
            then: Joi.string().required(),
            otherwise: Joi.string().allow("").optional(),
        }),
    }

    componentDidMount() {
        stockService.get().then(({ data: response }) => {
            this.setState({
              options: [].concat(response)
            });
        })
        .catch(err => {
            if (err.response && err.response.status === 400) {
              this.props.history.push("/user-profile");
            }
            toast.error("Something went wrong. Please refresh the page.");
        });
    }

    handleAddition = e => {
        let name = e.target.value;
        stockService.post(name).then(({ data: response }) => {
            this.setState({
                options: [].concat(response)
            });
        })
        .catch(err => {
            if (err.response && err.response.status === 400) {
            this.props.history.push("/user-profile");
            }
            toast.error("Duplicate.");
        });
    };
    
    handleChangeDropdown = (e, { value }) => {
        const { data } = this.state;
        data.otherName = value;
        this.setState({
          data
        });
    };
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        const {data} = this.state;
        if(nextProps.userRow && nextProps.userRow.id)
        {
            const { id, name, quantity, unit, price } = nextProps.userRow;
            data.id = id;
            data.name = name;
            data.quantity = quantity;
            data.unit = unit;
            data.price = price;
            this.setState({
                data
            })
        }else{
            data.id='';
            data.name= '';
            data.quantity= '';
            data.unit= '';
            data.price= '';
            this.setState({
                data
            })
        }
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        const {id, name, quantity, unit, price, supplier, otherName, min_stock } = this.state.data;

        if(id && this.props.edit === 'edit')
        {
            stockService.put(name, quantity, unit, price, supplier, otherName).then(({ data }) => {
                this.props.tableWillUpdate();
                this.props.togglePopup();
                this.setState({
                    loading: false
                })
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }else if(id && this.props.edit === 'limit')
        {
            stockService.putLimit(name, min_stock).then(({ data }) => {
                this.props.tableWillUpdate();
                this.props.togglePopup();
                this.setState({
                    loading: false
                })
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }else{
            stockService.postStock(name, quantity, unit, price, supplier, otherName).then(({ data }) => {
                this.props.tableWillUpdate();
                this.props.togglePopup();
                this.setState({
                    loading: false
                })
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }
    }

    dropdDownChange = (e) => {
        const {data} = this.state;
        data.name = e.target.value;
        this.setState({
            data
        });
    }

    dropdDownChangeUnit = (e) => {
        const {data} = this.state;
        data.unit = e.target.value;
        this.setState({
            data
        });
    }

    render(){
        const { options, data, errors, loading} = this.state;
        const { id, name, quantity, unit, price, supplier, otherName, min_stock } = data;
        const { toggle, togglePopup, edit} = this.props;
        return(
            <React.Fragment>
                <div className={`popup-form stoku ${toggle ? 'active' : ''}`}>
                    <div className={`popup-inside`}>
                        <img onClick={togglePopup} className="plus" src="./assets/img/plus-color.svg" alt=""/>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            {!id ?
                                <span className="title">{getLanguage().add_stock}</span>
                                :
                                <span className="title">{getLanguage().edit} {name}</span>
                            }
                            <div className="inputs">
                                {!id && 
                                    <div className="input-field input-form input-control">
                                        <span className="input-name">{getLanguage().pick_product}</span>
                                        <select name="name" id="name" value={name} onChange={this.dropdDownChange}>
                                            <option value="" default>{getLanguage().pick_product}</option>
                                            <option value="Dru Ahu">{getLanguage().b_wood}</option>
                                            <option value="Dru Bung">{getLanguage().o_wood}</option>
                                            <option value="Krunde">Krunde</option>
                                            <option value="Miser i Bluar">Miser i Bluar</option>
                                            <option value="Gips">Gips</option>
                                            <option value="Shkums">Shkums</option>
                                            <option value="Gaz">Gaz</option>
                                            <option value="Kese">Kese</option>
                                            <option value="Tjeter">Tjeter</option>
                                        </select>
                                    </div>
                                }
                                {name === 'Tjeter' &&
                                    <React.Fragment>
                                        <div className={`input-field input-form input-control`}>
                                            <span className="input-name">{getLanguage().pick_product}</span>
                                            <Dropdown
                                                allowAdditions={true}
                                                onAddItem={this.handleAddition}
                                                onChange={this.handleChangeDropdown}
                                                placeholder="Product Name"
                                                defaultValue={otherName}
                                                defaultOpen={true}
                                                fluid
                                                search
                                                selection
                                                options={options}
                                            />   
                                        </div>                            
                                    </React.Fragment>
                                }
                                {(edit === 'edit' || edit === 'addStock') &&
                                    <React.Fragment>
                                        {this.renderInput("quantity", null, 'quantity', quantity, this.handleChange, errors.quantity, false, "Sasia")}
                                    </React.Fragment>
                                }
                                {edit === 'limit' &&
                                    <React.Fragment>
                                        {this.renderInput("min_stock", null, 'min_stock', min_stock, this.handleChange, errors.min_stock, false, "Minimum Stock")}
                                    </React.Fragment>
                                }
                                {!id &&
                                    // this.renderInput("unit", null, 'unit', unit, this.handleChange, errors.unit, false, "Njesia")
                                    <div className="input-field input-form input-control">
                                        <span className="input-name">{getLanguage().unit}</span>
                                        <select name="name" id="name" value={unit} onChange={this.dropdDownChangeUnit}>
                                            <option value="" default>{getLanguage().choose_unit}</option>
                                            <option value="m3">m3</option>
                                            <option value="kg">kg</option>
                                            <option value="cop">cop</option>
                                            <option value="liter">liter</option>
                                        </select>
                                    </div>
                                }
                                {!id &&
                                    <React.Fragment>
                                        {this.renderInput("price", null, 'price', price, this.handleChange, errors.price, false, `${getLanguage().price}`)}
                                        {this.renderInput("supplier", null, 'supplier', supplier, this.handleChange, errors.supplier, false, `${getLanguage().supplier}`)}
                                    </React.Fragment>
                                }
                                <div className={`popup-button`}>
                                    {/* <button>Dergo</button> */}
                                    {this.renderSubmitButton(`${getLanguage().send}`, loading)}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Popup;
