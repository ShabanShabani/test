import React, { Component } from 'react';
import MaterialTable from 'material-table'
import reportService from '../../../services/reportService';

class RaportiMiksimit extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            month:this.props.filter_date,
            year: this.props.filter_date_to,
            columns: [
                { title: 'Data e mikserit', field: 'mixer_block_production.start' },
                { title: 'Dru Bungu', field: 'job_report.dru_bungu' },
                { title: 'Dru Ahu', field: 'job_report.dru_ahu' },
                { title: 'Krunde', field: 'job_report.krunde' },
                { title: 'Miser i bluar', field: 'job_report.miser_bluar' },
                { title: 'Gips', field: 'job_report.gips' },
                { title: 'Shkums', field: 'job_report.shkums' },
                { title: 'Uje', field: 'job_report.uje' },
                { title: 'Gaz', field: 'mixer_block_production_end.difference_state' },
                { title: 'Koha Miksimit', field: 'mixer_block_production_end.difference_hour' },
                { title: 'PH Level Start', field: 'mixer_block_production.ph_start' },
                { title: 'PH Level End', field: 'mixer_block_production_end.ph_end' },
                { title: 'Humidity Level Start', field: 'mixer_block_production.humidity_start' },
                { title: 'Humidity Level End', field: 'mixer_block_production_end.humidity_end' },
                { title: 'Humidity Level Start of Autoclave', field: 'autoclave.humidity_start' },
                { title: 'Humidity Level End of Autoclave', field: 'autoclave_end.humidity_end' },
                { title: 'Numri i bllokave', field: 'nr_produced_blocks' },
                { title: 'Numri i farave', field: 'inoculation_room.nr_seed' },
                { title: 'Data fares', field: 'inoculation_room.date_seed' },
                { title: 'Data e inokulimit', field: 'inoculation_room.date_inoculation' },
                { title: 'Numri i bllokave te demtuar', field: 'nr_damaged_blocks' },
                { title: 'Numri final i bllokave', field: 'nr_produced_blocks' },
                { title: 'Numri i seres', field: 'inoculation_room.nr_green_house' },
                { title: 'Numri i raftit', field: 'inoculation_room.nr_shelf' },
                { title: 'Periudha e kultivimit', field: 'nr_days_cultivation' },
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
        let array =[];
        reportService.getRaportiMujor(from, to).then(({ data : response }) => {
            response.forEach(element => {
                array.push({
                    autoclave:element.autoclave[element.autoclave.length-1],
                    autoclave_end:element.autoclave_end[element.autoclave_end.length-1],
                    average_weight_substrates:element.average_weight_substrates[element.average_weight_substrates.length-1],
                    control_infected_substrates:element.control_infected_substrates[element.control_infected_substrates.length-1],
                    date:element.date,
                    harvesting:element.harvesting[element.harvesting.length-1],
                    id:element.id,
                    inoculation_room:element.inoculation_room[element.inoculation_room.length-1],
                    inoculation_room_growing:element.inoculation_room_growing[element.inoculation_room_growing.length-1],
                    job_report:element.job_report,
                    mixer_block_production:element.mixer_block_production[element.mixer_block_production.length-1],
                    mixer_block_production_end:element.mixer_block_production_end[element.mixer_block_production_end.length-1],
                    nr_damaged_blocks:element.nr_damaged_blocks,
                    nr_days_cultivation:element.nr_days_cultivation,
                    nr_days_growing:element.nr_days_growing,
                    nr_infected_blocks:element.nr_infected_blocks,
                    nr_predicted_blocks:element.nr_predicted_blocks,
                    nr_produced_blocks:element.nr_produced_blocks,
                    sort_package: element.sort_package[element.sort_package.length-1],
                })
            });
            this.setState({
                data:array,
                loading: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.pasButton()
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = nextProps.filter_date.toLocaleString('en-GB', options);
        let to = nextProps.filter_date_to.toLocaleString('en-GB', options);
        reportService.getRaportiMiksimit(from, to).then(({ data : response }) => {
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
                        exportFileName: `Raporti Miksimit me daten ${month}.${year}`
                    }}
                />
            </React.Fragment>
        );
    }
}
 
export default RaportiMiksimit;