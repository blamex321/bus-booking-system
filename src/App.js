import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import CoustomFooter from "./components/Footer";
import SeatBooking from "./components/SeatBooking";


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />
        <div className="">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/seat-booking" element={<SeatBooking />} />
          </Routes>
        </div>
      </div>
      <CoustomFooter />
    </Router>
  );
}

export default App;
