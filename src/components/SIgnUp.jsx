import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { Button } from "./Button";
import Input from "./Input";

const SignUp = ({ isLoading, setIsLoading }) => {
  const [available, setAvailable] = useState(null);

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
