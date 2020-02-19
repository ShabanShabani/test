import React from 'react';
import { FilePond } from 'react-filepond';
import MyTooltip from './my-tooltip'
import 'filepond/dist/filepond.min.css';

const UploadInput = ({ name, label, allowedTypes, onChange, error = false, horizontal = true, tooltip = false, message = "", maxFiles = null, uploadLabel = "" }) => {
    var divClass = 'file-upload-wrapper';
    var parentDiv = "form-group";
    var labelClasses = '';
    if (horizontal) {
        divClass += ' col-sm-9';
        labelClasses += ' col-sm-3 col-form-label'
        parentDiv += ' row';
    }
    if (error) divClass += ' error';

    if (allowedTypes === 'image') allowedTypes = 'jpeg,jpg,gif,png,bmp,tiff'

    return (
        <div className={parentDiv}>
            <label className={labelClasses}>
                {label}
                {tooltip && <MyTooltip name={name} message={message} />
                }
            </label>
            <div className={divClass}>
                <FilePond allowMultiple={true}
                    labelIdle={uploadLabel}
                    beforeAddFile={() => { 
                        return false; 
                    }}
                    maxFiles={maxFiles}
                    onupdatefiles={(fileItems) => {
                        if(fileItems.length>0)
                        onChange({ currentTarget: { type: 'file', name: name, value: fileItems.map(fileItem => fileItem.file) } })
                    }
                    }>
                </FilePond>
            </div>
        </div>
    )
}

export default UploadInput;