import React, { useState } from 'react';
import './PlaceItem.css';
import Card from '../UIElements/Card/Card';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const PlaceItem = props => {

    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <React.Fragment>
                <Modal show={showMap} onCancel={closeMapHandler} header={props.address} contentClass='place-item__modal-content' footerClass='place-item__modal-actions' footer={<Button onClick={closeMapHandler}>CERRAR</Button>}>
                    <div className='map-container'>
                        <h2>MAPA</h2>
                    </div>
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
                        <Button to={`/places/${props.id}`}>EDITAR</Button>
                        <Button danger>BORRAR</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )

};

export default PlaceItem;