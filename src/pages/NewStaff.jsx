import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";



export default function AuthForm() {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Call useQuery directly inside the component

  const onSubmit = async (data) => {
    console.log(data)
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
              id="role"
              label="Role "
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
                {"Add New Staff"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
