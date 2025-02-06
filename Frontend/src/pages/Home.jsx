import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import Navbar from "../components/Navbar";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    // console.log("ride")
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      setDestinationSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const clearSuggestions = () => {
    setPickupSuggestions([]);
    setDestinationSuggestions([]);
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  const handleVehicleSelect = (type) => {
    setVehicleType(type);
    setVehiclePanel(false);
    setConfirmRidePanel(true);
  };

  return (
    <div className="h-screen relative">
      <Navbar />
      <div className="flex justify-center p-10">
        <div className="w-1/2">
          {!vehiclePanel && !confirmRidePanel && !vehicleFound && !waitingForDriver ? (
            // Find Trip Section
            <div className="mx-8 p-6 relative border-2 border-solid border-gray-100 rounded-lg bg-white">
              <h5
                ref={panelCloseRef}
                onClick={() => {
                  setPanelOpen(false);
                }}
                className="absolute opacity-0 right-6 top-6 text-2xl"
              >
                <i className="ri-arrow-down-wide-line"></i>
              </h5>
              <h4 className="text-2xl font-semibold">Find a trip</h4>
              <form
                className="relative py-3"
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("pickup");
                  }}
                  value={pickup}
                  onChange={handlePickupChange}
                  className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                  type="text"
                  placeholder="Add a pick-up location"
                />
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("destination");
                  }}
                  value={destination}
                  onChange={handleDestinationChange}
                  className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
                  type="text"
                  placeholder="Enter your destination"
                />
              </form>
              <button
                onClick={findTrip}
                className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
              >
                Find Trip
              </button>
            </div>
          ) : vehiclePanel ? (
            // Vehicle Panel Section
            <div className="mx-8 p-6 relative border-2 border-solid border-gray-100 rounded-lg bg-white">
              <VehiclePanel
                selectVehicle={handleVehicleSelect}
                fare={fare}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehiclePanel={setVehiclePanel}
              />
            </div>
          ) : confirmRidePanel ? (
            // Confirm Ride Section
            <div className="mx-8 p-6 relative border-2 border-solid border-gray-100 rounded-lg bg-white">
              <ConfirmRide
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehicleFound={setVehicleFound}
              />
            </div>
          ) : vehicleFound ? (
            // Looking for Driver Section
            <div className="mx-8 p-6 relative border-2 border-solid border-gray-100 rounded-lg bg-white">
              <LookingForDriver
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setVehicleFound={setVehicleFound}
              />
            </div>
          ) : (
            // Waiting for Driver Section
            <div className="mx-8 p-6 relative border-2 border-solid border-gray-100 rounded-lg bg-white">
              <WaitingForDriver
                ride={ride}
                setVehicleFound={setVehicleFound}
                setWaitingForDriver={setWaitingForDriver}
                waitingForDriver={waitingForDriver}
              />
            </div>
          )}

          {/* Location search panel */}
          <div ref={panelRef} className="bg-white h-0">
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
              clearSuggestions={clearSuggestions}
            />
          </div>
        </div>
        <div className="h-screen w-screen">
          <LiveTracking 
            pickup={pickup}
            destination={destination}
            showDirections={vehiclePanel || confirmRidePanel || vehicleFound || waitingForDriver}
          />
        </div>

        {/* <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"> */}
        {/* <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          /> */}
        {/* </div> */}
        {/* <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"> */}
        {/* <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
          /> */}
        {/* </div> */}
        {/* <div ref={waitingForDriverRef} className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"> */}
        {/* <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
          /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
