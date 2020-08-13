import React from 'react';
import './PlaceItem.css';
import Card from '../UIElements/Card/Card';

const PlaceItem = props => {

    return (<li className='place-item'>
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
                <button>VER EN MAPA</button>
                <button>EDITAR</button>
                <button>BORRAR</button>
            </div>
        </Card>
    </li>)

};

export default PlaceItem;