import React, { Component } from 'react';
import activitiesService from '../../../services/activitiesService'
import { withRouter } from "react-router";
import getSocket from '../../../all/common/socket';
import LeftMenu from '../../left-menu/left-menu';
import NavMenu from '../../nav-menu/nav-menu';
import MaterialTable from 'material-table';
import { getLanguage } from '../../global/language';

class ActivitiesPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            activities: [],
            test:false,
            columns:
            [
            //   { title: 'Foto', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
              { title: `${getLanguage().first_name}`, field: 'user.first_name' },
              { title: `${getLanguage().last_name}`, field: 'user.last_name' },
              { title: `${getLanguage().komenti}`, field: 'content' },
              { title: `${getLanguage().date}`, field: 'date' }
            ]    
        }
    }

    componentDidMount(){
        getSocket().on("activity", (data) => {
            activitiesService.get().then(({ data: response }) => {
                this.setState({
                    activities: [].concat(response)
                })
            })
        });
        activitiesService.get().then(({ data: response }) => {
            this.setState({
                activities: [].concat(response)
            })
        })
    }

    activityClick = (plant_id) => {
        this.props.history.push({
            pathname: '/fill-card',
            state: {
                plant_id: plant_id
            }
        })
    }

    render() {
        let today_date = new Date();
        let today = today_date.getDate()+'-'+(today_date.getMonth()+1)+'-'+today_date.getFullYear();
        const { activities } = this.state;
        const { columns } = this.state;
        return(
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                <div id='activities' className={`main`}>
                    <div className={`right-part`}>
                        <div className={`first-part`} >
                            <span>{getLanguage().activities_list}</span>
                            <span>{getLanguage().date}: {today} </span>
                        </div>
                        <div className={`second-part`} >
                            {/* { 
                                activities.map((activity,index) =>
                                    <div key={index} className={`news`} onClick={this.activityClick.bind(this, activity.plant_id)}>
                                        <div className={`left-part-inside`} >
                                            <div className={`profile-img`}>
                                                <img src="./assets/img/profile.png" alt=""/>
                                            </div>
                                            <div className={`line`}>
                                                <div className={`line-wrapper`}></div>
                                            </div>
                                        </div>
                                        <div className={`right-part-inside`} >
                                            <span className="username">{activity.user.first_name} {activity.user.last_name}</span>
                                            <span className="process">Preocesi: {activity.content}</span>
                                            <span className="description">Procesi: {activity.content}</span>
                                        </div>
                                    </div>
                                )
                            } */}
                            <MaterialTable
                                title=""
                                columns={columns}
                                data={activities}        
                                options={{
                                    filtering: true,
                                    actionsColumnIndex: -1,
                                    paging: false
                                }}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(ActivitiesPage);