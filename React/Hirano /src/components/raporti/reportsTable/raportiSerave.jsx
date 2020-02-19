import React, { Component } from 'react';
import MaterialTable from 'material-table'
// import temperatureService from '../../../services/temperatureService';
import reportService from '../../../services/reportService';

class RaportiSerave extends Component {
     
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,
            columns: [
                { title: 'Koha', field: 'time' },
                { title: 'Numri i serres', field: 'green_house_id' },
                { title: 'Temperatura(Rrota)', field: 'temperature' },
                { title: 'Temperatura ne bllok (Hyrje)', field: "block_temperature_entry" },
                { title: 'Temperatura ne bllok (Mes)', field: "block_temperature_middle" },
                { title: 'Temperatura ne bllok (Dalje)', field: "block_temperature_exit" },
                { title: 'Lageshtia', field: "humidity" },
                { title: 'C0 2 (Ekran)', field: "display_co2" },
                { title: 'C0 2 (Hyrje)', field: 'entry_co2' },
                { title: 'Diferenca', field: '', render: rowData=> rowData.display_co2 - rowData.entry_co2 },
                { title: 'Max CO2', field: 'mixer_block_production.gips' },
                { title: 'CO2 (Mes)', field: 'mixer_block_production.gips' },
                { title: 'Diferenca', field: 'mixer_block_production.gips' },
                { title: 'Max CO2', field: 'mixer_block_production.gips' },
                { title: 'CO2 (Dalje)', field: 'mixer_block_production.gips' },
                { title: 'Diferenca', field: 'mixer_block_production.gips' },
                { title: 'Max CO2', field: 'mixer_block_production.gips' },
                { title: 'Totali I Bllokave Të infektuar', field: 'mixer_block_production.shkums' }
            ],
            data: [],
        }
    }

    componentDidMount(){
        this.props.pasButton()
        let { month, year } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = month.toLocaleString('en-GB', options);
        let to = year.toLocaleString('en-GB', options);
        reportService.getRaportiSerave(from, to).then(({ data : response }) => {
            this.setState({
                data:[].concat(response),
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.pasButton()
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = nextProps.filter_date.toLocaleString('en-GB', options);
        let to = nextProps.filter_date_to.toLocaleString('en-GB', options);
        reportService.getRaportiSerave(from, to).then(({ data : response }) => {
            this.setState({
                data:[].concat(response),
                loading: false
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    render() { 
        let menuItems = [];
        for (var i = 2019; i <= parseInt(new Date().getFullYear()); i++) {
            if(i=== parseInt(new Date().getFullYear())){
                menuItems.push(<option key={`year${i}`} value={i} selected>{i}</option>);
            }
            else{
                menuItems.push(<option key={`year${i}`} value={i}>{i}</option>);
            }
        }
        const { columns, data, month, year } = this.state;
        return (  
            <React.Fragment>
                <MaterialTable
                    title=''
                    data={data}
                    columns={columns}
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parent_id)}
                    options={{
                        exportButton: true,
                        filtering: true,
                        pageSizeOptions: [5, 10, 20, 50, data.length],
                        pageSize:data.length,
                        exportFileName: `Raporti per gjendjen e serave me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiSerave;