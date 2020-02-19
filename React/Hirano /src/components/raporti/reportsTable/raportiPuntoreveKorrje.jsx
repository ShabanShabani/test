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
                { title: 'Emri dhe Mbiemri i punëtorit', field: 'name'},
                { title: 'Orë pune', field: 'work_hours' },
                { title: 'Sasia', field: 'quantity' },
                { title: 'Mesatarja e korrjes në kg për orë ', field: 'average' },
                { title: 'Numri  i bexhit', field: 'plant_id' }
            ],
            row: {
                id:"",
                name:"",
                work_hours:0,
                quantity:0,
                average:0,
                plant_id:"",
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
        reportService.getRaportiPuntoreveKorrje(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.work_hours+=parseInt(element.work_hours);
                row.average_harvest_hour_kg+=parseInt(element.average_harvest_hour_kg);
                row.quantity+=parseFloat(element.quantity);
            });
            this.setState({
                data:[].concat(response).concat([{
                    'id':'Totali',
                    'name':'',
                    'work_hours':row.work_hours,
                    'quantity':row.quantity,
                    'average':'',
                    'plant_id':'',
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
        reportService.getRaportiPuntoreveKorrje(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.work_hours+=parseInt(element.work_hours);
                row.average_harvest_hour_kg+=parseInt(element.average_harvest_hour_kg);
                row.quantity+=parseFloat(element.quantity);
            });
            this.setState({
                data:[].concat(response).concat([{
                    'id':'Totali',
                    'name':'',
                    'work_hours':row.work_hours,
                    'quantity':row.quantity,
                    'average':'',
                    'plant_id':'',
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
                        pageSizeOptions: [5, 10, 20, 50, data.length],
                        pageSize:data.length,
                        exportFileName: `Raporti Korrjes me daten ${month}.${year}`,
                        filtering:true
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiKorrjes;