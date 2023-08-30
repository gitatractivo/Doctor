import { Button, Modal } from "@mui/base";
import { Backdrop, Box } from "@mui/material";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props = {};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const PatientDetails = (props: Props) => {
  const [first, setfirst] = useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  return (
    <div>
      <div
        className="w-full h-auto bg-white p-4 rounded-md flex flex-col md:flex-row shadow-md justify-between"
        onClick={() => setfirst(!first)}
      >
        <h1>Patient name</h1>
        <h1>Age</h1>
        <h1>Sex</h1>
        <h1>Medical History</h1>
      </div>

      <Modal
        open={first}
        onClose={() => setfirst(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Box
          sx={{
            ...style,
            outline: "none",
            borderRadius: "5px",
            width: "80vw",
            maxHeight:"80vh",
            overflow:"scroll"
          }}
          className="ease-in-out flex flex-col justify-center "
        >
          <h2 id="parent-modal-title" className="text-2xl  mt-3 mb-2 mx-auto">
            Patient Details
          </h2>
          <h1 className="text-3xl font-bold mb-1">Patient Name</h1>
          <div className="flex justify-start gap-4">
            <h3 className="text-2xl ">Age</h3>
            <h3 className="text-2xl ">Sex</h3>
            <h3 className="text-2xl ">Contact</h3>
          </div>

          <p className="my-4 text-xl text-justify text-slate-800">
            Medical history 
          </p>

          <h3 className="text-lg my-3">Date and Time</h3>

          <div className="flex flex-col md:flex-row justify-start gap-5 md:gap-12 mt-4">
            <button className=" px-3 h-fit py-2.5 my-auto bg-green-400 rounded-lg text-white font-bold tracking-widest uppercase ">
              Completed
            </button>
            <button className=" px-3 h-fit py-2.5 my-auto bg-red-600 rounded-lg text-white font-bold tracking-widest uppercase ">
              Cancel
            </button>

            <DateTimePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />

            <button className=" px-3 h-fit py-2.5 my-auto bg-blue-600 rounded-lg text-white font-bold tracking-widest uppercase ">
              Re-Schedule
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PatientDetails;
