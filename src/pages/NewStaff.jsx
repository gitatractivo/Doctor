import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";



export default function AuthForm() {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Call useQuery directly inside the component

  const onSubmit = async (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/staff/add",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const resp = await axios.request(config);
    if(resp.status===200){
      alert("New staff added")
      navigate('/')
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cyan-50">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-xl shadow-cyan-100 ">
        <div
          className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
        >
          <h1 className="text-2xl font-bold text-cyan-800 text-center mb-6">
            Add New Staff
          </h1>
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
              id="specialization"
              label="specialization "
              type="text"
            />
            

            <div>
              <button
                disabled={isLoading}
                className="w-full bg-cyan-500 p-2 rounded-lg text-white tracking-widest font-bold"
                type="submit"
              >
                {"Add New Staff"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
