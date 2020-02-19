import React from 'react';

const TextArea = ({ name, value, onChange, id, label, error = false, horizontal = true, disabled = false, tooltip = false, message = "", rows = 10 }) => {
    const inputClasses = error ? 'input-control is-invalid' : 'input-control';
    const inputWarning = error ? 'is-invalid' : '';    
    var parentDiv = " form-group";
    // var labelClasses = '';
    if (horizontal) {
        // divClass = 'form-group-wrapper';
        // labelClasses += 'col-sm-3 col-form-label'
    }

    const onClickError = (e) => {
        const elements=document.getElementsByClassName("invalid-tooltip");
        
        if (!e.target.parentNode.parentNode.className.includes('invalid-tooltip')) {
            if(elements[0])
            {
                elements[0].classList.remove("invalid-tooltip");
            }
            e.target.parentNode.parentNode.className += ' invalid-tooltip form-group'
        }else {
            e.target.parentNode.parentNode.className = 'input-form input-control is-invalid'
        }
    }

    return (
        <div className={`input-form ` + inputClasses + parentDiv}>
            <span className="input-name">{message}</span>
            <textarea rows={rows} value={value} disabled={disabled} name={name} id={id} onChange={onChange} className={inputClasses} />
            <div className={`warning-circle ` + inputWarning}>
                <img onClick={onClickError.bind(this)} src="./assets/img/warning-sign.svg" alt=""/>
            </div>
            <div className={`warning-tooltip `} >
                <p className={`error-message ` + inputClasses}>{error}</p>
            </div>
            {/* <div className={divClass}>
            </div> */}
        </div>
        );
}

export default TextArea;