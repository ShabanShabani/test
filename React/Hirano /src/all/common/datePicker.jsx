import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class DatePickerr extends Component{
        
    render() {
        const {disabled = false, name, id, value, onChange, error = false, placeholder } = this.props;
        const inputClasses = error ? 'input-control is-invalid' : 'input-control';
        return (
            <React.Fragment>
                <div name={name}  id={id} className={`input-form ` + inputClasses}>
                    <span className="input-name">{placeholder}</span>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                disabled={disabled}
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                placeholder={placeholder}
                                value={value}
                                InputProps={{ readOnly: true }}
                                onChange={date => onChange(date)}
                                KeyboardButtonProps = 
                                {{
                                    'aria-label': 'change date',
                                }}
                            />
                    </MuiPickersUtilsProvider>
                </div>
            </React.Fragment> 
        );
    }
}

export default DatePickerr;