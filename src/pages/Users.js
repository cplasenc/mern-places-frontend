import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList/UsersList';
import ErrorModal from '../components/UIElements/ErrorModal/ErrorModal';
import Spinner from '../components/UIElements/Spinner/LoadingSpinner';
import { useHttpClient } from '../hooks/http-hook';

const Users = () => {
    //const [isLoading, setIsLoading] = useState(false);
    //const [error, setError] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');

                setLoadedUsers(responseData.users);

            } catch (err) {
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <Spinner />
                </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default Users;