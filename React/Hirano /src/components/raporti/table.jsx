import React, { Component } from 'react';
import RaportiMujor from './reportsTable/raportiMujor';
import RaportiKontrollues from './reportsTable/raportiKontrollues';
import RaportiMiksimit from './reportsTable/raportiMiksimit';
import RaportiSubstrateve from './reportsTable/raportiSubstrateve';
import RaportiPaketimit from './reportsTable/raportiPaketimit';
import RaportiKorrjes from './reportsTable/raportiKorrjes';
import RaportiSerave from './reportsTable/raportiSerave';
import RaportiStokut from './reportsTable/raportiStokut';
import RaportiFrizit from './reportsTable/raportiFrizit';
import RaportiPunetoreveSortim from './reportsTable/raportiPunetoreveSortim';
import RaportiPuntoreveKorrje from './reportsTable/raportiPuntoreveKorrje';
import { getLanguage } from '../global/language'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class RaportTable extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            value: 'Raporti Kontrollues',
            filter_date: new Date(new Date().getTime() - (60*60*24*6*1000)),
            filter_date_to: new Date()
        }
    }

    dropdDownChange = (e) => {
        this.setState({
            value: e.target.value
        });
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
        const { value, filter_date, filter_date_to } = this.state;
        const { pasButton } = this.props;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = filter_date.toLocaleString('en-GB', options);
        let to = filter_date_to.toLocaleString('en-GB', options);
        return (  
            <React.Fragment>
                <div className="table-dropdown">
                    <select name="role" id="role" value={value} onChange={this.dropdDownChange}>
                        <option value='Raporti Kontrollues'>{getLanguage().report_control}</option>
                        <option value='Raporti Mujor'>{getLanguage().monthly_report}</option>
                        {/* <option value='Raporti per gjendjen e serave'>{getLanguage().condition_report}</option> */}
                        <option value='Raporti i korrjes'>{getLanguage().harvest_report}</option>
                        <option value='Raporti paketimit'>{getLanguage().packaging_report}</option>
                        <option value='Raporti per peshen e substrateve'>{getLanguage().sub_weight}</option>
                        <option value='Raporti Miksimit'>{getLanguage().mixing_report}</option>
                        <option value='Raporti Stokut'>{getLanguage().stock_report}</option>
                        <option value='Raporti Frizit'>{getLanguage().fridge_report}</option>
                        <option value='Raporti Puntoreve Korrje'>{getLanguage().employee_harvresting}</option>
                        <option value='Raporti Puntoreve Sortim'>{getLanguage().employee_sort}</option>
                    </select>
                    <div className="filter-wrapper raporti">
                        <div className={`filter-date date-input`}>
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
                    </div>
                </div>
                {value === 'Raporti Kontrollues' &&
                    <RaportiKontrollues
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti Mujor' &&
                    <RaportiMujor
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti per gjendjen e serave' &&
                    <RaportiSerave
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti i korrjes' &&
                    <RaportiKorrjes
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti paketimit' &&
                    <RaportiPaketimit
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti per peshen e substrateve' &&
                    <RaportiSubstrateve
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti Miksimit' &&
                    <RaportiMiksimit
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti Stokut' &&
                    <RaportiStokut
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti Frizit' &&
                    <RaportiFrizit
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti Puntoreve Korrje' &&
                    <RaportiPuntoreveKorrje
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
                {value === 'Raporti Puntoreve Sortim' &&
                    <RaportiPunetoreveSortim
                        pasButton={pasButton}
                        filter_date={filter_date}
                        filter_date_to={filter_date_to}
                    />
                }
            </React.Fragment>
        );
    }
}
 
export default RaportTable;