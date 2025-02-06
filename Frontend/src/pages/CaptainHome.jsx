import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            lat: position.coords.latitude,  // Changed from ltd to lat
            lng: position.coords.longitude
          };
          
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: location
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Section */}
        <div className="w-1/3 p-6 bg-white shadow-lg">
          <CaptainDetails />
        </div>

        {/* Right Section - Map */}
        <div className="w-2/3 h-full">
          <LiveTracking 
            isCaptain={true}
            currentLocation={{
              lat: parseFloat(captain?.location?.lat) || 0,
              lng: parseFloat(captain?.location?.lng) || 0
            }}
          />
        </div>

        {/* Ride Popup Panel */}
        <div
          ref={ridePopupPanelRef}
          className="fixed w-1/3 z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 left-0"
        >
          <RidePopUp
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide}
          />
        </div>

        {/* Confirm Ride Popup Panel */}
        <div
          ref={confirmRidePopupPanelRef}
          className="fixed w-1/3 h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 left-0"
        >
          <ConfirmRidePopUp
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
