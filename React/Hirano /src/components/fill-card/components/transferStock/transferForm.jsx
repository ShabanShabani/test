import React from 'react';
import Form from '../../../../all/common/form';
import { Dropdown } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { getLanguage } from '../../../global/language';

class TransferForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            loading:'',
            plant: this.props.plant,
            data: {
                nr_green_house:  '',
                nr_shelf: '',
                nr_blocks_shelf: ''
            }
        }
    }
    
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            plant: newProps.plant
        })
    }
    
    render() {
        const { onChange, history, index, options, options1, handleChangeDropdown, handleChangeDropdown1, deleteInoculationShelf, addInoculationShelf, length, onKeyUpInaculation } = this.props;
        return (
            <React.Fragment>
                <div className={`extra-form`}>
                    <div className="materials">
                        <div className={`input-field input-form input-control`}>
                            <span className="input-name">{getLanguage().pick_gr_house}</span>
                            <Dropdown
                                onChange={handleChangeDropdown.bind(this, index)}
                                defaultValue={history.nr_green_house}
                                defaultOpen={false}
                                search
                                selection
                                options={options}
                            />   
                        </div>        
                    </div>
                    <div className="materials">
                        <div className={`input-field input-form input-control`}>
                            <span className="input-name">{getLanguage().pick_shelf}</span>
                            <Dropdown
                                onChange={handleChangeDropdown1.bind(this, index)}
                                defaultValue={history.nr_shelf}
                                defaultOpen={false}
                                search
                                selection
                                options={options1}
                            />   
                        </div>
                    </div>
                    <div className="materials">
                        <span className="input-name">{getLanguage().nrblocks_shelf}</span>
                        <input value={history.nr_blocks_shelf} onChange={(e) => onChange(e, index)} type="number" placeholder={getLanguage().nrblocks_shelf} onKeyUp={onKeyUpInaculation} />
                    </div>
                    <div className={`materials delete`}>
                        {(index+1) === length &&
                            <button type="button" onClick={addInoculationShelf.bind(this, index)}>{getLanguage().add}</button>
                        }
                        {index !== 0 &&
                            <button type="button" onClick={deleteInoculationShelf.bind(this, index)}>{getLanguage().remove}</button>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TransferForm;