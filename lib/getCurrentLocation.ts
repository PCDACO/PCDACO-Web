import { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export const useGeolocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser.",
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const error = (err: GeolocationPositionError) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: `ERROR(${err.code}): ${err.message}`,
      });
    };

    const options = {
      enableHighAccuracy: true, // Use GPS if available (more accurate, but slower)
      timeout: 5000, // Maximum time to wait for a location
      maximumAge: 0, // Don't use cached location data
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    // Cleanup function (optional, but good practice)
    return () => navigator.geolocation.clearWatch(0); // Assuming watchId is 0
  }, []); // Empty dependency array: run only once on mount

  return location;
};
