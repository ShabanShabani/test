import React from 'react';
import Form from '../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../all/toast'
import userService from '../../services/userService';
import { getLanguage } from '../../../src/components/global/language'

class PopUp extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id:'',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            errors: {},
            loading: false
        };
    }

    schema = {
        id: Joi.number().integer().allow('').optional(),
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(4).required(),
        confirmPassword: Joi.string().min(4).valid(Joi.ref('password')).required(),
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {data} = this.state;
        if(nextProps.userRow && nextProps.userRow.id)
        {
            const { email, first_name, id, last_name } = nextProps.userRow;
            data.id = id;
            data.firstName = first_name;
            data.lastName = last_name;
            data.email = email;
            this.setState({
                data
            })
            this.schema.password =  Joi.string().allow('').optional()  
        }else{
            data.id='';
            data.firstName= '';
            data.lastName= '';
            data.email= '';
            data.password= '';
            data.confirmPassword= '';
            this.schema.password =  Joi.string().min(4).required().label('Password')
            this.setState({
                data
            })
        }
    }

    dropdDownChange = (e) => {
        const {data} = this.state;
        data.role = e.target.value;
        this.setState({
            data
        });
    }

    handleConfirmPasswordChange = ({ currentTarget: input }) => {
        const schema = {
            password: Joi.string().min(4).required(),
            confirmPassword: Joi.string().min(4).valid(Joi.ref('password')).required(),
        }
        let fieldName = input.name;

        const { data, errors } = this.state;
        const { password, confirmPassword } = data;

        let obj;

        if (fieldName === 'password') {
            obj = {
                password: input.value,
                confirmPassword
            }
            data.password = input.value;
        }
        else {
            obj = {
                password,
                confirmPassword: input.value
            }
            data.confirmPassword = input.value;
        }

        const { error } = Joi.validate(obj, schema);
        delete errors['confirmPassword'];
        delete errors['password'];
        if (!error) {
        }
        else {
            error.details.forEach(err => {
                errors[err.path[0]] = 'Ju lutem kontrollojeni perseri!';
            })
        }
        data[input.name] = input.value;

        this.setState({
            data,
            errors
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        const { id, firstName, lastName, email, password } = this.state.data;
        
        if(id)
        {
            userService.edit(id, firstName, lastName, email ).then(({ data }) => {
                this.props.togglePopup();
                this.props.tableWillUpdate();
                this.setState({
                    loading: false
                })
                toast.success("Useri u editua me sukses.");
            }).catch(err => {
                toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
                this.setState({
                    loading: false
                })
            })
        }else{
            userService.add(firstName, lastName, email, password ).then(({ data }) => {
                this.props.togglePopup();
                this.props.tableWillUpdate();
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

    render() { 
        const { toggle, togglePopup } = this.props;
        const { data, errors, loading } = this.state;
        const {id, firstName, lastName, email, password, confirmPassword } = data;
        return ( 
            <div className={`popup-form ${toggle ? 'active' : ''}`}>
                <div className={`popup-inside`}>
                    <img onClick={togglePopup} className="plus" src="./assets/img/plus-color.svg" alt=""/>
                    <form onSubmit={this.handleSubmit}>
                        {!id ?
                            <span>{getLanguage().add_user}</span>
                            :
                            <span>{getLanguage().edit_user}</span>
                        }
                        <div className="inputs">
                            {this.renderInput("firstName", null, 'firstName', firstName, this.handleChange, errors.firstName, false, `${getLanguage().first_name}`)}
                            {this.renderInput("lastName", null, 'lastName', lastName, this.handleChange, errors.lastName, false, `${getLanguage().last_name}`)}
                            {this.renderInput("email", null, 'email', email, this.handleChange, errors.email, false, "Email")}
                            {!id &&
                                <React.Fragment>
                                    {this.renderInput("password", null, "password", password, this.handleConfirmPasswordChange, errors.password, false, `${getLanguage().password}`, false, "password")}
                                    {this.renderInput("confirmPassword", null, "confirmPassword", confirmPassword, this.handleConfirmPasswordChange, errors.confirmPassword, false, `${getLanguage().c_password}`, false, "password")}
                                </React.Fragment>                                
                            }
                            {!id ?
                                <div className={`popup-button`}>
                                    {this.renderSubmitButton(`${getLanguage().add_user}`, loading)}
                                </div>
                                :
                                <div className={`popup-button`}>
                                    {this.renderSubmitButton(`${getLanguage().edit_user}`, loading)}
                                </div>
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default PopUp;