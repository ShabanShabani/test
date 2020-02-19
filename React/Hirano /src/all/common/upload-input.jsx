import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const UploadInput = ({ name, allowedTypes, onChange, error = false, maxFiles = null}) => {
    // if (error) divClass += ' error';

    if (allowedTypes === 'image') allowedTypes = 'jpeg,jpg,gif,png,bmp,tiff'

    return (
        <FilePond allowMultiple={true}
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
    )
}

export default UploadInput;