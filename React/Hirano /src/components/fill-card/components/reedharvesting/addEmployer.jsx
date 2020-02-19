import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'

class AddEmployer extends Component {
    onAverageChange = () => {
        let { history } = this.props;
        history.average = history.quantity / history.work_hours;
        this.props.onQuantity();
        this.props.onKey();
    }

    render() {
        const { onChange, onChange1, onChange2, onChange3, onChange4, onChange5, history, index, deleteInoculationShelf, addInoculationShelf, length } = this.props;
        return (
            <React.Fragment>
                <div className={`extra-form`}>
                    <div className="materials">
                        <span className="input-name">Emri Dhe Mbiemri</span>
                        <input value={history.name} onChange={(e) => onChange1(e, index)} type="text" placeholder='Emri dhe Mbiemri' />
                    </div><div className="materials">
                        <span className="input-name">Ore Pune</span>
                        <input type="number" onKeyUp={this.onAverageChange} value={history.work_hours} onChange={(e) => onChange(e, index)} placeholder='Ore Pune' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Numri Arkave</span>
                        <input onKeyUp={this.onAverageChange} type="number" value={history.quantity} onChange={(e) => onChange2(e, index)} placeholder='Numri Arkave' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Mesatarja e korrjeve per Arkë</span>
                        <input type="number" value={history.average} onChange={(e) => onChange3(e, index)} placeholder='Mesatarja e korrjeve' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Pesha Bruto e Kerpurdhave</span>
                        <input type="number" value={history.weight_bruto_employe} onChange={(e) => onChange4(e, index)} placeholder='Mesatarja e korrjeve' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Pesha Neto e Kerpurdhave</span>
                        <input type="number" value={history.weight_neto_employe} onChange={(e) => onChange5(e, index)} placeholder='Mesatarja e korrjeve' />
                    </div>
                    <div className={`materials delete`}>
                        {(index+1) === length &&
                            <button type="button" onClick={addInoculationShelf.bind(this, index)}>Add</button>
                        }
                        {index !== 0 &&
                            <button type="button" onClick={deleteInoculationShelf.bind(this, index)}>Remove</button>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddEmployer;