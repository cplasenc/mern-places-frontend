import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList/PlaceList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from '../components/UIElements/ErrorModal/ErrorModal';
import Spinner from '../components/UIElements/Spinner/LoadingSpinner';
import LoadingSpinner from '../components/UIElements/Spinner/LoadingSpinner';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (error) {
                
            }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
        </React.Fragment>
    );
};

export default UserPlaces;