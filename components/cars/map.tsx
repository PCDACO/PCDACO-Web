"use client"
import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useGetLocationCar } from "@/hooks/plug-ins/use-gps-location"

// We'll set the token more explicitly and check if it exists
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// Only set the token if it exists
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN
} else {
  console.error(
    "Mapbox token is missing! Make sure NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is set in your environment variables.",
  )
}

interface CarLocationResponse {
  latitude: number
  longitude: number
  updatedAt: Date
}

interface MapViewProps {
  id: string
}

export default function MapView({ id }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const [tokenError, setTokenError] = useState(!MAPBOX_TOKEN)

  const [location, setLocation] = useState<CarLocationResponse>({
    latitude: 10.762622,
    longitude: 106.660172,
    updatedAt: new Date(),
  })
  const handleOnReceive = (value: CarLocationResponse) => {
    setLocation(value);
  }
  useGetLocationCar(id, handleOnReceive);
  // Initialize map when component mounts
  useEffect(() => {
    // Don't initialize the map if there's no token or container
    if (!mapContainer.current || !MAPBOX_TOKEN || map.current) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [location.longitude, location.latitude],
        zoom: 12,
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Create marker
      const el = document.createElement("div")
      el.className = "marker"
      el.innerHTML =
        '<div class="marker-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-blue-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>'

      marker.current = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Current location"))
        .addTo(map.current)
    } catch (error) {
      console.error("Error initializing Mapbox:", error)
      setTokenError(true)
    }

    return () => {
      map.current?.remove()
    }
  }, [location.latitude, location.longitude])

  // Update marker position when location changes
  useEffect(() => {
    if (map.current && marker.current) {
      marker.current.setLngLat([location.longitude, location.latitude])
      map.current.flyTo({
        center: [location.longitude, location.latitude],
        essential: true,
      })
    }
  }, [location])
  console.log(location)
  if (tokenError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-50 p-6">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Mapbox Token Missing</h2>
          <p className="text-gray-700 mb-4">
            {" Please make sure you've set the "}
          </p>
          <div className="bg-white p-4 rounded-md shadow text-left text-sm">
            <p className="font-medium mb-2">Add to your .env.local file:</p>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
              NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
            </pre>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
        Last updated: {new Date(location.updatedAt).toLocaleTimeString()}
      </div>
    </div>
  )
}

