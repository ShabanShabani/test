import React from 'react';
import Form from '../../all/common/form';
import Joi from 'joi-browser';
import 'semantic-ui-css/semantic.min.css'

class Popup extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                price: 0
            },
            errors: {}
        };
    }

    schema = {
        price: Joi.number().integer().required()
    }

    render(){
        const { data, errors } = this.state;
        const { price } = data;
        const {toggle, togglePopup, addPlant} = this.props;
        return(
            <React.Fragment>
                <div className={`popup-form stoku ${toggle ? 'active' : ''}`}>
                    <div className={`fatura popup-inside`}>
                        <img onClick={togglePopup} className="plus" src="./assets/img/plus-color.svg" alt=""/>
                        <span className="title">Cakto Cmimin</span>
                        <div className="materials">
                            {this.renderInput("price", null, 'price', price, this.handleChange, errors.price, false, "Qmimi", false, 'number')}
                        </div>
                        <div className={`form-button`}>
                            <button type='button' onClick={addPlant.bind(this, price)}>Shto ne Fatur</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Popup;
