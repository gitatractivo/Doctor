import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";

const NewStaff = ({ isLoading, setIsLoading }) => {
  const [first, setFirst] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let config = {
      method: "post",
      timeout: 6000,

      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/auth/forget-password?email=${data.email}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const resp = await axios.request(config);
      console.log(resp);
      if (resp.status === 200) {
        setFirst(true);
      }
    } catch (error) {
      alert(error)
    }

    
  };
  const onReset = async (data) => {
    let config = {
      method: "post",
      timeout:10000,
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/auth/set-new-password?resetPasswordToken=${data.token}&newPassword=${data.password}'`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    

    const resp = await axios.request(config);
    console.log(resp);
    if (resp.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cyan-50">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-xl shadow-cyan-100 bg-white p-8  ">
        {first ? (
          <div>
            <form className="space-y-6" onSubmit={handleSubmit(onReset)}>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="token"
                label="Token"
                type="text"
              />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="password"
                label="New Password"
                type="password"
              />

              <div>
                <button
                  disabled={isLoading}
                  className="w-full bg-cyan-500 p-2 rounded-lg text-white tracking-widest font-bold"
                  type="submit"
                >
                  {"Reset Password"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email"
              type="email"
            />

            <div>
              <button
                disabled={isLoading}
                className="w-full bg-cyan-500 p-2 rounded-lg text-white tracking-widest font-bold"
                type="submit"
              >
                {"Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewStaff;
