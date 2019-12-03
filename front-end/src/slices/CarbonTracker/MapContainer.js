import React, { useState, useEffect } from 'react';
import { Map, Marker, Polyline } from 'google-maps-react'
import { Col, Row } from 'react-bootstrap';
import { GOOGLE_KEY } from '../../infrastructure/api/config';

const MapContainer = ({google, route, startPos, endPos, ...props}) => {
    const [pos, setPos] = useState();
    const [bounds, setBounds] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setPos, setPos({lat: 55.860916, lng: -4.251433}));
    }, [])

    useEffect(() => {
        if (pos && pos.coords) {
            setPos({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        }
    }, [pos])

    useEffect(() => {
        if (!startPos || !endPos) return;
        const newLat = startPos.location.lat() - ((startPos.location.lat() - endPos.location.lat()) / 2);
        const newLng = startPos.location.lng() - ((startPos.location.lng() - endPos.location.lng()) / 2);

        var newBounds = new google.maps.LatLngBounds();
        newBounds.extend({
            lat: startPos.location.lat(),
            lng: startPos.location.lng()
        });
        newBounds.extend({
            lat: endPos.location.lat(),
            lng: endPos.location.lng()
        });
        setBounds(newBounds);

        setPos({
            lat: newLat,
            lng: newLng
        })
    }, [startPos, endPos])

    return (
        <div className='map-container'>
                {pos && <Map 
                    google={google}
                    center={{
                        lat: pos && pos.lat,
                        lng: pos && pos.lng
                    }}
                    bounds={bounds}
                >
                    {startPos && 
                    <Marker
                        name='Start Position'
                        position={startPos.location}
                    />}
                    {endPos && 
                    <Marker
                        name='End Position'
                        position={endPos.location}
                    />}
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