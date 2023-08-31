import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// import { Button } from "./Button";
import Input from "./Input";
import useLocalStorage from "../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isLoading, setIsLoading }) => {
  const [available, setAvailable] = useState(null);
  const [token,setToken] = useLocalStorage('token',null)
  const [user,setUser] = useLocalStorage('user',null)
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Call useQuery directly inside the component

  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(data);
    if (data.password !== data.passwordConfirmation) {
      alert("Password do not match")
      return
    }
    const bodyData = {
      name: data.name,
      email: data.email,
      password: data.password,
      specialization: data.Speciality,
    };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/api/auth/register',
    headers: {},
    data: bodyData
  };

  let resp = await axios.request(config)
  // resp = await resp.json()
  if(resp.status===200){
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/auth/login",
     
      data: bodyData,
    };

    resp = await axios.request(config);

    if(resp.status===200){
      setToken(resp.data.token)
      setUser(resp.data.user)
      setTimeout(() => {
        navigate("/");
      }, 10);

    }
  }

    


};

return (
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
      id="Speciality"
      label="Speciality "
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
      id="password"
      label="Password"
      type="password"
    />
    <Input
      disabled={isLoading}
      register={register}
      errors={errors}
      required
      id="passwordConfirmation"
      label="Confirm Password"
      type="password"
    />

    <div>
      <button
        disabled={isLoading}
        className="w-full bg-cyan-500 p-2 rounded-lg text-white tracking-widest font-bold"
        type="submit"
      >
        {"SIGNUP"}
      </button>
    </div>
  </form>
);
};

export default SignUp;
