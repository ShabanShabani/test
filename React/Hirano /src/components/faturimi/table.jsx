import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getLanguage } from '../global/language'

class StockTable extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.data,
            columns: 
            [
                { title: 'ID', field: 'id' },
                { title: `${getLanguage().client_name}`, field: 'client_name' },
                { title: `${getLanguage().business_nr}`, field: 'business_number' },
                { title: `${getLanguage().address}`, field: 'address'},
            ],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            data: [].concat(nextProps.data)
        })
    }


    render() { 
        const { columns, data} = this.state;
        return (  
            <React.Fragment>
                <MaterialTable
                    title="Basic Filtering Preview"
                    columns={columns}
                    data={data}        
                    options={{
                        filtering: true,
                        actionsColumnIndex: -1,
                        exportButton: true,
                        paging: false
                    }}
                />
            </React.Fragment>
        );
    }
}
 
export default StockTable;