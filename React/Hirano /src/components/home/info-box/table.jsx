import React, { Component } from 'react';
import MaterialTable from 'material-table';
import temperatureService from '../../../services/temperatureService';
import getSocket from '../../../all/common/socket';
import { getLanguage } from '../../global/language';

class TableInfo extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            columns: [
                { title: `${getLanguage().identifier}`, field: 'identifier' },
                { title: `${getLanguage().description}`, field: 'description' },
                { 
                    title: `${getLanguage().temperature}`,
                    field: 'temperature',
                },
                { title: `${getLanguage().humidity}`, field: 'humidity',  },
                { title: `${getLanguage().allowed_range }`, field: 'allowed_range' },
                { title: 'Alert', field: 'row', cellStyle: {display: 'none'}}
            ],
            data:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: [
                { title: `${getLanguage().identifier}`, field: 'identifier' },
                { title: `${getLanguage().description}`, field: 'description' },
                { 
                    title: `${getLanguage().temperature}`,
                    field: 'temperature',
                },
                { title: `${getLanguage().humidity}`, field: 'humidity',  },
                { title: `${getLanguage().allowed_range }`, field: 'allowed_range' },
                { title: 'Alert', field: 'row', cellStyle: {display: 'none'}}
            ]
        })
    }
    componentDidMount(){
        let { data } = this.state;
        let data_saved=[
            {
                id: 1,
                identifier: 'C01',
                description: 'C01',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 2,
                identifier: 'C02',
                description: 'C02',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 3,
                identifier: 'C03',
                description: 'C03',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 4,
                identifier: 'C04',
                description: 'C04',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 5,
                identifier: 'C05',
                description: 'C05',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 6,
                identifier: 'C06',
                description: 'C06',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 7,
                identifier: 'C07',
                description: 'C07',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 8,
                identifier: 'C08',
                description: 'C08',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 9,
                identifier: 'C09',
                description: 'C09',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 10,
                identifier: 'C10',
                description: 'C10',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 11,
                identifier: 'C11',
                description: 'C11',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 12,
                identifier: 'C12',
                description: 'C12',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            },
            {
                id: 13,
                identifier: 'C13',
                description: 'C13',
                temperature: 0,
                humidity: 0,
                allowed_range: '(20 24)\u00b0C\n(70 80)%',
                date: '',
                row: ''
            }
        ]
        getSocket().on("live", (response) => {
            this.componentDidMount()
        });
        temperatureService.getLive().then(({ data : response }) => {
            response.forEach((element,index) => {
                if(!isNaN(element.parent_id)){
                    let temperature = parseFloat(element.temperature.split('°')[0])
                    let humidity = parseFloat(element.humidity.split('%')[0])
                    data_saved[element.parent_id-1].temperature+=temperature;
                    data_saved[element.parent_id-1].humidity+=humidity;
                    if(element.row.includes("temp_low"))
                    {
                        if(!data_saved[element.parent_id-1].row.includes('temp_low'))
                        {
                            data_saved[element.parent_id-1].row+=element.row;
                        }
                    }
                    if(element.row.includes("temp_high"))
                    {
                        if(!data_saved[element.parent_id-1].row.includes('temp_high'))
                        {
                            data_saved[element.parent_id-1].row+=element.row;
                        }
                    }
                    if(element.row.includes("hum_low"))
                    {
                        if(!data_saved[element.parent_id-1].row.includes('hum_low'))
                        {
                            data_saved[element.parent_id-1].row+=element.row;
                        }
                    }
                    if(element.row.includes("hum_high"))
                    {
                        if(!data_saved[element.parent_id-1].row.includes('hum_high'))
                        {
                            data_saved[element.parent_id-1].row+=element.row;
                        }
                    }
                    if(element.parent_id !== response[index+1].parent_id){
                        data_saved[element.parent_id-1].temperature=parseFloat(data_saved[element.parent_id-1].temperature/3).toFixed(2)+'°C';
                        data_saved[element.parent_id-1].humidity=parseFloat(data_saved[element.parent_id-1].humidity/3).toFixed(2)+'%';
                        data_saved[element.parent_id-1].allowed_range=element.allowed_range
                    }
                }
            });
            data = data_saved.concat(response);
            this.setState({
                data,
                loading: false
            })
            this.onTreeExpand();
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    onTreeExpand = () => {
        let list = [document.querySelectorAll('tbody > tr')];
        list[0].forEach(i => {
            if(i.cells[6].innerHTML.includes('hum_low'))
            {
                i.cells[4].style["background-color"] = "#30307d";
                i.cells[4].style["color"] = "#fff";
            }
            if(i.cells[6].innerHTML.includes('hum_high'))
            {
                i.cells[4].style["background-color"] = "#C52020";
                i.cells[4].style["color"] = "#fff";
            }
            if(i.cells[6].innerHTML.includes('temp_low'))
            {
                i.cells[3].style["background-color"] = "#30307d";
                i.cells[3].style["color"] = "#fff";
            }
            if(i.cells[6].innerHTML.includes('temp_high'))
            {
                i.cells[3].style["background-color"] = "#C52020";
                i.cells[3].style["color"] = "#fff";
            }
        });
    }

    render() { 
        const { columns, data } = this.state;
        return (  
            <React.Fragment>
                {data[0] &&
                    <MaterialTable
                        title={getLanguage().green_ho_con}
                        data={data}
                        columns={columns}
                        parentChildData={(row, rows) => rows.find(a => a.id === row.parent_id)}
                        onTreeExpandChange={this.onTreeExpand}
                        options={{
                            pageSizeOptions: [24],
                            pageSize: 24,
                            // paging: false
                        }}
                        onChangeRowsPerPage={this.onTreeExpand}
                    />
                }
            </React.Fragment>
        );
    }
}
 
export default TableInfo;