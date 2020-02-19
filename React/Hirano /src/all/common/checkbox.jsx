import React from 'react';
// import '../../check.sass'

const Checkbox = ({ name, value, onChange, id, label, error = false, horizontal = true, disabled = false, tooltip = false, message = "", depend = null }) => {
    const inputClasses = error ? 'form-control is-invalid' : 'form-control';

    return (
        <React.Fragment>
                <input disabled={disabled} checked={value} name={name} data-depend={depend} id={id} type='checkbox' onChange={onChange} className={inputClasses} />
                <label htmlFor={id} className="toggle"><span></span></label> 
        </React.Fragment>
            
    );
}

export default Checkbox;