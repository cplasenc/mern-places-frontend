import React from 'react';
import './NewPlace.css';
import Input from '../components/Input/Input';
import { VALIDATOR_REQUIRE } from '../util/validators';

const NewPlace = () => {
    return (
        <form className='place-form'>
            <Input element='input' type='text' label='Title' validators={[VALIDATOR_REQUIRE()]} errorText='Introduce un valor válido' />
        </form>
    )
};

export default NewPlace;