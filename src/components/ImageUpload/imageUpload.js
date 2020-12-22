import React from 'react';
import './ImageUpload.css';

const ImageUpload = props => {
    return (
        <div className='form-control'>
            <input id={props.id} type="file" />
        </div>
    ); 
};

export default ImageUpload;