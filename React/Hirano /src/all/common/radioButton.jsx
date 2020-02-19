import React from 'react';

const RadioButton = ({ checked, name, value, onChange, id, error, disabled = false, depend = null}) => {

    return (
        <React.Fragment>
                <input type="radio" checked={checked} name={name} value={value} disabled={disabled} onChange={onChange} id={id} error={error} data-depend={depend} />
        </React.Fragment>
            
    );
}

export default RadioButton;