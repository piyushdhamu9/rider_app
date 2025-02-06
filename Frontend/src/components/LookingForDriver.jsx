import React from "react";
import PropTypes from 'prop-types';

const LookingForDriver = ({
  setVehicleFound,
  setConfirmRidePanel,
  pickup,
  destination,
  fare,
  vehicleType
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Looking for a Driver</h3>
        <button 
          onClick={() => {
            if (setVehicleFound) setVehicleFound(false);
            if (setConfirmRidePanel) setConfirmRidePanel(true);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{fare[vehicleType]}{" "}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LookingForDriver.propTypes = {
  setVehicleFound: PropTypes.func,
  setConfirmRidePanel: PropTypes.func,
  pickup: PropTypes.string,
  destination: PropTypes.string,
  fare: PropTypes.object,
  vehicleType: PropTypes.string
};

export default LookingForDriver;
