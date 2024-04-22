import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import QRCode from "react-qr-code";

const PaymentSuccess = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["session_id"]);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/success?session_id=${cookies.session_id}`
        );
        setData(response.data);
        // removeCookie("session_id");
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    if (cookies.session_id !== undefined) {
      fetchPaymentStatus();
    }
  }, [cookies.session_id, removeCookie]);
  

  return (
    <>
      {data ? (
        <div className="m-4">
          <h2>Payment Status</h2>
          <p>Booking ID: {data.bookingId}</p>
          <p>From: {data.from_station}</p>
          <p>To: {data.to_station}</p>
          <p>Date: {data.date}</p>
          <p>Seats: {data.seats}</p>
          <p>Name: {data.user_name}</p>
          <QRCode
            title="Ticket"
            value={JSON.stringify(data)}
            bgColor="#FFFFFF"
            fgColor="#000000"
            size={300}
          />
        </div>
      ) : (
        <div>
          <h2>
            Booking details not found.
            <br /> please contact support team
          </h2>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
