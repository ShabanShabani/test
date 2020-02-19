import React, { Component } from 'react';
import MaterialTable from 'material-table'
// import temperatureService from '../../../services/temperatureService';
import reportService from '../../../services/reportService';

class RaportiPaketimit extends Component {
     
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,
            columns: [
                { title: 'Nr.', field: 'id' },
                { title: 'Data e transferimit të kerpudhave', field: 'date' },
                { title: 'Mini', field: 'ark_mini' },
                { title: 'Të vogla', field: 'ark_small' },
                { title: 'Të mesme(A)', field: 'ark_medium_a' },
                { title: 'Të mesme(B) ', field: 'ark_medium_b' },
                { title: 'Të Mëdha (A)', field: 'ark_big_a' },
                { title: 'Të Mëdha (B)', field: 'ark_big_b' },
                { title: 'Klasa C', field: 'class_c' },
                { title: 'Të thata', field: 'dried' },
                { title: 'Miks', field: 'mix' },
                { title: 'Bishta', field: 'tails' },
                { title: 'Tjera', field: 'other' },
                { title: 'Pesha bruto e kërpudhave', field: 'weight_bruto' },
                { title: 'Pesha neto e kërpudhave', field: 'weight_neto' }
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
        reportService.getRaportiPaketimit(from, to).then(({ data : response }) => {
            this.setState({
                data:[].concat(response),
                loading: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.pasButton()
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = nextProps.filter_date.toLocaleString('en-GB', options);
        let to = nextProps.filter_date_to.toLocaleString('en-GB', options);
        reportService.getRaportiPaketimit(from, to).then(({ data : response }) => {
            this.setState({
                data:[].concat(response),
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
                        exportFileName: `Raporti Paketimit me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiPaketimit;