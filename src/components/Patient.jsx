import { Modal } from "@mui/base";
import { Backdrop } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import PatientDetails from "./PatientDetails";
import Input from "./Input";
import { useForm ,Controller} from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -35%)",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const arr = [1, 2, 3, 4, 5];

const Patient = ({addAppointment,setAddAppointment}) => {
  const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      defaultValues: {
        date: dayjs(new Date()),
      },
    });

    // Call useQuery directly inside the component

    const onSubmit = async (data) => {
      console.log(data)
    };

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-5/6  h-screen flex flex-col mx-auto mt-5">
      <h1 className="text-blue-700 text-3xl md:text-4xl my-2">
        {" "}
        Appointments{" "}
      </h1>

      <div className="my-4">
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
            }  focus:outline-none py-2 px-4 font-medium border-b-4 transition duration-150 ease-in-out w-full z-2  `}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleChange(1)}
            className={`${
              value === 1
                ? "border-blue-400 text-blue-600 bg-slate-100"
                : "border-transparent text-gray-500 bg-white hover:text-blue-700 hover:border-blue-500 hover:bg-slate-50"
            } focus:outline-none py-2 px-4 font-medium border-b-4 transition duration-150 ease-in-out w-full z-2  `}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-6">
        {arr.map((_) => (
          <PatientDetails />
        ))}
      </div>

      <Modal
        open={addAppointment}
        onClose={() => setAddAppointment(false)}
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
            maxHeight: "80vh",
            overflowY: "scroll",
            maxWidth: "800px",
          }}
          className="ease-in-out overflow-y-scroll scrollbar-track-slate-100  snap-y scroll-smooth  h-fit"
        >
          <h2
            id="parent-modal-title"
            className="text-2xl  mt-3 mb-2 mx-auto text-center"
          >
            Add Appointment
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Full Name"
              type="text"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email "
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="history"
              label="history "
              type="text"
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Set Date And Time"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  // renderInput={(params) => <TextField {...params} />}
                />
              )}
            />

            <div>
              <button
                disabled={isLoading}
                className="w-full bg-cyan-500 p-2 rounded-lg text-white tracking-widest font-bold"
                type="submit"
              >
                {"Add Appointment"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Patient;
