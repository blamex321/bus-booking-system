import React, { useState } from "react";
import LocationsDropdown from "./LocationsDropdown";
import { Datepicker } from "flowbite-react";

const HomePage = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const handleFromLocationSelect = (location) => {
    setFromLocation(location);
  };

  const handleToLocationSelect = (location) => {
    setToLocation(location);
  };

  const DatePickerTheme = {
    base: "relative border-0",
  };

  return (
    <div className="relative px-3 mt-3">
      <div className="z-0">
        <img
          src="https://cache.careers360.mobi/media/colleges/social-media/media-gallery/1771/2023/5/12/Campus%20Over%20View%20of%20SRM%20University%20AP%20Amaravati_Campus-View.png"
          alt="Bus"
          className="w-full h-96 object-cover object-center rounded-lg shadow-md"
        />
      </div>
      <div className="absolute left-0 z-10 w-full px-[20%]">
        <div className="bg-slate-200 rounded-2xl p-3 -mt-7 border-4 border-amber-200">
          <div className="flex justify-between items-center">
            <div className="flex-grow flex justify-center items-center w-[20%]">
              <LocationsDropdown
                label="From"
                selectedLocation={fromLocation}
                onLocationSelect={handleFromLocationSelect}
                excludeLocations={[toLocation]}
              />
            </div>
            <div className="h-6 w-0.5 bg-gray-400 mx-2"></div>
            <div className="flex-grow flex justify-center items-center w-[20%]">
              <LocationsDropdown
                label="To"
                selectedLocation={toLocation}
                onLocationSelect={handleToLocationSelect}
                excludeLocations={[fromLocation]}
              />
            </div>
            <div className="h-6 w-0.5 bg-gray-400 mx-2"></div>
            <div className="flex-grow flex justify-center items-center w-[20%]">
              <Datepicker theme={DatePickerTheme} />
            </div>
            <div className="h-6 w-0.5 bg-gray-400 mx-2"></div>
            <div className="flex-grow flex justify-center items-center w-[20%]">
              Search Button
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
