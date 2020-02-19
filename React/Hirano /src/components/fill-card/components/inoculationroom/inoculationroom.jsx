import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import inocilationService from '../../../../services/inocilationService';
import 'semantic-ui-css/semantic.min.css'
import InoculationForm from './inoculationForm';
import { getLanguage } from '../../../global/language';

class InoculationRoom extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                nr_seed: '',
                date_seeds: null,
                nr_blocks_damage: '',
                role: this.props.role,
                note: '',
                histories: [{
                    nr_green_house: '',
                    nr_shelf: '',
                    nr_blocks_shelf: 0,
                }],
            },
            errors: {},
            loading:'',
            addInput: false,
            hover: false,
            options: [
                {"type":"cr", "value": 1, "text": `${getLanguage().sera} 1`},
                {"type":"cr", "value": 2, "text": `${getLanguage().sera} 2`},
                {"type":"cr", "value": 3, "text": `${getLanguage().sera} 3`},
                {"type":"cr", "value": 4, "text": `${getLanguage().sera} 4`},
                {"type":"cr", "value": 5, "text": `${getLanguage().sera} 5`},
                {"type":"cr", "value": 6, "text": `${getLanguage().sera} 6`},
                {"type":"cr", "value": 7, "text": `${getLanguage().sera} 7`},
                {"type":"cr", "value": 8, "text": `${getLanguage().sera} 8`},
                {"type":"cr", "value": 9, "text": `${getLanguage().sera} 9`},
                {"type":"cr", "value": 10, "text": `${getLanguage().sera} 10`},
                {"type":"cr", "value": 11, "text": `${getLanguage().sera} 11`},
                {"type":"cr", "value": 12, "text": `${getLanguage().sera} 12`},
                {"type":"cr", "value": 13, "text": `${getLanguage().sera} 13`}
            ],
            options1: [   
                {"type":"rafte", "value": 1, "text": `${getLanguage().raft} 1`},
                {"type":"rafte", "value": 2, "text": `${getLanguage().raft} 2`},
                {"type":"rafte", "value": 3, "text": `${getLanguage().raft} 3`},
                {"type":"rafte", "value": 4, "text": `${getLanguage().raft} 4`},
                {"type":"rafte", "value": 5, "text": `${getLanguage().raft} 5`},
                {"type":"rafte", "value": 6, "text": `${getLanguage().raft} 6`},
                {"type":"rafte", "value": 7, "text": `${getLanguage().raft} 7`},
                {"type":"rafte", "value": 8, "text": `${getLanguage().raft} 8`},
                {"type":"rafte", "value": 9, "text": `${getLanguage().raft} 9`},
                {"type":"rafte", "value": 10, "text": `${getLanguage().raft}  10`},
                {"type":"rafte", "value": 11, "text": `${getLanguage().raft}  11`},
                {"type":"rafte", "value": 12, "text": `${getLanguage().raft}  12`},
                {"type":"rafte", "value": 13, "text": `${getLanguage().raft}  13`},
                {"type":"rafte", "value": 14, "text": `${getLanguage().raft}  14`},
                {"type":"rafte", "value": 15, "text": `${getLanguage().raft}  15`},
                {"type":"rafte", "value": 16, "text": `${getLanguage().raft}  16`},
                {"type":"rafte", "value": 17, "text": `${getLanguage().raft}  17`},
                {"type":"rafte", "value": 18, "text": `${getLanguage().raft}  18`},
                {"type":"rafte", "value": 19, "text": `${getLanguage().raft}  19`},
                {"type":"rafte", "value": 20, "text": `${getLanguage().raft}  20`},
                {"type":"rafte", "value": 21, "text": `${getLanguage().raft}  21`},
                {"type":"rafte", "value": 22, "text": `${getLanguage().raft}  22`},
                {"type":"rafte", "value": 23, "text": `${getLanguage().raft}  23`},
                {"type":"rafte", "value": 24, "text": `${getLanguage().raft}  24`},
                {"type":"rafte", "value": 25, "text": `${getLanguage().raft}  25`},
                {"type":"rafte", "value": 26, "text": `${getLanguage().raft}  26`},
                {"type":"rafte", "value": 27, "text": `${getLanguage().raft}  27`},
                {"type":"rafte", "value": 28, "text": `${getLanguage().raft}  28`},
                {"type":"rafte", "value": 29, "text": `${getLanguage().raft}  29`},
                {"type":"rafte", "value": 30, "text": `${getLanguage().raft} 30`},
                {"type":"rafte", "value": 31, "text": `${getLanguage().raft} 31`},
                {"type":"rafte", "value": 32, "text": `${getLanguage().raft} 32`},
                {"type":"rafte", "value": 33, "text": `${getLanguage().raft} 33`},
                {"type":"rafte", "value": 34, "text": `${getLanguage().raft} 34`},
                {"type":"rafte", "value": 35, "text": `${getLanguage().raft} 35`},
                {"type":"rafte", "value": 36, "text": `${getLanguage().raft} 36`},
                {"type":"rafte", "value": 37, "text": `${getLanguage().raft} 37`},
                {"type":"rafte", "value": 38, "text": `${getLanguage().raft} 38`},
                {"type":"rafte", "value": 39, "text": `${getLanguage().raft} 39`},
                {"type":"rafte", "value": 40, "text": `${getLanguage().raft} 40`},
                {"type":"rafte", "value": 41, "text": `${getLanguage().raft} 41`},
                {"type":"rafte", "value": 42, "text": `${getLanguage().raft} 42`}
            ],
            max_nr_blocks: false
        }
    }
    componentWillReceiveProps() {
        this.setState({
            options: [
                {"type":"cr", "value": 1, "text": `${getLanguage().sera} 1`},
                {"type":"cr", "value": 2, "text": `${getLanguage().sera} 2`},
                {"type":"cr", "value": 3, "text": `${getLanguage().sera} 3`},
                {"type":"cr", "value": 4, "text": `${getLanguage().sera} 4`},
                {"type":"cr", "value": 5, "text": `${getLanguage().sera} 5`},
                {"type":"cr", "value": 6, "text": `${getLanguage().sera} 6`},
                {"type":"cr", "value": 7, "text": `${getLanguage().sera} 7`},
                {"type":"cr", "value": 8, "text": `${getLanguage().sera} 8`},
                {"type":"cr", "value": 9, "text": `${getLanguage().sera} 9`},
                {"type":"cr", "value": 10, "text": `${getLanguage().sera} 10`},
                {"type":"cr", "value": 11, "text": `${getLanguage().sera} 11`},
                {"type":"cr", "value": 12, "text": `${getLanguage().sera} 12`},
                {"type":"cr", "value": 13, "text": `${getLanguage().sera} 13`}
            ],
            options1: [   
            {"type":"rafte", "value": 1, "text": `${getLanguage().raft} 1`},
            {"type":"rafte", "value": 2, "text": `${getLanguage().raft} 2`},
            {"type":"rafte", "value": 3, "text": `${getLanguage().raft} 3`},
            {"type":"rafte", "value": 4, "text": `${getLanguage().raft} 4`},
            {"type":"rafte", "value": 5, "text": `${getLanguage().raft} 5`},
            {"type":"rafte", "value": 6, "text": `${getLanguage().raft} 6`},
            {"type":"rafte", "value": 7, "text": `${getLanguage().raft} 7`},
            {"type":"rafte", "value": 8, "text": `${getLanguage().raft} 8`},
            {"type":"rafte", "value": 9, "text": `${getLanguage().raft} 9`},
            {"type":"rafte", "value": 10, "text": `${getLanguage().raft}  10`},
            {"type":"rafte", "value": 11, "text": `${getLanguage().raft}  11`},
            {"type":"rafte", "value": 12, "text": `${getLanguage().raft}  12`},
            {"type":"rafte", "value": 13, "text": `${getLanguage().raft}  13`},
            {"type":"rafte", "value": 14, "text": `${getLanguage().raft}  14`},
            {"type":"rafte", "value": 15, "text": `${getLanguage().raft}  15`},
            {"type":"rafte", "value": 16, "text": `${getLanguage().raft}  16`},
            {"type":"rafte", "value": 17, "text": `${getLanguage().raft}  17`},
            {"type":"rafte", "value": 18, "text": `${getLanguage().raft}  18`},
            {"type":"rafte", "value": 19, "text": `${getLanguage().raft}  19`},
            {"type":"rafte", "value": 20, "text": `${getLanguage().raft}  20`},
            {"type":"rafte", "value": 21, "text": `${getLanguage().raft}  21`},
            {"type":"rafte", "value": 22, "text": `${getLanguage().raft}  22`},
            {"type":"rafte", "value": 23, "text": `${getLanguage().raft}  23`},
            {"type":"rafte", "value": 24, "text": `${getLanguage().raft}  24`},
            {"type":"rafte", "value": 25, "text": `${getLanguage().raft}  25`},
            {"type":"rafte", "value": 26, "text": `${getLanguage().raft}  26`},
            {"type":"rafte", "value": 27, "text": `${getLanguage().raft}  27`},
            {"type":"rafte", "value": 28, "text": `${getLanguage().raft}  28`},
            {"type":"rafte", "value": 29, "text": `${getLanguage().raft}  29`},
            {"type":"rafte", "value": 30, "text": `${getLanguage().raft} 30`},
            {"type":"rafte", "value": 31, "text": `${getLanguage().raft} 31`},
            {"type":"rafte", "value": 32, "text": `${getLanguage().raft} 32`},
            {"type":"rafte", "value": 33, "text": `${getLanguage().raft} 33`},
            {"type":"rafte", "value": 34, "text": `${getLanguage().raft} 34`},
            {"type":"rafte", "value": 35, "text": `${getLanguage().raft} 35`},
            {"type":"rafte", "value": 36, "text": `${getLanguage().raft} 36`},
            {"type":"rafte", "value": 37, "text": `${getLanguage().raft} 37`},
            {"type":"rafte", "value": 38, "text": `${getLanguage().raft} 38`},
            {"type":"rafte", "value": 39, "text": `${getLanguage().raft} 39`},
            {"type":"rafte", "value": 40, "text": `${getLanguage().raft} 40`},
            {"type":"rafte", "value": 41, "text": `${getLanguage().raft} 41`},
            {"type":"rafte", "value": 42, "text": `${getLanguage().raft} 42`}
            ],
        })
    }
    // schema = {}
    schema = {
        plant_id: Joi.number().integer().required(),
        nr_blocks_damage: Joi.number().integer().max(this.props.plant.nr_produced_blocks).required(),
        nr_seed: Joi.number().integer().required(),
        role: Joi.string().required(),
        date_seeds: Joi.date().max('now').required(),
        note: Joi.string().allow('').optional(),
        histories: Joi.array().items(Joi.object().keys({
            nr_green_house: Joi.number().integer().required(),
            nr_blocks_shelf: Joi.number().integer().required(),
            nr_shelf: Joi.number().integer().required(),
        }))
    }

    handleChangeDropdown = (index, e, { value }) => {
        const { data } = this.state;
        const { histories } = data;
        histories[index].nr_green_house = value;
        this.setState({
            data
        });
    };

    handleChangeDropdown1 = (index, e, { value }) => {
        const { data } = this.state;
        const { histories } = data;
        histories[index].nr_shelf = value;
        this.setState({
            data
        });
    };
    
    onInaculationChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;

        histories[index].nr_blocks_shelf = value;
        this.setState({
            data
        });
    }

    onKeyUpInaculation = () => {
        let { data, max_nr_blocks } = this.state;
        console.log(data.histories)
        let total_blocks = 0;
        console.log(this.props.plant.nr_produced_blocks)
        data.histories.forEach(element => {
            total_blocks += parseFloat(element.nr_blocks_shelf);
        });
        if(total_blocks > this.props.plant.nr_produced_blocks)
        {
            toast.error(`Numri i Bllokave Ne raft must be less than or equal to + ${this.props.plant.nr_produced_blocks}`);
            this.setState({
                max_nr_blocks: true
            })
        }else
        {
            this.setState({
                max_nr_blocks: false
            })
        }        
    }

    addInoculationShelf = (index) => {
        const { data } = this.state;
        data.histories.push({
            nr_green_house: '',
            nr_shelf: '',
            nr_blocks_shelf: 0,
        })
        this.setState({
            data
        });
    }

    deleteInoculationShelf = (index) => {
        let { data } = this.state;
        data.histories.splice(index, 1)
        this.setState({
            data
        });
    }
    
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let {plant_id, nr_seed, nr_blocks_damage, date_seeds, note, histories } = this.state.data;
        if(!note){
            note = ''
        }
        inocilationService.post(plant_id, nr_seed, nr_blocks_damage, date_seeds, note, histories).then(({ data }) => {
            this.setState({
                loading: false,
                data: {
                    plant_id: this.props.plant.id,
                    nr_seed: '',
                    date_seeds: null,
                    nr_blocks_damage: '',
                    role: this.props.role,
                    note: '',
                    histories: [{
                        nr_green_house: '',
                        nr_shelf: '',
                        nr_blocks_shelf: 0,
                    }],
                },
            })
        toast.success("Mbjellja perfundoj me sukses.");
        this.props.updatePlant();
        }).catch(err => {
            toast.error("Diqka shkoi keq. Ju lutem provoni përsëri.");
            this.setState({
                loading: false
            })
        })
    }

    onDatePickerStart = date => {
        const { data } = this.state;
        data.date_seeds = date.toISOString().slice(0, 10).replace('T', ' ');
        this.setState({
            data
        })
    }
    
    render() {
        const { options, options1, data, errors, plant, loading, max_nr_blocks } = this.state;
        const { toggleList, pointer, privileges } = this.props;
        const { histories, nr_seed, date_seeds, nr_blocks_damage, role, note } = data;
        let options2 = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options2);
        console.log(max_nr_blocks)
        return (
            <React.Fragment>
                    <div className={`timeline-info ${pointer === 6 ? 'active' : ''}`} >
                        <div className={`timeline-click `}>
                            <span onClick={toggleList.bind(this)} className="title">
                                <img src="./assets/img/circle.svg" alt="" />
                                {getLanguage().inoculation_room_title}
                            </span>
                        </div>
                        {plant.inoculation_room.map((element, index) => (
                            <div key={index} className={`timeline-show ${pointer === 6 ? 'active' : ''}`}>
                                <div className={`timline-helper`}>
                                    <div className={`left-timeline`}>
                                        <img src="./assets/img/circle.svg" alt="" />
                                        <div className="line">
                                            <div className="line-wrapper"></div>
                                        </div>
                                    </div>
                                    <div className={`right-timeline`}>
                                        <div className={`progress`} >
                                            <span>{element.date_inoculation}</span>
                                            <span><img src="./assets/img/circle.svg" alt="" /></span>
                                            <span>Start</span>
                                            <span>{element.time}</span>
                                            <span><img src="./assets/img/circle.svg" alt="" /></span>
                                            <span>{element.user.name}</span>
                                        </div>
                                        <div className={`progress-content`}>
                                            <span className="title">Kerkes per te hyra per prodhimin e lendes se pare</span>
                                            {
                                                element.shelf.map((shelf, idx) =>
                                                    <div key={idx} className={`extra-form map`}>
                                                        <div className="materials">
                                                            <span>Numri Seres: {shelf.green_house_id}</span>
                                                        </div>
                                                        <div className="materials">
                                                            <span>Numri Rafteve: {shelf.nr_shelf}</span>
                                                        </div>
                                                        <div className="materials">
                                                            <span>Numri i Bllokave ne Raft: {shelf.nr_blocks_association}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <div className="materials">
                                                <span>{getLanguage().nr_seed}: {element.nr_seed}</span>
                                            </div>
                                            <div className="materials">
                                                <span>{getLanguage().damaged_blocks_nr}: {element.nr_blocks_damage}</span>
                                            </div>
                                            <div className="materials">
                                                <span>{getLanguage().seed_dates}: {element.date_seed}</span>
                                            </div>
                                            <div className="materials">
                                                <span>{getLanguage().note}: {element.note}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_inoculation_room && plant.inoculation_room && plant.inoculation_room.length < 1)) &&
                            <div className={`timeline-show ${pointer === 6 ? 'active' : ''}`}>
                                <div className={`timline-helper`}>
                                    <div className={`left-timeline`}>
                                        <img src="./assets/img/circle.svg" alt="" />
                                        <div className="line">
                                            <div className="line-wrapper"></div>
                                        </div>
                                    </div>
                                    <div className={`right-timeline`}>
                                        <div className={`progress`} >
                                            <span>{today}</span>
                                        </div>
                                        <div className={`progress-content`}>
                                            <form autoComplete="off" onSubmit={this.handleSubmit} >
                                                <div className="materials">
                                                    {this.renderInput("nr_seed", null, 'nr_seed', nr_seed, this.handleChange, errors.nr_seed, false, `${getLanguage().nr_seed}`, false, 'number')}
                                                </div>
                                                <div className="materials">
                                                    {this.renderInput("nr_blocks_damage", null, 'nr_blocks_damage', nr_blocks_damage, this.handleChange, errors.nr_blocks_damage, false, `${getLanguage().damaged_blocks_nr}`, false, 'number')}
                                                </div>
                                                <div className="materials">
                                                    {this.renderDatePicker(false, "date_seeds", "date_seeds:", 'date_seeds', date_seeds, this.onDatePickerStart, errors.date_seeds, false, false, false, `${getLanguage().seed_dates}`, false, 'number')}
                                                </div>
                                                {
                                                    histories.map((history, index) =>
                                                        <InoculationForm
                                                            key={index}
                                                            history={history}
                                                            index={index}
                                                            options={options}
                                                            handleChangeDropdown1={this.handleChangeDropdown1}handleChangeDropdown={this.handleChangeDropdown}
                                                            options1={options1}
                                                            onChange={this.onInaculationChange}
                                                            deleteInoculationShelf={this.deleteInoculationShelf}
                                                            plant={plant}
                                                            addInoculationShelf={this.addInoculationShelf}
                                                            length={histories.length}
                                                            onKeyUpInaculation={this.onKeyUpInaculation}
                                                            // max_nr_blocks={max_nr_blocks}
                                                        />
                                                    )
                                                }
                                                <div className={`extra-button`}>
                                                    {/* <button type="button" onClick={this.addInoculationShelf}>Shto</button> */}
                                                </div>
                                                {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, `${getLanguage().note}`)}
                                                <div className="form-button">
                                                    {/* {this.renderSubmitButton(`${getLanguage().save_data}`, loading)} */}
                                                    <button className={`myButton`} type="submit" disabled={max_nr_blocks}>{getLanguage().save_data}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
            </React.Fragment>
        );
    }
}

export default InoculationRoom;