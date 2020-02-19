import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import JobReport from './components/job-report/job-report';
import MixerProduction from './components/mixerproduction/mixerproduction';
import AvWeightofSubstrates from './components/weightofSubstrates/weightofsubstrates';
import Autoclave from './components/autoclave/autoclave';
import InoculationRoom from './components/inoculationroom/inoculationroom';
import InfectedSubstrates from './components/infectedsubstrates/infectedsubstrates';
import ReedHarvesting from './components/reedharvesting/reedharvesting';
import SortCategory from './components/sortcategory/sortcategory';
import GenerateReport from './components/generateReport/generateReport';
import plantService from '../../services/plantService'
import * as toast from '../../all/toast'
import authService from '../../services/authService'
import stockService from '../../services/stockService'
import TransferStock from './components/transferStock/transferStock';
import { getLanguage } from '../global/language';

class FillCard extends Component {
    constructor(props) {
        super(props);
        this.state={
            plant: '',
            stoku: ''
        }
    }

    componentDidMount() {
        plantService.get( this.props.location.state.plant_id ).then(({ data: response }) => {
            this.setState({
                plant: response,
                loading: false
            })
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })

        stockService.getStockProducts().then(({ data: response }) => {
            this.setState({
                stoku: response,
                loading: false
            })
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    UNSAFE_componentWillReceiveProps(newProps, newState){
        plantService.get( newProps.location.state.plant_id ).then(({ data: response }) => {
            this.setState({
                plant: response,
                loading: false
            })
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })

        stockService.getStockProducts().then(({ data: response }) => {
            this.setState({
                stoku: response,
                loading: false
            })
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    toggleList = (e) => {
        if (!e.target.parentNode.parentNode.className.includes('active')) {
            e.target.parentNode.parentNode.className += ' active'
        }
        else {
            e.target.parentNode.parentNode.className = e.target.parentNode.parentNode.className.split(' ')[0]
        }
    };

    updatePlant = () => {
        plantService.get( this.props.location.state.plant_id ).then(({ data: response }) => {
            this.setState({
                plant: response,
                loading: false
            })
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const role = authService.getCurrentUser().role;
        const privileges = authService.getCurrentUser();
        const { plant, stoku } = this.state;
        const { pointer } = this.props.location.state;
        return (
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                <div id="timeline" className={`main`} >
                    <div className={`first-timeline`} >
                        <span>{getLanguage().beige_id}: {plant.id}</span>
                        <span>{getLanguage().status}: {plant.status}</span>
                    </div>
                    <div className={`second-timeline`}>
                        {plant &&
                            <div>
                                {plant.status_value >= 1 && privileges.access_job_report &&
                                    <JobReport
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {plant.status_value >= 2 && privileges.access_job_report &&
                                    <GenerateReport
                                        stoku={stoku}
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {(plant.status_value >= 3 || plant.status_value >= 4) && (privileges.access_mixer_block_production || privileges.access_mixer_block_production_end) &&
                                    <MixerProduction
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {plant.status_value >= 5 && privileges.access_average_weight_substrates &&
                                    <AvWeightofSubstrates
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {(plant.status_value >=6 || plant.status_value >= 7) && (privileges.access_autoclave || privileges.access_autoclave_end) &&
                                    <Autoclave
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {plant.status_value >= 8 && privileges.access_inoculation_room &&
                                    <InoculationRoom
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {plant.status_value >= 9 && privileges.access_harvesting &&
                                    <React.Fragment>
                                        <InfectedSubstrates
                                            plant={plant}
                                            updatePlant={this.updatePlant}
                                            toggleList={this.toggleList}
                                            role={role}
                                            pointer={pointer}
                                            privileges={privileges}
                                        />
                                        <TransferStock
                                            plant={plant}
                                            updatePlant={this.updatePlant}
                                            toggleList={this.toggleList}
                                            role={role}
                                            pointer={pointer}
                                            privileges={privileges}
                                        />
                                    </React.Fragment>
                                }
                                {plant.status_value >= 10 && privileges.access_harvesting &&
                                    <ReedHarvesting
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                                {plant.status_value >= 11 && privileges.access_sort_package &&
                                    <SortCategory
                                        plant={plant}
                                        updatePlant={this.updatePlant}
                                        toggleList={this.toggleList}
                                        role={role}
                                        pointer={pointer}
                                        privileges={privileges}
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default FillCard;