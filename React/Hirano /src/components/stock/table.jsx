import React, { Component } from 'react';
import MaterialTable from 'material-table'
import { getLanguage } from '../global/language';

class UserTable extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            columns: 
            [
                { title: `${getLanguage().name_of_product}`, field: 'name' },
                { title: `${getLanguage().quantity}`, field: 'quantity' },
                { title: `${getLanguage().unit}`, field: 'unit'},
                { title: `Minimum`, field: 'limit'}
            ],
            data: this.props.data
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            data: [].concat(nextProps.data)
        })
    }

    render() { 
        const { columns, data } = this.state;
        const { togglePopup } = this.props;
        return (  
            <React.Fragment>
                <MaterialTable
                    title="Basic Filtering Preview"
                    columns={columns}
                    data={data}        
                    options={{
                        search: true,
                        actionsColumnIndex: -1,
                        paging: false,
                        rowStyle: rowData => {if(rowData.alert){return{ backgroundColor: "rgb(197, 32, 32)" }}}
                    }}
                    actions={[
                        {
                            icon: 'add_box',
                            tooltip: 'Add Minimum Stock',
                            onClick: (event, rowData) => togglePopup(rowData, 'limit')
                        },
                        {
                            icon: 'edit',
                            tooltip: `Edit Stock`,
                            onClick: (event, rowData) => togglePopup(rowData, 'edit')
                        }
                    ]}
                />
            </React.Fragment>
        );
    }
}
 
export default UserTable;