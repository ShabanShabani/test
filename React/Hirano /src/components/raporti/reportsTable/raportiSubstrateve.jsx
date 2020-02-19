import React, { Component } from 'react';
import MaterialTable from 'material-table'
// import temperatureService from '../../../services/temperatureService';
import reportService from '../../../services/reportService';
import { getLanguage } from '../../global/language';

class RaportiSubstrateve extends Component {
     
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,
            columns: [
                { title: `${getLanguage().date}`, field: 'date' },
                { title: 'Substrati 1', field: 'substrate1' },
                { title: 'Substrati 2', field: 'substrate2' },
                { title: 'Substrati 3', field: 'substrate3' },
                { title: 'Substrati 4', field: 'substrate4' },
                { title: 'Substrati 5', field: 'substrate5' },
                { title: 'Substrati 6 ', field: 'substrate6' },
                { title: 'Substrati 7', field: 'substrate7' },
                { title: 'Substrati 8', field: 'substrate8' },
                { title: 'Substrati 9', field: 'substrate9' },
                { title: `${getLanguage().avg_weight_sub}`, field: 'pesha_mesatare' }
            ],
            row: {
                pesha_mesatare: 0,
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
        reportService.getRaportiSubstrateve(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.pesha_mesatare+=element.pesha_mesatare;
            });
            this.setState({
                data:[].concat(response).concat([{
                    "data":"Totali: ",
                    "id":'',
                    "pesha_mesatare":row.pesha_mesatare,
                    "substrate1":'',
                    "substrate2":'',
                    "substrate3":'',
                    "substrate4":'',
                    "substrate5":'',
                    "substrate6":'',
                    "substrate7":'',
                    "substrate8":'',
                    "substrate9":'',
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
        reportService.getRaportiSubstrateve(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.pesha_mesatare+=element.pesha_mesatare;
            });
            this.setState({
                data:[].concat(response).concat([{
                    "data":"Totali: ",
                    "id":'',
                    "pesha_mesatare":row.pesha_mesatare,
                    "substrate1":'',
                    "substrate2":'',
                    "substrate3":'',
                    "substrate4":'',
                    "substrate5":'',
                    "substrate6":'',
                    "substrate7":'',
                    "substrate8":'',
                    "substrate9":'',
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
                        exportFileName: `Raporti per peshen mesatare me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiSubstrateve;