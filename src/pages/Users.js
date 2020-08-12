import React from 'react';
import UsersList from '../components/UsersList/UsersList';

const Users = () => {
    const USERS = [
        { id: 'u1', name: 'Pepe', image: 'https://s3-us-west-2.amazonaws.com/lasaga-blog/media/original_images/grupo_imagen.jpg', places: 3 }
    ];

    return <UsersList items={USERS} />;
};

export default Users;