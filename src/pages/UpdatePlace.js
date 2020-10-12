import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';
import './PlaceForm.css';
import { useForm } from '../hooks/form-hook';

const DUMMY_PLACES = [
    {
        id: '1',
        title: 'titulo',
        description: 'descripcion',
        imageUrl: 'https://s3-us-west-2.amazonaws.com/lasaga-blog/media/original_images/grupo_imagen.jpg',
        address: 'direccion de prueba',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: '2',
        title: 'titulo',
        description: 'descripcion',
        imageUrl: 'https://s3-us-west-2.amazonaws.com/lasaga-blog/media/original_images/grupo_imagen.jpg',
        address: 'direccion de prueba',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    const [formState, inputHandler] = useForm({
        title: {
            value: identifiedPlace.title,
            isValid: true
        },
        description: {
            value: identifiedPlace.description,
            isValid: true
        }
    }, true);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
        return (
            <div className='center'>
                <h2>No se ha podido encontrar ningún lugar</h2>
            </div>
        );
    }

    return <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
        <Input
            id='title'
            element='input'
            type='text'
            label='Título'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Por favor introduce un título válido'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
        />
        <Input
            id='description'
            element='textarea'
            label='Descripción'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Por favor introduce una descripción válida (min. 5 caracteres)'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.value}
        />
        <Button type='submit' disabled={!formState.isValid}>Modificar lugar</Button>
    </form>
};

export default UpdatePlace;