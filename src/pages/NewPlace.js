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
import ImageUpload from '../components/ImageUpload/imageUpload';

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
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const history = useHistory();

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);
            await sendRequest(
                'http://localhost:5000/api/places', 
                'POST', 
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/');
            } catch (err) { }
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
                <ImageUpload id='image' onInput={inputHandler} errorText='Selecciona una image' />
                <Button type='submit' disabled={!formState.isValid}>
                    AÑADIR LUGAR
            </Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;