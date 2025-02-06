import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = ({ pickup, destination, showDirections }) => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (showDirections && pickup && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: pickup,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    }
  }, [pickup, destination, showDirections]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        {currentPosition && <Marker position={currentPosition} />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
