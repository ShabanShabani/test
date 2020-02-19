import React, { Component } from 'react';
import Input from './input';
import Input2 from './input2';
import DatePicker from './datePicker';
import Joi from 'joi-browser'
import Checkbox from './checkbox';
import UploadInput from './upload-input';
import TextArea from './text-area';
import RadioButton from './radioButton';
import getSocket from '../common/socket';

class Form extends Component
{
    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!error) return null;
            
        const errors = {};
        error.details.map(p => {
            return errors[p.path[0]] = p.message
        });
        console.log(errors);
        return errors;
    }

    validateProperty = (input, depend) => {
        const { name, value } = input;

        const obj = { [name]: value }
        var schema = {
            [name]: this.schema[name]
        }
        
        if (depend) {
            obj[depend] = this.state.data[depend]
            schema[depend] = this.schema[depend]
        }
        const { error } = Joi.validate(obj, schema);
        if (!error) return null;
        
        let errors = [];
        error.details.forEach(detail => {
            errors.push({ name: detail.path[0], value: detail.message })
        })
        return errors
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        let depend = null;
        if (input.type !== 'file' && input.type !== 'editor' && input.type !== 'slider') {
            depend = input.dataset['depend']
        }

        const errorMessage = this.validateProperty(input, depend);
        if (!errorMessage || errorMessage.filter(p => p.name === input.name).length === 0) {
            delete errors[input.name];
            if (depend) delete errors[depend]
        }
        else {
            errorMessage.forEach(p => {
                errors[p.name] = p.value;
            })
        }

        const data = { ...this.state.data };
        if (input.type === 'checkbox') {
            data[input.name] = !data[input.name];
        }
        else if (data.type === 'file') {
            data[input.name] = data[input.value]
        }
        else {
            data[input.name] = input.value;
        }
        this.setState({
            data,
            errors
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        getSocket().emit('activity');
        this.submitForm();
    }

    renderSubmitButton(label, loading = false, className = '') {
        let labelName = label;
        if (loading) {
            labelName = "loading..."
        }
        return (
            <button disabled={loading ? loading : this.validate()} type='submit' className={`myButton ${className}`}>{labelName}</button>
        )
    }

    renderSubmitButton2(label, loading = false, className = '', onclick) {
        let labelName = label;
        if (loading) {
            labelName = "loading..."
        }
        return (
            <button disabled={loading ? loading : this.validate()} onClick={onclick} type='submit' className={`myButton ${className}`}>{labelName}</button>
        )
    }

    renderInput(name, label, id, value, onChange, error, horizontal, placeholder, disabled, type = 'text', depend = null, tooltip = false, message = "") {
        return (
            <Input validate={this.validate} name={name} placeholder={placeholder} label={label} tooltip={tooltip} depend={depend} message={message} id={id} value={value} onChange={onChange} disabled={disabled} error={error} horizontal={horizontal} type={type} />
        )
    }

    renderInput2(onKeyUp, name, label, id, value, onChange, error, horizontal, placeholder, disabled, type = 'text', depend = null, tooltip = false, message = "") {
        return (
            <Input2 onKeyUp={onKeyUp} validate={this.validate} name={name} placeholder={placeholder} label={label} tooltip={tooltip} depend={depend} message={message} id={id} value={value} onChange={onChange} disabled={disabled} error={error} horizontal={horizontal} type={type} />
        )
    }

    renderDatePicker(present ,name, label, id, value, onChange, error, disabled, onChangeCheckBox, checked, placeholder) {
        return (
            <DatePicker present={present} validate={this.validate} name={name} label={label} id={id} value={value} onChange={onChange} error={error} disabled={disabled} onChangeCheckBox={onChangeCheckBox} checked={checked} placeholder={placeholder} />
        )
    }

    renderTextArea(name, label, id, value, onChange, error, horizontal, disabled, rows, tooltip = false, message = "") {
        return (
            <TextArea name={name} label={label} tooltip={tooltip} message={message} id={id} value={value} onChange={onChange} disabled={disabled} error={error} horizontal={horizontal} rows={rows} />
        )
    }

    renderCheckbox(name, label, id, value, onChange, error, horizontal, disabled, depend, tooltip = false, message = "") {
        return (
            <Checkbox name={name} tooltip={tooltip} message={message} label={label} depend={depend} id={id} value={value} onChange={onChange} disabled={disabled} error={error} horizontal={horizontal} />
        )
    }

    renderRadioButton( checked, name, value, onChange, id, error, disabled = false, depend = null){
        return (
            <RadioButton checked={checked}  name={name} value={value} disabled={disabled} onChange={onChange} id={id} error={error} data-depend={depend} />
        )
    }

    renderUploadInput(name, value, allowedTypes, onChange, error, maxFiles,) {
        return (
            <UploadInput name={name} value={value} allowedTypes={allowedTypes} onChange={onChange} error={error} maxFiles={maxFiles}/>
        )
    }
}
export default Form;