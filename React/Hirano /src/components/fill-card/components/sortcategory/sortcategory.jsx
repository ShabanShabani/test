import React from 'react';
import Form from '../../../../all/common/form';
import Joi from 'joi-browser';
import * as toast from '../../../../all/toast'
import sortService from '../../../../services/sortService';
import 'react-day-picker/lib/style.css'
import '@material-ui/core/styles';
import AddEmployer from './addEmployer'
import { getLanguage } from '../../../global/language';

class SortCategory extends Form {
    constructor(props) {
        super(props);
        this.state = {
            plant: this.props.plant,
            data: {
                plant_id: this.props.plant.id,
                ark_mini_total: 0,
                ark_small_total: 0,
                ark_medium_a_total: 0,
                ark_medium_b_total: 0,
                ark_big_a_total: 0,
                ark_big_b_total: 0,
                class_c_total: 0,
                dried_total: 0,
                mix_total: 0,
                tails_total: 0,
                other_total: 0,
                weight_bruto: 0,
                weight_neto: 0,
                role: this.props.role,
                note: '',
                rate: 0,
                histories: [{
                    name: '',
                    work_hours: 0,
                    ark_mini: 0,
                    ark_small: 0,
                    ark_medium_a: 0,
                    ark_medium_b: 0,
                    ark_big_a: 0,
                    ark_big_b: 0,
                    class_c: 0,
                    dried: 0,
                    mix: 0,
                    tails: 0,
                    other: 0
                }],
            },
            errors: {},
            loading:'',
            temp: 0
        }
    }
    
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }

    schema = {
        id: Joi.number().integer().optional(),
        rate: Joi.number().integer().min(1).max(5).optional(),
        plant_id: Joi.number().integer().required(),
        ark_mini_total: Joi.number().integer().required(),
        ark_small_total: Joi.number().integer().required(),
        ark_medium_a_total: Joi.number().integer().required(),
        ark_medium_b_total: Joi.number().integer().required(),
        ark_big_a_total: Joi.number().integer().required(),
        ark_big_b_total: Joi.number().integer().required(),
        class_c_total: Joi.number().integer().required(),
        dried_total: Joi.number().integer().required(),
        mix_total: Joi.number().integer().required(),
        tails_total: Joi.number().integer().required(),
        other_total: Joi.number().integer().required(),
        weight_bruto: Joi.number().integer().required(),
        weight_neto: Joi.number().integer().required(),
        role: Joi.string().required(),
        note: Joi.string().allow('').optional(),
        histories: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            work_hours: Joi.number().integer().required(),
            ark_mini: Joi.number().integer().required(),
            ark_small: Joi.number().integer().required(),
            ark_medium_a: Joi.number().integer().required(),
            ark_medium_b: Joi.number().integer().required(),
            ark_big_a: Joi.number().integer().required(),
            ark_big_b: Joi.number().integer().required(),
            class_c: Joi.number().integer().required(),
            dried: Joi.number().integer().required(),
            mix: Joi.number().integer().required(),
            tails: Joi.number().integer().required(),
            other: Joi.number().integer().required(),
        }))
    }

    submitForm = () => {
        this.setState({
            loading: true
        })
        let { plant_id, ark_mini_total, ark_small_total, ark_medium_a_total, ark_medium_b_total, ark_big_a_total, ark_big_b_total, class_c_total, dried_total, mix_total, tails_total, other_total, weight_bruto, weight_neto, note, rate, histories } = this.state.data;

        if(!note){
            note = ''
        }
        sortService.post(plant_id, ark_mini_total, ark_small_total, ark_medium_a_total, ark_medium_b_total, ark_big_a_total, ark_big_b_total, class_c_total, dried_total, mix_total, tails_total, other_total, weight_bruto, weight_neto, note, rate, histories).then(({ data }) => {
            this.setState({
                loading: false,
                data:{
                    plant_id: this.props.plant.id,
                    ark_mini_total: 0,
                    ark_small_total: 0,
                    ark_medium_a_total: 0,
                    ark_medium_b_total: 0,
                    ark_big_a_total: 0,
                    ark_big_b_total: 0,
                    class_c_total: 0,
                    dried_total: 0,
                    mix_total: 0,
                    tails_total: 0,
                    other_total: 0,
                    weight_bruto: 0,
                    weight_neto: 0,
                    role: this.props.role,
                    note: '',
                    rate: 0,
                    histories: [{
                        name: '',
                        work_hours: 0,
                        ark_mini: 0,
                        ark_small: 0,
                        ark_medium_a: 0,
                        ark_medium_b: 0,
                        ark_big_a: 0,
                        ark_big_b: 0,
                        class_c: 0,
                        dried: 0,
                        mix: 0,
                        tails: 0,
                        other: 0
                    }],
                }
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

    onRateChange = (value) => {
        let { data, temp } = this.state;
        data.rate = value;
        temp = value; 
        this.setState({
            data,
            temp
        });
    }

    onRateMove = (value) => {
        const { data } = this.state;
        data.rate = value;
        this.setState({
            data
        });
    }

    onRateRemove = () => {
        let { data, temp } = this.state;
        data.rate = temp;
        this.setState({
            data,
            temp
        });
    }

    onNameChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].name = value;
        this.setState({
            data
        });
    }
    onWorkChange = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].work_hours = value;
        this.setState({
            data
        });
    }
    onArkaMini = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].ark_mini = value;
        this.setState({
            data
        });
    }
    onArkSmall = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].ark_small = value;
        this.setState({
            data
        });
    }
    onArkMediumA = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].ark_medium_a = value;
        this.setState({
            data
        });
    }
    onArkMediumB = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].ark_medium_b = value;
        this.setState({
            data
        });
    }
    onArkBigA = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].ark_big_a = value;
        this.setState({
            data
        });
    }
    onArkBigB = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].ark_big_b = value;
        this.setState({
            data
        });
    }
    onClassC = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].class_c = value;
        this.setState({
            data
        });
    }
    onDried = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].dried = value;
        this.setState({
            data
        });
    }
    onMix = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].mix = value;
        this.setState({
            data
        });
    }
    onTails = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].tails = value;
        this.setState({
            data
        });
    }
    onOther = ({ currentTarget: input }, index) => {
        let value = input.value;
        const { data } = this.state;
        const { histories } = data;
        histories[index].other = value;
        this.setState({
            data
        });
    }

    addInoculationShelf = (index) => {
        const { data } = this.state;
        data.histories.push({
            name: '',
            work_hours: 0,
            ark_mini: 0,
            ark_small: 0,
            ark_medium_a: 0,
            ark_medium_b: 0,
            ark_big_a: 0,
            ark_big_b: 0,
            class_c: 0,
            dried: 0,
            mix: 0,
            tails: 0,
            other: 0
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
    
    onArkMiniTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].ark_mini)
        }
        data.ark_mini_total = count;
        this.setState({
            data
        })
    }
    onArkSmallTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].ark_small)
        }
        data.ark_small_total = count;
        this.setState({
            data
        })
    }
    onArkMediumATotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].ark_medium_a)
        }
        data.ark_medium_a_total = count;
        this.setState({
            data
        })
    }
    onArkMediumBTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].ark_medium_b)
        }
        data.ark_medium_b_total = count;
        this.setState({
            data
        })
    }
    onArkBigATotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].ark_big_a)
        }
        data.ark_big_a_total = count;
        this.setState({
            data
        })
    }
    onArkBigBTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].ark_big_b)
        }
        data.ark_big_b_total = count;
        this.setState({
            data
        })
    }
    onClassCTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].class_c)
        }
        data.class_c_total = count;
        this.setState({
            data
        })
    }
    onDriedTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].dried)
        }
        data.dried_total = count;
        this.setState({
            data
        })
    }
    onMixTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].mix)
        }
        data.mix_total = count;
        this.setState({
            data
        })
    }    
    onTailsTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].tails)
        }
        data.tails_total = count;
        this.setState({
            data
        })
    }    
    onOtherTotal = () => {
        const { data } = this.state;
        let { histories } = data;
        let count = 0;
        for(let i = 0;i<histories.length;i++)
        {
            count += parseInt(histories[i].other)
        }
        data.other_total = count;
        this.setState({
            data
        })
    }

    onAverageChange = () => {
        this.onArkMiniTotal();
        this.onArkSmallTotal();
        this.onArkMediumATotal();
        this.onArkMediumBTotal();
        this.onArkBigATotal();
        this.onArkBigBTotal();
        this.onClassCTotal();
        this.onDriedTotal();
        this.onMixTotal();
        this.onTailsTotal();
        this.onOtherTotal();
    }

    render() {
        const { data, errors, plant, loading } = this.state;
        const { ark_mini_total, ark_small_total, ark_medium_a_total, ark_medium_b_total, ark_big_a_total, ark_big_b_total, class_c_total, dried_total, mix_total, tails_total, other_total, weight_bruto, weight_neto, role, note, rate, histories } = data;
        const { toggleList, pointer, privileges } = this.props;
        let options = {day:'numeric', month: 'short', year: 'numeric'}
        let today_date = new Date();
        let today = today_date.toLocaleString('en-GB', options);
        return (
            <React.Fragment>
                <div onClick={toggleList.bind(this)} className={`timeline-info ${pointer === 9 ? 'active' : ''}`} >
                    <div className={`timeline-click`}>
                        <span className="title">
                            <img src="./assets/img/circle.svg" alt="" />
                            Sortimi dhe Paketimi sipas kategorise
                        </span>
                    </div>
                    {plant.sort_package.map((element, index) =>(
                        <div key={index} className={`timeline-show ${pointer === 9 ? 'active' : ''}`}>
                            <div className={`timline-helper`}>
                                <div className={`left-timeline`}>
                                    <img src="./assets/img/circle.svg" alt="" />
                                    <div className="line">
                                        <div className="line-wrapper"></div>
                                    </div>
                                </div>
                                <div className={`right-timeline`}>
                                    <div className={`progress`} >
                                        <span>{element.date}</span>
                                        <span><img src="./assets/img/circle.svg" alt="" /></span>
                                        <span>Start:</span>
                                        <span>{element.time}</span>
                                        <span><img src="./assets/img/circle.svg" alt="" /></span>
                                        <span>{element.user.name}</span>
                                    </div>
                                    <div className={`progress-content`}>
                                        <span className="title">Kerkes per te hyra per prodhimin e lendes se pare</span>
                                        {
                                            element.employees.map((e, idx) =>
                                                <div key={idx} className={`extra-form map sort`}>
                                                    <div className="materials">
                                                        <span>Emri: {e.name}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Ore Pune: {e.work_hours}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Mini Arka: {e.ark_mini}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Arka te vogla: {e.ark_small}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Arka te mesme (A): {e.ark_medium_a}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Arka te mesme (B): {e.ark_medium_b}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Arka te medha (A): {e.ark_big_a}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Arka te medha (B): {e.ark_big_b}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Klasa C: {e.class_c}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Te Thata: {e.dried}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Mix: {e.mix}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Bishta: {e.tails}</span>
                                                    </div>
                                                    <div className="materials">
                                                        <span>Tjera: {e.other}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className="materials">
                                            <span>Mini Arka: {element.ark_mini}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Arka te vogla: {element.ark_small}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Arka te mesme (A): {element.ark_medium_a}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Arka te mesme (B): {element.ark_medium_b}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Arka te medha (A): {element.ark_big_a}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Arka te medha (B): {element.ark_big_b}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Klasa C: {element.class_c}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Te Thata: {element.dried}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Mix: {element.mix}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Bishta: {element.tails}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Tjera: {element.other}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Pesha Bruto e Kerpudhave: {element.weight_bruto}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Pesha Neto e Kerpudhave: {element.weight_neto}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Rate: {element.rate}</span>
                                        </div>
                                        <div className="materials">
                                            <span>Shenime: {element.note}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {plant.status !== 'Bartur ne Friz' && (role === 'admin' || (privileges.access_sort_package && plant.sort_package && plant.sort_package.length < 1)) &&
                        <div className={`timeline-show ${pointer === 9 ? 'active' : ''}`}>
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
                                        {/* <span><img src="./assets/img/circle.svg" alt="" /></span>
                                        <span>Start</span>
                                        <span>9:55am</span> */}
                                    </div>
                                    <div className={`progress-content`}>
                                        <form autoComplete="off" onSubmit={this.handleSubmit} >
                                            {
                                                histories.map((history, index) =>
                                                    <AddEmployer
                                                        key={index}
                                                        history={history}
                                                        index={index}
                                                        handleChangeDropdown1={this.handleChangeDropdown1}
                                                        handleChangeDropdown={this.handleChangeDropdown}
                                                        onNameChange={this.onNameChange}
                                                        onWorkChange={this.onWorkChange}
                                                        onArkaMini={this.onArkaMini}
                                                        onArkSmall={this.onArkSmall}
                                                        onArkMediumA={this.onArkMediumA}
                                                        onArkMediumB={this.onArkMediumB}
                                                        onArkBigA={this.onArkBigA}
                                                        onArkBigB={this.onArkBigB}
                                                        onClassC={this.onClassC}
                                                        onDried={this.onDried}
                                                        onMix={this.onMix}
                                                        onTails={this.onTails}
                                                        onOther={this.onOther}
                                                        // onArkMiniTotal={this.onArkMiniTotal}
                                                        // onArkSmallTotal={this.onArkSmallTotal}
                                                        // onArkMediumATotal={this.onArkMediumATotal}
                                                        // onArkMediumBTotal={this.onArkMediumBTotal}
                                                        // onArkBigATotal={this.onArkBigATotal}
                                                        // onArkBigBTotal={this.onArkBigBTotal}
                                                        // onClassCTotal={this.onClassCTotal}
                                                        // onDriedTotal={this.onDriedTotal}
                                                        // onMixTotal={this.onMixTotal}
                                                        // onTailsTotal={this.onTailsTotal}
                                                        // onOtherTotal={this.onOtherTotal}
                                                        onAverageChange={this.onAverageChange}
                                                        deleteInoculationShelf={this.deleteInoculationShelf}
                                                        plant={plant}
                                                        addInoculationShelf={this.addInoculationShelf}
                                                        length={histories.length}
                                                        onKey={this.onWorkHours}
                                                        onQuantity={this.onQuantity}
                                                    />
                                                )
                                            }
                                            <div className="materials">
                                                {this.renderInput("ark_mini_total", null, 'ark_mini_total', ark_mini_total, this.handleChange, errors.ark_mini_total, false, "Mini Arka", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("ark_small_total", null, 'ark_small_total', ark_small_total, this.handleChange, errors.ark_small_total, false, "Arka te vogla", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("ark_medium_a_total", null, 'ark_medium_a_total', ark_medium_a_total, this.handleChange, errors.ark_medium_a_total, false, "Arka te mesme (A)", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("ark_medium_b_total", null, 'ark_medium_b_total', ark_medium_b_total, this.handleChange, errors.ark_medium_b_total, false, "Arka te mesme (B)", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("ark_big_a_total", null, 'ark_big_a_total', ark_big_a_total, this.handleChange, errors.ark_big_a_total, false, "Arka te medha (A)", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("ark_big_b_total", null, 'ark_big_b_total', ark_big_b_total, this.handleChange, errors.ark_big_b_total, false, "Arka te medha (B)", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("class_c_total", null, 'class_c_total', class_c_total, this.handleChange, errors.class_c_total, false, "Klasa C", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("dried_total", null, 'dried_total', dried_total, this.handleChange, errors.dried_total, false, "Te Thata", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("mix_total", null, 'mix_total', mix_total, this.handleChange, errors.mix_total, false, "Mix", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("tails_total", null, 'tails_total', tails_total, this.handleChange, errors.tails_total, false, "Bishta", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("other_total", null, 'other_total', other_total, this.handleChange, errors.other_total, false, "Tjera", true, 'number')}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("weight_bruto", null, 'weight_bruto', weight_bruto, this.handleChange, errors.weight_bruto, false, "Pesha Bruto e Kerpudhave")}
                                            </div>
                                            <div className="materials">
                                                {this.renderInput("weight_neto", null, 'weight_neto', weight_neto, this.handleChange, errors.weight_neto, false, "Pesha Neto e Kerpudhave")}
                                            </div>
                                            <div className="rate-quality">
                                                <span className="input-name">Rate Quality Controll</span>
                                                <div className={`radio-group`} onMouseLeave={this.onRateRemove} >
                                                    <div className={`radio-star ${rate > 0 ? 'active' : ''}`}>
                                                        <img onMouseMove={this.onRateMove.bind(this, 1)} onClick={this.onRateChange.bind(this, 1)} src="./assets/img/star.svg" alt=""/>
                                                    </div>
                                                    <div className={`radio-star ${rate > 1 ? 'active' : ''}`}>
                                                        <img onMouseMove={this.onRateMove.bind(this, 2)} onClick={this.onRateChange.bind(this, 2)} src="./assets/img/star.svg" alt=""/>
                                                    </div>
                                                    <div className={`radio-star ${rate > 2 ? 'active' : ''}`}>
                                                        <img onMouseMove={this.onRateMove.bind(this, 3)} onClick={this.onRateChange.bind(this, 3)} src="./assets/img/star.svg" alt=""/>
                                                    </div>
                                                    <div className={`radio-star ${rate > 3 ? 'active' : ''}`}>
                                                        <img onMouseMove={this.onRateMove.bind(this, 4)} onClick={this.onRateChange.bind(this, 4)} src="./assets/img/star.svg" alt=""/>
                                                    </div>
                                                    <div className={`radio-star ${rate > 4 ? 'active' : ''}`}>
                                                        <img onMouseMove={this.onRateMove.bind(this, 5)} onClick={this.onRateChange.bind(this, 5)} src="./assets/img/star.svg" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                            {this.renderTextArea("note", null, 'note', note, this.handleChange, errors.note, true, false, '5', false, 'Shenim')}
                                            <div className="form-button">
                                                {this.renderSubmitButton(`${getLanguage().save_data}`, loading)}
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

export default SortCategory;