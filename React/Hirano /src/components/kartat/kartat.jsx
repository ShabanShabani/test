import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import * as toast from '../../all/toast'
import plantService from '../../services/plantService'
import 'react-day-picker/lib/style.css';
import DateFnsUtils from '@date-io/date-fns';
import { getLanguage } from '../global/language';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

class Kartat extends Component {
    constructor(props)
    {
        super(props);
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = new Date(new Date().getTime() - (60*60*24*6*1000)).toLocaleString('en-GB', options);
        let to = new Date().toLocaleString('en-GB', options);
        this.state = {
            plants: [],
            filter_date: from,
            filter_date_to: to,
            filter_search: '',
            filter_type: 'id_search',
            page: 1,
            items_on_page: 10,
            last_page: 1,
        }
    }

    componentDidMount() {
        this.onFilterAll();
    }

    // onResetClick = () => {
    //     let options = {day:'numeric', month: 'short', year: 'numeric'}
    //     let from = new Date(new Date().getTime() - (60*60*24*6*1000)).toLocaleString('en-GB', options);
    //     let to = new Date().toLocaleString('en-GB', options);
    //     this.setState({
    //         filter_date: from,
    //         filter_date_to: to,
    //         filter_search: '',
    //         filter_type: 'id_search',
    //         page: 1,
    //         items_on_page: 10,
    //         last_page: 1,
    //     },
    //         this.onFilterAll
    //     )
    // }

    onFilterAll = () => {
        let { page, items_on_page, filter_date, filter_date_to, filter_search, filter_type } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        filter_date = filter_date.toLocaleString('en-GB', options);
        filter_date_to = filter_date_to.toLocaleString('en-GB', options);
        plantService.getPagination(page, items_on_page, filter_date, filter_date_to, filter_search, filter_type).then(({ data: response }) => {
            this.setState({
                plants: [].concat(response.plants),
                last_page: response.last_page
            })
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
        })
    }

    plantPost = () => {
        plantService.post().then(({ data: response }) => {
            this.props.history.push({
                pathname: '/fill-card',
                state: {
                    plant_id: response.plant_id
                }
            })  
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
        })
    }
    
    onPlantClick = (plant_id) =>
    {
        this.props.history.push({
            pathname: '/fill-card',
            state: { 
                plant_id: plant_id
            }
        })  
    }

    onFilterByDate = value => {
        this.setState({
            filter_date: value
        },
            this.onFilterAll
        )
    }

    onFilterByDate1 = value => {
        this.setState(
        {
            filter_date_to: value
        },
            this.onFilterAll
        );
    }
    
    onFilterBySearch = (event) => {
        const value = event.target.value
        this.setState({
            filter_search: value
        },
            this.onFilterAll
        );
    }

    onFilterType = (event) => {
        const value = event.target.value
        this.setState({
            filter_type: value
        },
            this.onFilterAll
        );
    }

    dropdDownChange = (e) => {
        let { items_on_page } = this.state;
        items_on_page = e.target.value;
        this.setState({
            items_on_page
        },
            this.onFilterAll
        )
    }

    onPaginationPage = (e) => {
        let { page } = this.state;
        page = e;
        this.setState({
            page
        },
            this.onFilterAll
        )
    }

    pagination = (last_page) => {
        const { page } = this.state;
        let page1=0
        if (page - 3 > 0 ){
            page1=page-3
        }
        if (page === last_page && page-5 > 0){
            page1=page-5
        }
        if (page+1 === last_page && page-4 > 0){
            page1=page-4
        }
        let pagination = [];
        for (let i = page1; i < page1+5 && i < last_page; i++) {
            pagination.push(
                <div key={i} onClick={this.onPaginationPage.bind(this, i+1)} className={`pagination-box ${i+1 === page ? 'active' : ''}`}>
                    <span >{i+1}</span>
                </div>
            )
        }
        return pagination
    }

    onClickNext = () => {
        const { page, last_page } = this.state;
        if(page+1 <= last_page)
        {
            this.onPaginationPage(page+1)
        }
    }

    onClickBack = () => {
        const { page } = this.state;
        if(page-1 >= 1)
        {
            this.onPaginationPage(page-1)
        }
    }

