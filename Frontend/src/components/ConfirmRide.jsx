import React from "react";

const ConfirmRide = (props) => {
  const handleConfirm = () => {
    props.setConfirmRidePanel(false); // Hide confirm panel
    props.setVehicleFound(true); // Show looking for driver
    props.createRide(); // Create the ride
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Confirm your Ride</h3>
        <button 
          onClick={() => {
            props.setConfirmRidePanel(false);
            props.setVehiclePanel(true);
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
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
