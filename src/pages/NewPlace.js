import React from 'react';
import './PlaceForm.css';
import Input from '../components/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';
import Button from '../components/Button/Button';
import { useForm } from '../hooks/form-hook';

const NewPlace = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className='place-form' onSubmit={placeSubmitHandler}>
            <Input id='title'
                element='input'
                type='text'
                label='Título'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Introduce un valor válido'
                onInput={inputHandler}
            />
            <Input id='description'
                element='textarea'
                label='Descripción'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Introduce una descripción.'
                onInput={inputHandler}
            />
            <Input id='address'
                element='input'
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Introduce una dirección válida'
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
                AÑADIR LUGAR
            </Button>
        </form>
    );
};

export default NewPlace;