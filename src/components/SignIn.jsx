import { useForm } from "react-hook-form";
import Input from "./Input";

const SignIn = ({
  isLoading,
  setIsLoading,
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data)
    
    

    

    
      
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
