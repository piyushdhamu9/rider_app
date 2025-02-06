import React from "react";
import { Link, Navigate } from "react-router-dom"; // Add Navigate import
import LiveTracking from "../components/LiveTracking";

const Start = () => {
  // Add token check at the start of component
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="w-full flex flex-col scroll-smooth ">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      {/* Navbar */}
      <nav className="w-full bg-black text-white p-2 flex justify-between items-center">
        <div className="text-3xl mx-11">Rider</div>
        <div className=" text-sm space-x-4 mx-6">
          <button className="p-1">EN</button>
          <button className="p-1">Help</button>
          <Link
            to="/login"
            className="px-3 py-2 text-white hover:bg-white hover:text-black hover:rounded-full"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-3 py-2 text-white hover:bg-white hover:text-black hover:rounded-full"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/2 px-28 flex flex-col justify-center">
          <h1 className="text-4xl font-medium mb-6">Go anywhere with Rider</h1>
          <div className="flex space-x-4 mb-4">
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/glyph-neue/64/car.png"
              alt="car"
              className=" p-1 bg-gray-200 rounded"
            />
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/ios-filled/50/auto-rickshaw.png"
              alt="auto-rickshaw"
              className=" p-1 bg-gray-200 rounded"
            />
            <img
              width="36"
              height="64"
              src="https://img.icons8.com/sf-black/64/motorcycle.png"
              alt="motorcycle"
              className=" p-1 bg-gray-200 rounded"
            />
          </div>
          <Link
            to="/login"
            className="w-3/4 p-3 bg-black text-white rounded flex items-center justify-center"
          >
            Continue
          </Link>
        </div>

        {/* Right Section - Map */}
        <div className="w-1/2 p-10 mb-3 mr-20">
          <LiveTracking />
        </div>
      </div>

      <div className="px-28 my-16">
        <h2 className="text-3xl font-bold">Suggestions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-sans">
          <div className=" bg-gray-100 rounded-lg shadow-md flex">
            <div className="px-4 mt-3">
              <h3 className="font-semibold ">Ride</h3>
              <p className="text-gray-600 text-xs">
                Go anywhere with Rider. Request a ride, hop in, and go.
              </p>
            </div>
            <div>
              <img
                className="w-44"
                src="https://cn-geo1.uber.com/static/mobile-content/launch-experience/ride.png"
                alt=""
              />
            </div>
          </div>

          <div className=" bg-gray-100 rounded-lg shadow-md flex">
            <div className="px-4 mt-3">
              <h3 className="font-semibold">Reserve</h3>
              <p className="text-gray-600 text-xs">
                Reserve your ride in advance so you can relax on the day of your
                trip.
              </p>
            </div>
            <div>
              <img
                className="w-44"
                src="https://cn-geo1.uber.com/static/mobile-content/uber_reserve/reserve_clock.png"
                alt=""
              />
            </div>
          </div>
          <div className=" bg-gray-100 rounded-lg shadow-md flex ">
            <div className="px-4 mt-3">
              <h3 className="font-semibold">Courier</h3>
              <p className="text-gray-600 text-xs">
                Rider makes same-day item delivery easier than ever.
              </p>
            </div>
            <div>
              <img
                className="w-44"
                src="https://cn-geo1.uber.com/static/mobile-content/Courier.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-28 my-16 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-10">
            <h2 className="text-5xl font-bold">
              Log in to see your recent activity
            </h2>
            <p className="text-gray-600 my-2">
              View past trips, tailored suggestions, support resources, and
              more.
            </p>
            <div className="my-5">
              <Link
                to="/login"
                className="px-6 py-3 bg-black text-white rounded-md"
              >
                Log in to your account
              </Link>
            </div>
            <p className="mt-2 text-gray-500">
              Don’t have an Rider account?{" "}
              <a href="/signup" className="text-blue-600">
                Sign up
              </a>
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
            className="rounded-md shadow-md "
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_384,w_576/v1730197725/assets/0f/48c7ba-da13-4fdc-b54c-42878042f513/original/Airport-Fall.png"
              alt="Rider Activity"
            />
          </div>
        </div>
      </div>

      <div className="px-28 my-16 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png"
              alt="Rider Activity"
              className="rounded-lg shadow-md w-[576px] h-[384px] object-cover"
            />
          </div>
          <div className="md:w-1/2 pl-10">
            <h2 className="text-5xl font-bold">
            Drive when you want, make what you need
            </h2>
            <p className="text-gray-600 my-2">
            Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Rider.
            </p>
            <div className="my-5">
              <Link
                to="/login"
                className="px-6 py-3 bg-black text-white rounded-md"
              >
               Get Started
              </Link>
            </div>
            <p className="mt-2 text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="px-28 my-16 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-10">
            <h2 className="text-5xl font-bold">
            The Rider you know, reimagined for business
            </h2>
            <p className="text-gray-600 my-2">
            Rider for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.
            </p>
            <div className="my-5">
              <Link
                to="/login"
                className="px-6 py-3 bg-black text-white rounded-md"
              >
                Get Started
              </Link>
            </div>
            <p className="mt-2 text-gray-500">
              Don’t have an Rider account?{" "}
              <a href="/signup" className="text-blue-600">
                Sign up
              </a>
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1684887108/assets/76/baf1ea-385a-408c-846b-59211086196c/original/u4b-square.png"
              alt="Rider Activity"
              className="rounded-lg shadow-md w-[576px] h-[384px] object-cover"
            />
          </div>
        </div>
      </div>

      <footer className="bg-black text-white px-28 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Rider</h3>
            <p className="text-gray-400 text-sm">
              Making transportation reliable and affordable for everyone.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Ride</a></li>
              <li><a href="#" className="hover:text-white">Drive</a></li>
              <li><a href="#" className="hover:text-white">Deliver</a></li>
              <li><a href="#" className="hover:text-white">Business</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Safety</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Rider. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Start;
