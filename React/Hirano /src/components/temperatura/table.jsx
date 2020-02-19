import React, { Component } from 'react';
import MaterialTable from 'material-table'

class Table extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.data,
            columns: 
            [
                { title: 'Data', field: 'date', type: 'date' },
                { title: 'Koha', field: 'time' },
                { title: 'Numri Seres', field: 'green_house_growing_id' },
                { title: 'Temperatura 1', field: 'temperature1'},
                { title: 'Temperatura 2', field: 'temperature2'},
                { title: 'Temperatura 3', field: 'temperature3'},
                { title: 'Temperatura 4', field: 'temperature4'},
                { title: 'Temperatura Hyrje', field: 'temperature_block_entry' },
                { title: 'Temperatura Mes', field: 'temperature_block_middle'},
                { title: 'Temperatura Dalje', field: 'temperature_block_exit'},
                { title: 'CO2 Mes', field: 'middle_co2'},
            ],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            data: [].concat(nextProps.data)
        })
    }

    render() { 
        const { columns, data } = this.state;
        return (  
            <React.Fragment>
                <MaterialTable
                    title="Basic Filtering Preview"
                    columns={columns}
                    data={data}        
                    options={{
                        filtering: true,
                        actionsColumnIndex: -1,
                        // pageSizeOptions: [5, 10, 150],
                        exportButton: true,
                        paging: false
                    }}
                />
            </React.Fragment>
        );
    }
}
 
export default Table;