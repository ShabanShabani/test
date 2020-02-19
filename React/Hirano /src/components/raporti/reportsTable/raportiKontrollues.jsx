import React, { Component } from 'react';
import MaterialTable from 'material-table'
// import temperatureService from '../../../services/temperatureService';
import reportService from '../../../services/reportService';
import { getLanguage } from '../../global/language'

class RaportiKontrollues extends Component {
     
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,
            columns: [
                { title: 'Data', field: 'date' },
                { title: `${getLanguage().sub_green}`, field: 'infection_green' },
                { title: `${getLanguage().sub_orange}`, field: 'infection_orange' },
                { title: `${getLanguage().sub_yellow}`, field: 'infection_yellow' },
                { title: `${getLanguage().sub_black}`, field: 'infection_black' },
                { title: `${getLanguage().sub_red}`, field: 'infection_red' },
                { title: `${getLanguage().plant_id}`, field: 'plant_id' },
                { title: `${getLanguage().total_infected_blocks}`, field: 'total' }
            ],
            // row: {
            //     infection_green: 0,
            //     infection_orange: 0,
            //     infection_yellow: 0,
            //     infection_black: 0,
            //     infection_red: 0,
            //     total: 0,
            // },
            data: [],
        }
    }

    componentDidMount(){
        this.props.pasButton()
        let { month, year } = this.state;
        let row = {
            infection_green:0,
            infection_orange:0,
            infection_yellow:0,
            infection_black:0,
            infection_red:0,
            total:0,
        }
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = month.toLocaleString('en-GB', options);
        let to = year.toLocaleString('en-GB', options);
        reportService.getRaportiKontrollues(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.infection_green+=element.infection_green;
                row.infection_orange+=element.infection_orange;
                row.infection_yellow+=element.infection_yellow;
                row.infection_black+=element.infection_black;
                row.infection_red+=element.infection_red;
                row.total+=element.total;
            });
            this.setState({
                data:[].concat(response).concat([{
                    "date":"Totali",
                    "id":'',
                    "infection_black":row.infection_black,
                    "infection_green":row.infection_green,
                    "infection_orange":row.infection_orange,
                    "infection_red":row.infection_red,
                    "infection_yellow":row.infection_yellow,
                    "nr_green_house":"",
                    "total":row.total,
                }]),
                loading: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.pasButton()
        let row = {
            infection_green:0,
            infection_orange:0,
            infection_yellow:0,
            infection_black:0,
            infection_red:0,
            total:0,
        }
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = nextProps.filter_date.toLocaleString('en-GB', options);
        let to = nextProps.filter_date_to.toLocaleString('en-GB', options);
        reportService.getRaportiKontrollues(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.infection_green+=element.infection_green;
                row.infection_orange+=element.infection_orange;
                row.infection_yellow+=element.infection_yellow;
                row.infection_black+=element.infection_black;
                row.infection_red+=element.infection_red;
                row.total+=element.total;
            });
            this.setState({
                data:[].concat(response).concat([{
                    "date":"Totali",
                    "id":'',
                    "infection_black":row.infection_black,
                    "infection_green":row.infection_green,
                    "infection_orange":row.infection_orange,
                    "infection_red":row.infection_red,
                    "infection_yellow":row.infection_yellow,
                    "nr_green_house":"",
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
                menuItems.push(<option key={`year${i}`} value={i} defaultvalues="true">{i}</option>);
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
                        exportFileName: `Raporti Kontrollues me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiKontrollues;