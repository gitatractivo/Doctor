import { useForm } from "react-hook-form";
import Input from "../components/Input";

const NewStaff = ({ isLoading, setIsLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cyan-50">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-xl shadow-cyan-100 bg-white p-8  ">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="currentPassword"
            label="Current Password"
            type="password"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="newPassword"
            label="New Password"
            type="password"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="confirmPassword"
            label="Confirm Password"
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
    </div>
  );
};

export default NewStaff;
