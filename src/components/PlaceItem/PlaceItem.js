import React, { useState, useContext } from 'react';
import './PlaceItem.css';
import Card from '../UIElements/Card/Card';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Map from '../Map/Map';
import { AuthContext } from '../../context/auth-context';

const PlaceItem = props => {

    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log('Borrando...');
    };

    return (
        <React.Fragment>
            <Modal show={showMap} onCancel={closeMapHandler} header={props.address} contentClass='place-item__modal-content' footerClass='place-item__modal-actions' footer={<Button onClick={closeMapHandler}>CERRAR</Button>}>
                <div className='map-container'>
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header='¿Estás seguro?'
                footerClass='place-item__modal-actions'
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>Cancelar</Button>
                        <Button danger onClick={confirmDeleteHandler}>Eliminar</Button>
                    </React.Fragment>
                }>
                <p>¿Seguro que quieres eliminar este lugar?</p>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.descriptiom}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}>VER EN MAPA</Button>
                        {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDITAR</Button>}
                        {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>ELIMINAR</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )

};

export default PlaceItem;