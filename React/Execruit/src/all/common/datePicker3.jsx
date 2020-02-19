import React, { Component } from 'react';
import 'react-day-picker/lib/style.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

class DatePickerr3 extends Component {

    render() {
        const {
             disabled = false, name, label, id, value, onChange, error = false,  checked, placeholder } = this.props;
        const inputClasses = error ? 'input-control is-invalid' : 'input-control';

        return (
            <React.Fragment>
                <div name={name} disabled={disabled} id={id} className={`input-form datepicker ` + inputClasses}>
                    <div className={`${checked ? 'disabled' : ''}`}>
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            <DateTimePicker
                                margin="normal"
                                id="date-picker-dialog"
                                minDate={new Date("2019-01-01T00:00")}
                                format="dd/MM/yyyy hh:mm a"
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
                    <p className={`error-message ` + inputClasses}>{label} {error}</p>
                </div>
            </React.Fragment>
        );
    }
}

export default DatePickerr3;