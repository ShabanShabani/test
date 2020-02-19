import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'

class AddEmployer extends Component {
    
    render() {
        const {onNameChange, onWorkChange, onArkaMini, onArkSmall, onArkMediumA, onArkMediumB, onArkBigA, onArkBigB, onClassC, onDried, onMix, onTails, onOther, history, index, deleteInoculationShelf, addInoculationShelf, length, onAverageChange } = this.props;
        
        return (
            <React.Fragment>
                <div className={`extra-form`}>
                    <div className="materials">
                        <span className="input-name">Emri Dhe Mbiemri</span>
                        <input value={history.name} onChange={(e) => onNameChange(e, index)} type="text" placeholder='Emri dhe Mbiemri' />
                    </div><div className="materials">
                        <span className="input-name">Ore Pune</span>
                        <input type="number" value={history.work_hours} onChange={(e) => onWorkChange(e, index)} placeholder='Ore Pune' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Mini Arka</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.ark_mini} onChange={(e) => onArkaMini(e, index)} placeholder='Mini Arka' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Arka te vogla</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.ark_small} onChange={(e) => onArkSmall(e, index)} placeholder='Arka te vogla' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Arka te mesme (A)</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.ark_medium_a} onChange={(e) => onArkMediumA(e, index)} placeholder='Arka te mesme (A)' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Arka te mesme (B)</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.ark_medium_b} onChange={(e) => onArkMediumB(e, index)} placeholder='Arka te mesme (B)' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Arka te medha (A)</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.ark_big_a} onChange={(e) => onArkBigA(e, index)} placeholder='Arka te medha (A)' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Arka te medha (B)</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.ark_big_b} onChange={(e) => onArkBigB(e, index)} placeholder='Arka te medha (B)' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Klasa C</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.class_c} onChange={(e) => onClassC(e, index)} placeholder='Klasa C' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Te Thata</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.dried} onChange={(e) => onDried(e, index)} placeholder='Te Thata' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Mix</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.mix} onChange={(e) => onMix(e, index)} placeholder='Mix' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Bishta</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.tails} onChange={(e) => onTails(e, index)} placeholder='Bishta' />
                    </div>
                    <div className="materials">
                        <span className="input-name">Tjera</span>
                        <input type="number" onKeyUp={onAverageChange} value={history.other} onChange={(e) => onOther(e, index)} placeholder='Tjera' />
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