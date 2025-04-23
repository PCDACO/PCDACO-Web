"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGetLocationCar } from "@/hooks/plug-ins/use-gps-location";

interface MapViewProps {
  id: string;
  coordinates?: Coordinates;
}

interface Coordinates {
  latitude: number;
  longitude: number;
  zoom: number;
}

// We'll set the token more explicitly and check if it exists
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Only set the token if it exists
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
} else {
  console.error(
    "Mapbox token is missing! Make sure NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is set in your environment variables."
  );
}

export default function MapView({ id }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const [coordinates, setCoordinates] = React.useState<Partial<Coordinates>>(
    {}
  );

  // Initialize map
  useEffect(() => {
    const currentCoordinates = {
      latitude: 10.762622,
      longitude: 106.660172,
      zoom: 12,
    };

    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [currentCoordinates.longitude, currentCoordinates.latitude],
      zoom: currentCoordinates.zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [id]);

  // Update marker when coordinates change
  useEffect(() => {
    if (!map.current || !coordinates.latitude || !coordinates.longitude) return;

    // Remove existing marker if it exists
    if (marker.current) {
      marker.current.remove();
    }

    // Add new marker with a custom color
    marker.current = new mapboxgl.Marker({
      color: "#FF0000",
      draggable: false,
    })
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map.current);

    // Add a popup to show coordinates
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div>
          <strong>Location:</strong><br>
          Lat: ${coordinates.latitude.toFixed(6)}<br>
          Lng: ${coordinates.longitude.toFixed(6)}
        </div>
      `);

    marker.current.setPopup(popup);

    // Only center map on first load
    if (!marker.current) {
      map.current.flyTo({
        center: [coordinates.longitude, coordinates.latitude],
        essential: true,
        duration: 2000,
        zoom: 15,
      });
    }
  }, [coordinates]);

  // Use SignalR to get car location
  useGetLocationCar(id, (location) => {
    setCoordinates({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  });

  return <div ref={mapContainer} className="w-full h-full" />;
}
