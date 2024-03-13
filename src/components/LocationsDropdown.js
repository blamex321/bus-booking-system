import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { FaBus } from "react-icons/fa";

function LocationsDropdown({
  label,
  selectedLocation,
  onLocationSelect,
  excludeLocations,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedOption(location);
    onLocationSelect(location);
  };

  const filteredOptions = excludeLocations
    ? options.filter((option) => !excludeLocations.includes(option))
    : options;

  const customTrigger = () => (
    <div className="flex items-center">
      <FaBus className="mr-6" size={22} />
      <div className="flex flex-col">
        <span className="text-xs">{label}</span>
        <span>{selectedOption || `Select ${label.toLowerCase()}`}</span>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-grow">
        <div style={{ width: "150px" }}>
          <Dropdown
            dismissOnClick={true}
            renderTrigger={customTrigger}
            placement="bottom"
          >
            {filteredOptions.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => handleLocationSelect(option)}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default LocationsDropdown;

const options = ["Srm University", "Vijayawada", "Guntur", "Tenali"];
