import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import QRCode from "react-qr-code";

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const PaymentSuccess = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["session_id"]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number input
  const { user } = useAuth0();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/success?session_id=${cookies.session_id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setLoading(false);
      }
    };

    if (cookies.session_id !== undefined) {
      fetchPaymentStatus();
    }
  }, [cookies.session_id, removeCookie]);

  const svgRef = useRef();

  const downloadSVG = useCallback(() => {
    const svg = svgRef.current.innerHTML;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "myimage.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    image.src = "data:image/svg+xml," + encodeURIComponent(svg);
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:5001/send-message", {
        to: phoneNumber,
        message:
          "Your ticket has been booked successfully!.\n Your booking ID is " +
          data.bookingId +
          ".\n Please show this message at the counter to collect your ticket.",
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const sendEmail = async () => {};

  return (
    <>
      {loading ? (
        <div className="m-4">
          <h2>Loading...</h2>
        </div>
      ) : data ? (
        <div className="m-4">
          <h2>Payment Status</h2>
          <p>Booking ID: {data.bookingId}</p>
          <p>From: {data.from_station}</p>
          <p>To: {data.to_station}</p>
          <p>Date: {data.date}</p>
          <p>Seats: {data.seats}</p>
          <p>Name: {data.user_name}</p>
          <div ref={svgRef} className="my-2">
            <QRCode
              title="Ticket"
              value={JSON.stringify(data)}
              bgColor="#FFFFFF"
              fgColor="#000000"
              size={300}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={downloadSVG}
            >
              Download QR Code
            </button>
          </div>
          <div className="my-2">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="border border-gray-400 rounded mr-2 px-2 py-1"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={sendMessage}
            >
              Send Message
            </button>
          </div>
          {/* email id to be added in the future */}
          {/* <div className="my-2">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="border border-gray-400 rounded mr-2 px-2 py-1"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={sendEmail}
            >
              Send Email
            </button>
          </div> */}
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
