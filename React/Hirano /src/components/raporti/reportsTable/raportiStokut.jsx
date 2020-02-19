import React, { Component } from 'react';
import MaterialTable from 'material-table'
import reportService from '../../../services/reportService';
import { getLanguage } from '../../global/language'

class RaportiStokut extends Component {
     
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,   
            columns: [
                { title: `${getLanguage().id}`, field: 'id' },
                { title: `${getLanguage().name}`, field: 'name' },
                { title: `${getLanguage().quantity}`, field: 'quantity' },
                { title: `${getLanguage().unit}`, field: 'unit' },
                { title: `${getLanguage().price}`, field: 'price' },
                { title: `${getLanguage().category}`, field: 'category' },
                { title: `${getLanguage().supplier}`, field: 'supplier' },
                { title: `${getLanguage().acceptance_date}`, field: 'acceptance_date' },
                { title: `${getLanguage().username}`, field: 'user.name' }
            ],
            row: {
                quantity: 0,
                price: 0,
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
        reportService.getRaportiStoku(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.id+='';
                row.name+='';
                row.quantity+=element.quantity;
                row.unit+='';
                row.price+=element.price;
                row.category+='';
                row.supplier+='';
                row.acceptance_date+='';
                row.username+='';
            });
            this.setState({
                data:[].concat(response).concat([{
                    "id":"Totali",
                    "name":"",
                    "quantity":row.quantity,
                    "unit":"",
                    "price":row.price,
                    "category":"",
                    "supplier":"",
                    "acceptance_date":"",
                    "username":"",
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
        reportService.getRaportiStoku(from, to).then(({ data : response }) => {
            response.forEach(element => {
                row.id+='';
                row.name+='';
                row.quantity+=element.quantity;
                row.unit+='';
                row.price+=element.price;
                row.category+='';
                row.supplier+='';
                row.acceptance_date+='';
                row.username+='';
            });
            this.setState({
                data:[].concat(response).concat([{
                    "id":"Totali",
                    "name":"",
                    "quantity":row.quantity,
                    "unit":"",
                    "price":row.price,
                    "category":"",
                    "supplier":"",
                    "acceptance_date":"",
                    "username":"",
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
                {/* <div className={`month-table`}>
                    <select name="month" value={month} id="" onChange={this.onChangeDropDown}>
                        <option value="0">{getLanguage().jan}</option>
                        <option value="1">{getLanguage().feb}</option>
                        <option value="2">{getLanguage().mar}</option>
                        <option value="3">{getLanguage().apr}</option>
                        <option value="4">{getLanguage().may}</option>
                        <option value="5">{getLanguage().jun}</option>
                        <option value="6">{getLanguage().jul}</option>
                        <option value="7">{getLanguage().aug}</option>
                        <option value="8">{getLanguage().sep}</option>
                        <option value="9">{getLanguage().oct}</option>
                        <option value="10">{getLanguage().nov}</option>
                        <option value="11">{getLanguage().dec}</option>
                    </select>
                </div>
                <div className={`year-table`}>
                    <select name="year" value={year} onChange={this.onChangeDropDownYear}>
                        {menuItems}
                    </select>
                </div> */}
                <MaterialTable
                    title=''
                    data={data}
                    columns={columns}
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parent_id)}
                    options={{
                        exportButton: true,
                        pageSizeOptions: [5, 10, 20, 50, data.length],
                        pageSize:data.length,
                        filtering: true,
                        exportFileName: `Raporti Kontrollues me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
export default RaportiStokut;