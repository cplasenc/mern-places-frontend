import React from 'react';
import './UsersList.css'
import UserItem from '../UserItem/UserItem';
import Card from '../UIElements/Card/Card';

const UsersList = props => {
    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>Usuarios no encontrados</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className='users-list'>
            {props.items.map(user => (
                <UserItem
                    key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places.length} />
            ))}
        </ul>
    );
};

export default UsersList;