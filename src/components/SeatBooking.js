import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const SeatBooking = () => {
  const location = useLocation();
  const busBooking = location.state.busBookings[0]; // Assuming there's only one booking for simplicity
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingId, setBookingId] = useState(uuidv4()); // Generate a unique booking ID

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        // Deselect the seat if already selected
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        // Toggle seat selection
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/create-checkout-session",
        {
          seats: selectedSeats,
          bookingId: bookingId, // Pass booking ID
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session_id = response.data.id;
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-xl font-bold mb-2">Bus Booking</h2>
      <p className="mb-4">
        Route: {busBooking.from} to {busBooking.to}
      </p>
      <p className="mb-4">
        Date: {new Date(busBooking.date).toLocaleDateString()}
      </p>
      <form onSubmit={handleBookingSubmit}>
        <h3 className="text-lg font-semibold mb-2">Select Seats</h3>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(30).keys()].map((seatNumber) => (
            <label key={seatNumber} className="flex items-center">
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedSeats.includes(seatNumber + 1)}
                onChange={() => handleSeatSelection(seatNumber + 1)}
              />
              <div
                className={`w-10 h-10 border rounded-md flex items-center justify-center cursor-pointer ${
                  selectedSeats.includes(seatNumber + 1)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {seatNumber + 1}
              </div>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Book Seats
        </button>
      </form>
    </div>
  );
};

export default SeatBooking;
