import React from 'react';
import languageJson from '../../json/languageJson'

export let language = 'al';

export let languageJsonEn = languageJson.en 
export let languageJsonAl = languageJson.al 

export const setLanguage = (selectLanguage) => {
    language = selectLanguage;
}

export const getLanguage = () => {
    if(language === 'en'){
        return languageJsonEn
    }
    else if(language === 'al'){
        return languageJsonAl
    }
    else{
        return null
    }
}

export const onChangeLanguage = (getLanguage1) => {
    language = getLanguage1
}

export const ChangeLanguage = ({onClick}) => {
    return (
        <React.Fragment>
            <div className={`language-box`} onClick={onClick}>
                <span className={`${language === 'en' ? 'en' : ''}`} >AL</span>
                <span className={`${language === 'al' ? 'al' : ''}`} >EN</span>
            </div>
        </React.Fragment>
    )
}

export default {
    languageJsonEn,
    languageJsonAl,
    setLanguage,
    getLanguage,
    ChangeLanguage,
    onChangeLanguage
}

