import React from "react";
import { useLocation } from "react-router-dom";

const SeatBooking = () => {
  const location = useLocation();
  const busBookings = location.state.busBookings;
  console.log(busBookings);
  return <div>Seat Booking</div>;
};

export default SeatBooking;
