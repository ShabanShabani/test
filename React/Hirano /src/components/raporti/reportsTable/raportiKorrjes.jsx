import React, { Component } from 'react';
import MaterialTable from 'material-table'
// import temperatureService from '../../../services/temperatureService';
import reportService from '../../../services/reportService';

class RaportiKorrjes extends Component {
     
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,
            columns: [
                { title: 'Nr.', field: 'id' },
                { title: 'Emri dhe Mbiemri i punëtorit', field: ' ', render: rowData=> <span>{rowData.user.first_name} {rowData.user.last_name}</span> },
                { title: 'Orë pune', field: 'work_hours' },
                { title: 'Numri total i arkave për punëtorë', field: 'nr_total_ark' },
                { title: 'Pesha bruto e kërpudhave', field: 'weight_bruto' },
                { title: 'Pesha neto e kërpudhave', field: 'weight_neto' },
                { title: 'Mesatarja e korrjes në kg për orë ', field: 'average_harvest_hour_kg' },
                { title: 'Numri  i serrës', field: 'nr_seres' }
            ],
            row: {
                work_hours: 0,
                nr_total_ark: 0,
                weight_bruto: 0,
                weight_neto: 0,
                average_harvest_hour_kg: 0
            },
            data: [],
        }
    }

    componentDidMount(){
        this.props.pasButton()
        let { month, year, row } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = month.toLocaleString('en-GB', options);
        let to = year.toLocaleString('en-GB', options);
        reportService.getRaportiKorrjes(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.work_hours+=element.work_hours;
                row.nr_total_ark+=element.nr_total_ark;
                row.weight_bruto+=element.weight_bruto;
                row.weight_neto+=element.weight_neto;
                row.average_harvest_hour_kg+=element.average_harvest_hour_kg;
            });
            this.setState({
                data:[].concat(response).concat([{
                    "average_harvest_hour_kg":row.average_harvest_hour_kg,
                    "date":"",
                    "id":'Totali:',
                    "nr_seres":'',
                    "user": '',
                    "nr_total_ark": row.nr_total_ark,
                    "weight_bruto":row.weight_bruto,
                    "weight_neto":row.weight_neto,
                    "work_hours":row.work_hours,
                    "total":row.total,
                }]),
                loading: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.pasButton()
        let { row } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = nextProps.filter_date.toLocaleString('en-GB', options);
        let to = nextProps.filter_date_to.toLocaleString('en-GB', options);
        reportService.getRaportiKorrjes(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.work_hours+=element.work_hours;
                row.nr_total_ark+=element.nr_total_ark;
                row.weight_bruto+=element.weight_bruto;
                row.weight_neto+=element.weight_neto;
                row.average_harvest_hour_kg+=element.average_harvest_hour_kg;
            });
            this.setState({
                data:[].concat(response).concat([{
                    "average_harvest_hour_kg":row.average_harvest_hour_kg,
                    "date":"",
                    "id":'Totali:',
                    "nr_seres":'',
                    "user": '',
                    "nr_total_ark": row.nr_total_ark,
                    "weight_bruto":row.weight_bruto,
                    "weight_neto":row.weight_neto,
                    "work_hours":row.work_hours,
                    "total":row.total,
                }]),
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
                        exportFileName: `Raporti Korrjes me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiKorrjes;