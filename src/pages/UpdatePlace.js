import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../util/validators';

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

    if (!identifiedPlace) {
        return (
            <div className='center'>
                <h2>No se ha podido encontrar ningún lugar</h2>
            </div>
        );
    }

    return <form>
        <Input
            id='title'
            element='input'
            type='text'
            label='Título'
            validator={[VALIDATOR_REQUIRE]}
            errorText='Por favor introduce un título válido'
            onInput={() => { }}
            value={identifiedPlace.title}
            valid={true}
        />
        <Input
            id='description'
            element='textarea'
            label='Descripción'
            validator={[VALIDATOR_MINLENGTH(5)]}
            errorText='Por favor introduce una descripción válida (min. 5 caracteres)'
            onInput={() => { }}
            value={identifiedPlace.description}
            valid={true}
        />
        <Button type='submit' disabled={true}>Modificar lugar</Button>
    </form>
};

export default UpdatePlace;