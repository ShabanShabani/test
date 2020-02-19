import React, { Component } from 'react';
import MaterialTable from 'material-table'

class TableKultivimi extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.data,
            columns: 
            [
                { title: 'Data', field: 'date', type: 'date' },
                { title: 'Koha', field: 'time' },
                { title: 'Numri Seres', field: 'green_house_id' },
                { title: 'Temperatura', field: 'temperature'},
                { title: 'Temperatura Hyrje', field: 'block_temperature_entry' },
                { title: 'Temperatura Mes', field: 'block_temperature_middle'},
                { title: 'Temperatura Dalje', field: 'block_temperature_exit'},
                { title: 'Humidity', field: 'humidity'},
                { title: 'Co2 Ekran', field: 'display_co2'},
                { title: 'Co2 Hyrje', field: 'entry_co2'},
                { title: 'Co2 Mes', field: 'middle_co2'},
                { title: 'Co2 Dalje', field: 'exit_co2'},
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
 
export default TableKultivimi;