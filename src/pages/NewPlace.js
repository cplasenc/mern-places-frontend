import React, { useCallback } from 'react';
import './NewPlace.css';
import Input from '../components/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';

const NewPlace = () => {

    const titleChangeHandler = useCallback((id, value, isValid) => {}, []);
    const descriptionChangeHandler = useCallback((id, value, isValid) => {}, []);

    return (
        <form className='place-form'>
            <Input  id='title'
                    element='input' 
                    type='text' 
                    label='Title' 
                    validators={[VALIDATOR_REQUIRE()]} 
                    errorText='Introduce un valor válido' 
                    onInput={titleChangeHandler}
            />
            <Input  id='description'
                    element='textarea' 
                    label='Descripción' 
                    validators={[VALIDATOR_MINLENGTH(5)]} 
                    errorText='Introduce una descripción.' 
                    onInput={descriptionChangeHandler}
            />

        </form>
    )
};

export default NewPlace;