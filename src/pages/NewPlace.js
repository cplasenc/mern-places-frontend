import React, { useContext } from 'react';
import './PlaceForm.css';
import Input from '../components/Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';
import Button from '../components/Button/Button';
import { useForm } from '../hooks/form-hook';
import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';
import ErrorModal from '../components/UIElements/ErrorModal/ErrorModal';
import Spinner from '../components/UIElements/Spinner/LoadingSpinner';
import { useHistory } from 'react-router-dom';

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

    const history = useHistory();

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId
            }),
            {
                'Content-Type': 'application/json'
            }
        );
        history.push('/')
        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={placeSubmitHandler}>
                {isLoading && <Spinner asOverlay />}
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
        </React.Fragment>
    );
};

export default NewPlace;