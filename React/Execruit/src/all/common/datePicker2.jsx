import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

class DatePickerr2 extends Component {

    render() {
        const {
            present = false, disabled = false, name, label, id, value, onChange, error = false, onChangeCheckBox, checked, placeholder } = this.props;
        const inputClasses = error ? 'input-control is-invalid' : 'input-control';
        var addClass = '';
        if (present) {
            addClass = 'show';
        }
        
       
        return (
            <React.Fragment>
                <div name={name} disabled={disabled} id={id} className={`input-form datepicker ` + inputClasses}>
                    <div className={`${checked ? 'disabled' : ''}`}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                // minDate={today}
                                margin="normal"
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                placeholder={placeholder}
                                value={value}
                                onChange={date => onChange(date)}
                                inputProps={{ disabled: checked }}
                                KeyboardButtonProps=
                                {{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className={`present ` + addClass}>
                        <input type="checkbox" onChange={onChangeCheckBox} value={checked} checked={checked ? 'checked' : ''} />
                        <label>Present</label>
                    </div>
                    <p className={`error-message ` + inputClasses}>{label} {error}</p>
                </div>
            </React.Fragment>
        );
    }
}

export default DatePickerr2;