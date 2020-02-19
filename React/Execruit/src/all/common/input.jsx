import React from 'react';

// const Input = ({ name, label, placeholder, onChange, id, value, error = false, horizontal = true, type = "text", disabled = false, message = "", depend = null }) => {
//     const inputClasses = error ? 'input-control is-invalid' : 'input-control';
//     var divClass = '';
//     var parentDiv = "form-group";
//     var labelClasses = '';
//     if (horizontal) {
//         divClass = 'col-sm-9';
//         labelClasses += ' col-sm-3 col-form-label'
//         parentDiv += ' row';
//     }
const Input = ({ name, label, placeholder, onChange, id, value, error = false, horizontal = true, type = "text", disabled = false, message = "", depend = null }) => {
    const inputClasses = error ? 'input-control is-invalid' : 'input-control';
    const inputWarning = error ? 'is-invalid' : '';

    const onClickError = (e) => {
        const elements = document.getElementsByClassName("invalid-tooltip");

        if (!e.target.parentNode.parentNode.className.includes('invalid-tooltip')) {
            if (elements[0]) {
                elements[0].classList.remove("invalid-tooltip");
            }
            e.target.parentNode.parentNode.className += ' invalid-tooltip'
        } else {
            e.target.parentNode.parentNode.className = 'input-form input-control is-invalid'
        }
    }
    return (
        // <React.Fragment>
        //     {/* {label &&
        //     <label className={labelClasses}>
        //         {label}
        //         {tooltip && <MyTooltip name={name} message={message} />
        //         }
        //     </label>
        //     } */}
        //     <div className={`input-form ` + inputClasses}>
        //         <input placeholder={placeholder} onChange={onChange} value={value} disabled={disabled} data-depend={depend} name={name} id={id} type={type} className={inputClasses} />
        //         <p className={`error-message ` + inputClasses}>{error}</p>
        //     </div>
        // </React.Fragment>
        <React.Fragment>
            <div className={`input-form ` + inputClasses}>
                {/* <span className="input-name">{placeholder}</span> */}
                <input placeholder={placeholder} onChange={onChange} value={value} disabled={disabled} data-depend={depend} name={name} id={id} type={type} className={inputClasses} />
                <div className={`warning-circle ` + inputWarning}>
                    <img onClick={onClickError.bind(this)} src="../img/warning-sign.svg" alt="" />
                </div>
                <div className={`warning-tooltip `} >
                    <p className={`error-message ` + inputClasses}>{error}</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Input;