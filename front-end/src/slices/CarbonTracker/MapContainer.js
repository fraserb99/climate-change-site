import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react'
import { DirectionsRenderer } from 'react-google-maps'; 
import {  } from 'google-map-react';
import { Col, Row } from 'react-bootstrap';
import { GOOGLE_KEY } from '../../infrastructure/api/config';

const MapContainer = ({google, route, ...props}) => {
    const [pos, setPos] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setPos, setPos({coords: {latitude: 55.860916, longitude: -4.251433}}));
    }, [])

    console.log(route);

    return (
        <div className='map-container'>
                {pos && <Map 
                    google={google}
                    initialCenter={{
                        lat: pos && pos.coords.latitude,
                        lng: pos && pos.coords.longitude
                    }}
                >
                    {route && 
                    <Polyline 
                        path={route}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                    />}
                </Map>}
        </div>
    )
}

export default (MapContainer)