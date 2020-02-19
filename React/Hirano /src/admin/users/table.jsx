import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { getLanguage } from '../../../src/components/global/language'

class UserTable extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            columns: 
            [
                { title: `${getLanguage().first_name}`, field: 'first_name' },
                { title: `${getLanguage().last_name}`, field: 'last_name' },
                { title: 'Email', field: 'email', type: 'string'},
                { title: `${getLanguage().role}`, field: 'role' },
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
        const { togglePopup, togglePopupPrivileges } = this.props;
        return (  
            <React.Fragment>
                <MaterialTable
                    title="Basic Filtering Preview"
                    columns={columns}
                    data={data}        
                    options={{
                        filtering: false,
                        actionsColumnIndex: -1,
                        // pageSizeOptions: [10],
                        paging: false
                    }}
                    actions={[
                        rowData => ({
                            icon: 'add',
                            tooltip: 'Privileges',
                            hidden: rowData.role === 'admin',
                            onClick: (event, rowData) => togglePopupPrivileges(rowData)
                        }),
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => togglePopup(rowData)
                        }
                    ]}
                />
            </React.Fragment>
        );
    }
}
 
export default UserTable;