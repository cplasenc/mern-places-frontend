import React, { useState, useContext } from 'react';

import './Auth.css';
import Card from '../../components/UIElements/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import { AuthContext } from '../../context/auth-context';
import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import Spinner from '../../components/UIElements/Spinner/LoadingSpinner';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
        } else {
            try {
                setIsLoading(true);
                
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                
                const responseData = await response.json();
                console.log(responseData);
                setIsLoading(false);
                auth.login();
            } catch (error) {
                console.log(error);
                setError(error.message || 'Algo no ha funcionado como debía, vuelve a intentarlo');
            }
        }
        setIsLoading(false);

        auth.login();
    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    return <Card className='authentication'>
        {isLoading && <Spinner asOverlay />}
        <h2>Iniciar sesión</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
                <Input
                    element='input'
                    id='name'
                    type='text'
                    label='Tu nombre'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Introduce un nombre'
                    onInput={inputHandler}
                />
            )}
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
            <Button type='submit' disabled={!formState.isValid}>{isLoginMode ? 'Iniciar sesión' : 'Registrarse'}</Button>
        </form>

        <Button inverse onClick={switchModeHandler}>{isLoginMode ? 'Registrarse' : 'Iniciar Sesión'}</Button>

    </Card>
};

export default Auth;