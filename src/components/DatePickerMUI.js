
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function DatePickerMUI({ onDateChange}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date); // Call the parent component's handler
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        id="date"
        label="Select Date"
        type="date"
        value={selectedDate}
        variant="standard"
        onChange={(e) => handleDateChange(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </LocalizationProvider>
  );
}
