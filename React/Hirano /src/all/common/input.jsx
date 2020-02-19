import React from 'react';

const Input = ({name, label, placeholder, onChange, id, value, error = false, horizontal = true, type="text", disabled = false, message = "", depend = null }) => {
    const inputClasses = error ? 'input-control is-invalid' : 'input-control';
    const inputWarning = error ? 'is-invalid' : '';    

    const onClickError = (e) => {
        const elements=document.getElementsByClassName("invalid-tooltip");
        
        if (!e.target.parentNode.parentNode.className.includes('invalid-tooltip')) {
            if(elements[0])
            {
                elements[0].classList.remove("invalid-tooltip");
            }
            e.target.parentNode.parentNode.className += ' invalid-tooltip'
        }else {
            e.target.parentNode.parentNode.className = 'input-form input-control is-invalid'
        }
    }
    
    return (
        <React.Fragment>
            <div className={`input-form ` + inputClasses}>
                <span className="input-name">{placeholder}</span>
                <input placeholder={''} onChange={onChange} value={value} disabled={disabled} data-depend={depend} name={name} id={id} type={type} className={inputClasses} />
                <div className={`warning-circle ` + inputWarning}>
                    <img onClick={onClickError.bind(this)} src="./assets/img/warning-sign.svg" alt=""/>
                </div>
                <div className={`warning-tooltip `} >
                    <p className={`error-message ` + inputClasses}>{error}</p>
                </div>
                {name === 'price' &&
                    <div className={`euro-sign`}>
                        <img src="./assets/img/euro-sign.svg" alt=""/>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

export default Input;