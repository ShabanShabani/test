import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import TemperaturaSera from './temperaturaSera';
import TemperaturaKultivim from './temperaturaKultivim';
import 'react-day-picker/lib/style.css';
import { getLanguage } from '../global/language';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class Temperatura extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            toggle: 'first',
            filter_date: new Date(new Date().getTime() - (60*60*24*6*1000)),
            filter_date_to: new Date()
        }
    }

    toggleTemperature = (toggle) =>
    {
        this.setState({
            toggle: toggle
        })
    }

    onFilterByDate = value => {
        this.setState({
            filter_date: value
        })
    }

    onFilterByDate1 = value => {
        this.setState({
            filter_date_to: value
        })
    }

    render() { 
        const { toggle, filter_date, filter_date_to } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = filter_date.toLocaleString('en-GB', options);
        let to = filter_date_to.toLocaleString('en-GB', options);
        return ( 
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                {/* <RightPart /> */}
                <div id="temperatura" className={`main`} >
                    <div className={`first-card temp-menu`} >
                        <div>
                            <div className={`temp-wrapper ${toggle === 'first' ? 'active' : ''}`}>
                                <span onClick={() => this.toggleTemperature('first')}>{getLanguage().rising_temp}</span>
                            </div>
                            <div className={`temp-wrapper ${toggle === 'second' ? 'active' : ''}`}>
                                <span onClick={() => this.toggleTemperature('second')}>{getLanguage().cultivation_temp}</span>
                            </div>
                        </div>
                        <div className="filter-wrapper">
                            {toggle === 'first' ?
                                <div className={`filter-date date-input`}>
                                    {/* <label>{getLanguage().filter_by_date}:</label> */}
                                    <div className={`range-picker`}>
                                        <p>{getLanguage().from}:</p>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                format="dd/MM/yyyy"
                                                value={from}
                                                InputProps={{ readOnly: true }}
                                                onChange={this.onFilterByDate}
                                                KeyboardButtonProps = 
                                                {{
                                                    'aria-label': 'change date',
                                                }}
                                                disableFuture
                                                maxDate={to}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className={`range-picker`}>
                                        <p>{getLanguage().to}:</p>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                format="dd/MM/yyyy"
                                                value={to}
                                                InputProps={{ readOnly: true }}
                                                onChange={this.onFilterByDate1}
                                                KeyboardButtonProps = 
                                                {{
                                                    'aria-label': 'change date',
                                                }}
                                                disableFuture
                                                minDate={from}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                                :
                                <div className={`filter-date date-input`}>
                                    {/* <label>{getLanguage().filter_by_date}:</label> */}
                                    <div className={`range-picker`}>
                                        <p>{getLanguage().from}:</p>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                format="dd/MM/yyyy"
                                                value={from}
                                                InputProps={{ readOnly: true }}
                                                onChange={this.onFilterByDate}
                                                KeyboardButtonProps = 
                                                {{
                                                    'aria-label': 'change date',
                                                }}
                                                disableFuture
                                                maxDate={to}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className={`range-picker`}>
                                        <p>{getLanguage().to}:</p>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                format="dd/MM/yyyy"
                                                value={to}
                                                InputProps={{ readOnly: true }}
                                                onChange={this.onFilterByDate1}
                                                KeyboardButtonProps = 
                                                {{
                                                    'aria-label': 'change date',
                                                }}
                                                disableFuture
                                                minDate={from}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <TemperaturaSera
                        toggle={toggle}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                    <TemperaturaKultivim 
                        toggle={toggle}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                </div>
            </React.Fragment>
         );
    }
}
 
export default Temperatura;