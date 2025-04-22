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

  const [coordinates, setCoordinates] = React.useState<Partial<Coordinates>>(
    {}
  );

  useGetLocationCar(id, (value) => {
    setCoordinates({
      latitude: value.latitude,
      longitude: value.longitude,
      zoom: 12,
    });
  });

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

    if (!coordinates.latitude || !coordinates.longitude) return;

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map.current);

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [id, coordinates]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
