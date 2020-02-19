import React, { Component } from 'react';
import MaterialTable from 'material-table'

class TableFatura extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.data,
            columns: 
            [
                { title: 'Data', field: 'date', type: 'date' },
                { title: 'ID', field: 'id' },
                { title: 'Numri Bllokave', field: 'nr_produced_blocks' },
                { title: 'Numri Bllokave', field: 'nr_produced_blocks' },
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
        const { toggleClick } = this.props;
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
                    onRowClick={(newData, rowData) => toggleClick(rowData)}
                />
            </React.Fragment>
        );
    }
}
 
export default TableFatura;