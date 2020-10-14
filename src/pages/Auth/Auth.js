import React from 'react';

import './Auth.css';
import Card from '../../components/UIElements/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';

const Auth = () => {

    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return <Card className='authentication'>
        <h2>Iniciar sesión</h2>
    <hr />
        <form onSubmit={authSubmitHandler}>
            <Input
                element='input'
                id='email'
                type='email'
                label='Correo electrónico'
                validators={[VALIDATOR_EMAIL()]}
                errorText='El formato no es correcto'
                onInput={inputHandler}
            />
            <Input
                element='input'
                id='password'
                type='password'
                label='Contraseña'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Introduce una contraseña válida con un mínimo de 5 caracteres'
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>Iniciar sesión</Button>
        </form>
    </Card>
};

export default Auth;