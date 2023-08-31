import { Modal } from "@mui/base";
import { Backdrop, Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import axios from "axios";

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -35%)",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const PatientDetails = ({details}) => {
  const [first, setfirst] = useState(false);
  const [value, setValue] = useState(
    dayjs(new Date())
  );
  const [token, setToken] = useLocalStorage("token", null);
  

    const onComplete=async()=>{
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/patients/${details.id}?isVisitCompleted=true`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          isVisitCompleted: true,
        },
      };

      const resp = await axios.request(config);
      console.log(resp)
      if(resp.status===200){
        window.location.reload();
      }
    }
    const onRes = async () => {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/patients/${details.id}?isVisitCompleted=false`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          visitDate: value.format("YYYY-MM-DD"),
        },
      };

      const resp = await axios.request(config);
      if (resp.status === 200) {
        window.location.reload();
      }
    };

  return (
    <div>
      <div
        className="w-full h-auto bg-white p-4 rounded-md flex flex-col md:flex-row shadow-md justify-between"
        onClick={() => setfirst(!first)}
      >
        <h1>{details.name}</h1>
        <h1>{details.age}</h1>
        <h1>{details.sex}</h1>
        <h1>{details.medicalHistory}</h1>
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
            // height:"80rem",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
          className="ease-in-out overflow-y-scroll scrollbar-track-slate-100   snap-y scroll-smooth  h-fit"
        >
          <div className="  flex flex-col justify-center ">
            <h2
              id="snap-start parent-modal-title scroll-mt-10"
              className="text-2xl  mt-3 mb-2 mx-auto"
            >
              Patient Details
            </h2>
            <h1 className="text-3xl font-bold mb-1">{details.name}</h1>
            <div className="flex justify-start gap-4">
              <h3 className="text-2xl ">{details.age}</h3>
              <h3 className="text-2xl ">{details.sex}</h3>
            </div>

            <p className="my-4 text-xl text-justify text-slate-800">
              {details.medicalHistory}
            </p>

            <h3 className="text-lg my-3">{details.visitDate}</h3>

            <div className="flex flex-col md:flex-row justify-start gap-5 md:gap-12 mt-4">
              <button
                className=" px-3 h-fit py-2.5 my-auto bg-green-400 rounded-lg text-white font-bold tracking-widest uppercase "
                onClick={onComplete}
              >
                Completed
              </button>
              {/* <button className=" px-3 h-fit py-2.5 my-auto bg-red-600 rounded-lg text-white font-bold tracking-widest uppercase ">
                Cancel
              </button> */}

              <DateTimePicker
                label="Set Date And Time"
                value={value}
                views={["year", "month", "day"]}
                onChange={(newValue) => setValue(newValue)}
                viewRenderers={{
                  hours: null,
                  minutes: null,
                  seconds: null,
                }}
              />

              <button
                className=" px-3 h-fit py-2.5 my-auto bg-blue-600 rounded-lg text-white font-bold tracking-widest uppercase "
                onClick={onRes}
              >
                Re-Schedule
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PatientDetails;
