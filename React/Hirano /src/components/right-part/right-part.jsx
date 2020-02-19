import React, { Component } from 'react';
import activitiesService from '../../services/activitiesService'
import { withRouter } from "react-router";
import getSocket from '../../all/common/socket';
import {getLanguage} from '../global/language'

class RightPart extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            activities: [],
            test:false
        }
    }

    componentDidMount(){
        getSocket().on("activity", (data) => {
            activitiesService.getLastActivities().then(({ data: response }) => {
                this.setState({
                    activities: [].concat(response)
                })
            })
        });
        activitiesService.getLastActivities().then(({ data: response }) => {
            this.setState({
                activities: [].concat(response)
            })
        })
    }

    activityClick = (activity) => {
        if(activity.plant_id)
        {
            this.props.history.push({
                pathname: '/fill-card',
                state: {
                    plant_id: activity.plant_id,
                    pointer: activity.status
                }
            })
        }else if(activity.green_house_id){
            this.props.history.push({
                pathname: '/temperatura',
                state: {
                    plant_id: activity.plant_id
                }
            })
        }
    }

    render() { 
        let today_date = new Date();
        let today = today_date.getDate()+'-'+(today_date.getMonth()+1)+'-'+today_date.getFullYear();
        const {activities} = this.state;
        return ( 
            <div className={`right-part`}>
                <div className={`first-part`} >
                    <span>{getLanguage().activities_list}</span>
                    <span>{getLanguage().date}: {today} </span>
                </div>
                <div className={`second-part`} >
                    {
                        activities.map((activity,index) =>
                            <div key={index} className={`news`} onClick={this.activityClick.bind(this, activity)}>
                                <div className={`left-part-inside`} >
                                    <div className={`profile-img`}>
                                        {activity.user.profile_picture &&
                                            <img className="profileImg" src={`${activity.user.profile_picture}`} alt=""/>
                                        }
                                        {!activity.user.profile_picture &&
                                            <span className="initial">{activity.user.first_name.charAt(0)}{activity.user.last_name.charAt(0)}</span>
                                        }
                                    </div>
                                    <div className={`line`}>
                                        <div className={`line-wrapper`}></div>
                                    </div>
                                </div>
                                <div className={`right-part-inside`} >
                                    <span className="username">{activity.user.first_name} {activity.user.last_name}</span>
                                    {/* <span className="process">Preocesi: {activity.content}</span> */}
                                    <span className="description">Procesi: {activity.content}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
         );
    }
}
 
export default withRouter(RightPart);