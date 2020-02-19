import React from 'react';
import '../../check.sass'

const Checkbox = ({ name, value, onChange, id, label, error = false, horizontal = true, disabled = false, tooltip = false, message = "", depend = null }) => {
    const inputClasses = error ? 'form-control is-invalid' : 'form-control';
    // var divClass = '';
    // var parentDiv = "form-group";
    // var labelClasses = '';
    // if (horizontal) {
    //     divClass = 'col-sm-9';
    //     labelClasses += ' col-sm-3 col-form-label'
    //     parentDiv += ' row';
    // }

    return (
        <React.Fragment>
            {/* <label className={labelClasses}>
                {label}
                {tooltip && <MyTooltip name={name} message={message} />
                }
            </label> */}
                <input disabled={disabled} value={value} name={name} data-depend={depend} id={id} type='checkbox' onChange={onChange} className={inputClasses} style={{ display: 'none' }} />
                <label htmlFor={id} className="toggle"><span></span></label> 
        </React.Fragment>
            
    );
}

export default Checkbox;