    onClickFirstPage = () => {
        this.onPaginationPage(1)
    }

    onClickLastPage = () => {
        const { last_page } = this.state;
        this.onPaginationPage(last_page)
    }

    render() { 
        const { plants, filter_date, filter_date_to, last_page, items_on_page } = this.state;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let from = filter_date.toLocaleString('en-GB', options);
        let to = filter_date_to.toLocaleString('en-GB', options);
        return ( 
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                <div id="karta" className={`main`} >
                    <div className={`first-card`} >
                        <div className={`search`}>
                            {/* <span onClick={this.onResetClick} >reset</span> */}
                            <input name="filter-search" onKeyUp={this.onFilterBySearch} type="text" placeholder="Search" />
                            <div className={`filter-block`}>
                                <select onChange={this.onFilterType} name="filter_blocks" id="">
                                    <option value="id_search" >{getLanguage().searchby_id}</option>
                                    <option value="placed_start">{getLanguage().placed_begin}</option>
                                    <option value="manufactured">{getLanguage().manufactured}</option>
                                    <option value="infected">{getLanguage().infected}</option>
                                    <option value="damaged">{getLanguage().damaged}</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter">                            
                            {/* <label>{getLanguage().filter_by_date}:</label> */}
                            {/* <div className={`filter-date`}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="dd/MM/yyyy"
                                        value={today}
                                        InputProps={{ readOnly: true }}
                                        onChange={this.onFilterByDate}
                                        KeyboardButtonProps = 
                                        {{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div> */}
                            <div className={`filter-date range-picker`}>
                                <p>{getLanguage().from}:</p>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="dd/MM/yyyy"
                                        value={from}
                                        InputProps={{ readOnly: true }}
                                        onChange={this.onFilterByDate}
                                        KeyboardButtonProps = 
                                        {{
                                            'aria-label': 'change date',
                                        }}
                                        disableFuture
                                        maxDate={to}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className={`filter-date range-picker`}>
                                <p>{getLanguage().to}:</p>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="dd/MM/yyyy"
                                        value={to}
                                        InputProps={{ readOnly: true }}
                                        onChange={this.onFilterByDate1}
                                        KeyboardButtonProps = 
                                        {{
                                            'aria-label': 'change date',
                                        }}
                                        disableFuture
                                        minDate={from}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div onClick={this.plantPost} className={`add-button`}>
                                <div className={``}>
                                    <span>{getLanguage().create_sowing}</span>
                                </div>
                                <div className={``}>
                                    <img src="./assets/img/plus-color.svg" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`second-card`}>
                        <div className="grid">
                        {plants.map(plant => (
                            <div key={plant.id} onClick={this.onPlantClick.bind(this, plant.id)} className={`grid-4 grid-3 grid-2 grid-1 card-box`}>
                                <div className={`content-card`}>
                                    <span>ID: {plant.id}</span>
                                    <span>{plant.status}</span>
                                    <span>{getLanguage().block_nr} {plant.nr_blloqeve}</span>
                                    <div className={`collapse`}>
                                        <span>{getLanguage().placed_begin}: {plant.nr_predicted_blocks}</span>
                                        <span>{getLanguage().manufactured}: {plant.nr_produced_blocks}</span>
                                        <span>{getLanguage().infected}: {plant.nr_infected_blocks}</span>
                                        <span>{getLanguage().damaged}: {plant.nr_damaged_blocks}</span>
                                        {/* <span>Ditet ne kultivim: {plant.nr_days_cultivation}</span>
                                        <span>Ditet ne rritje: {plant.nr_days_growing}</span> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={`cards-pagination`}>
                        <div className={`pagination`}>
                            <img onClick={this.onClickFirstPage} src="./assets/img/arrow-end.svg" alt=""/>
                            <img onClick={this.onClickBack} src="./assets/img/rightArrow1.svg" alt=""/>
                            <div className={`pagination-inside`}>
                                {this.pagination(last_page)}
                            </div>
                            <img onClick={this.onClickNext} src="./assets/img/rightArrow1.svg" alt=""/>
                            <img onClick={this.onClickLastPage} src="./assets/img/arrow-end.svg" alt=""/>
                        </div>
                        <select value={items_on_page} onChange={this.dropdDownChange} >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Kartat;