import { Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Patient = () => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="w-5/6 h-screen flex flex-col mx-auto mt-5">
      <h1 className="text-pink-700 text-3xl md:text-4xl my-2">
        {" "}
        Appointments{" "}
      </h1>

      <div className="border-b">
        <div className="w-full flex shadow-xl rounded-md">
          <button
            onClick={() => {
              handleChange(0);
              //   setEffect(true);
            }}
            className={` ${
              value === 0
                ? "border-blue-400 text-blue-600 bg-slate-100"
                : "border-transparent text-gray-500 bg-white hover:text-blue-700 hover:border-blue-500 hover:bg-slate-50"
            }  focus:outline-none py-2 px-4 font-medium border-b-4 transition duration-150 ease-in-out w-full z-20  `}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleChange(1)}
            className={`${
              value === 1
                ? "border-blue-400 text-blue-600 bg-slate-100"
                : "border-transparent text-gray-500 bg-white hover:text-blue-700 hover:border-blue-500 hover:bg-slate-50"
            } focus:outline-none py-2 px-4 font-medium border-b-4 transition duration-150 ease-in-out w-full z-20  `}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Patient;
