import React, { Component } from 'react';
import MaterialTable from 'material-table'
import { getLanguage } from '../global/language'

class UserTable extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            columns: 
            [
                { title: `${getLanguage().name_of_product}`, field: 'name' },
                { title: `${getLanguage().quantity}`, field: 'quantity' },
                { title: `${getLanguage().unit}`, field: 'unit'}
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
                        paging: false
                    }}
                    actions={[
                        {
                          icon: 'edit',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => togglePopup(rowData)
                        }
                    ]}
                />
            </React.Fragment>
        );
    }
}
 
export default UserTable;