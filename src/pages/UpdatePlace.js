import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';
import './PlaceForm.css';
import { useForm } from '../hooks/form-hook';
import Card from '../components/UIElements/Card/Card';
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from '../components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../components/UIElements/ErrorModal/ErrorModal';
import { AuthContext } from '../context/auth-context';

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    }
                )
            } catch (error) {
            }
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);


    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/' + auth.userId + 'places');
        } catch (err) {
        }
    };

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className='center'>
                <Card>
                    <h2>No se ha podido encontrar ningún lugar</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
                    <Input
                        id='title'
                        element='input'
                        type='text'
                        label='Título'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Por favor introduce un título válido'
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id='description'
                        element='textarea'
                        label='Descripción'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText='Por favor introduce una descripción válida (min. 5 caracteres)'
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type='submit' disabled={!formState.isValid}>Modificar lugar</Button>
                </form>)}
        </React.Fragment>
    )
};

export default UpdatePlace;