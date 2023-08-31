import { useForm } from "react-hook-form";
import Input from "./Input";
import useLocalStorage from "../utils/useLocalStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ isLoading, setIsLoading }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/auth/login",

      data: data,
    };

    const resp = await axios.request(config);

    if (resp.status === 200) {
      setToken(resp.data.token);
      setUser(resp.data.user);
      setTimeout(() => {
        navigate("/");
      }, 10);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        id="email"
        label="Email"
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
      <div
        className="px-2 
            text-sm 
            text-gray-500 text-center"
            onClick={()=>navigate('/reset')}
      >
        Forgot password? 
      </div>
      <div>
        <button
          disabled={isLoading}
          className="w-full bg-cyan-500 p-2 rounded-lg text-white tracking-widest font-bold"
          type="submit"
        >
          {"LOGIN"}
        </button>
      </div>
    </form>
  );
};

export default SignIn;
