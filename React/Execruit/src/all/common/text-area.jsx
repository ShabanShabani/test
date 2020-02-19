import React from 'react';
import MyTooltip from './my-tooltip'

const TextArea = ({ maxCounter, name, value, placeholder, onChange, id, label, error = false, horizontal = true, disabled = false, tooltip = false, message = "", rows = 10 }) => {
    const inputClasses = error ? 'form-control is-invalid' : 'form-control';
    var divClass = '';
    var parentDiv = "form-group";
    var labelClasses = '';

    if (horizontal) {
        divClass = 'col-sm-9';
        labelClasses += 'col-sm-3 col-form-label'
        parentDiv += ' row';
    }

    return (
        <div className={parentDiv}>
            <label className={labelClasses}>
                {label}
                {tooltip && <MyTooltip name={name} message={message} />
                }
            </label>

            <div className={divClass}>
                <textarea maxLength={maxCounter} placeholder={placeholder} rows={rows} value={value} disabled={disabled} name={name} id={id} onChange={onChange} className={inputClasses} />
            </div>
        </div>
    );
}

export default TextArea;