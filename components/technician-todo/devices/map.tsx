"use client"
// components/Map.jsx

import React from 'react'

import Map from 'react-map-gl/mapbox';
import "mapbox-gl/dist/mapbox-gl.css"

const LocationAggregatorMap = () => (
    <div>
        <Map
            // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
            mapboxAccessToken="<Mapbox access token>"
            initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    </div>
)

export default LocationAggregatorMap