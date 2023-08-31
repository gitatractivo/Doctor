import { useCallback, useEffect, useState } from "react";
import SignUp from "../components/SIgnUp";
import SignIn from "../components/SignIn";
import useLocalStorage from "../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, []);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

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
          <h1 className="text-2xl font-bold text-cyan-800 text-center mb-6">Login/SignUp to Continue...</h1>

          {variant === "LOGIN" ? (
            <SignIn isLoading={isLoading} setIsLoading={setIsLoading} />
          ) : (
            <SignUp isLoading={isLoading} setIsLoading={setIsLoading} />
          )}

          <div
            className="
            mt-6 
            flex 
            justify-center 
            gap-2 
            px-2 
            text-sm 
            text-gray-500
          "
          >
            <div>
              {variant === "LOGIN" ? "New here?" : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="cursor-pointer underline">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
