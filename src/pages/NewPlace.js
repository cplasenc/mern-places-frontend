import React, { useCallback, useReducer } from 'react';
import './PlaceForm.css';
import Input from '../components/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';
import Button from '../components/Button/Button';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

const NewPlace = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id });
    }, []);

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