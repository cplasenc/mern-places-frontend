import React from 'react';
import PlaceList from '../components/PlaceList/PlaceList';
import { useParams } from 'react-router-dom';

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
        title: 'titulo2',
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

const UserPlaces = () => {
    //consigue el id de usuario de la url
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces} />

};

export default UserPlaces;