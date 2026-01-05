import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupForm } from "../schemas/authSchema";
import { useAppDispatch } from "../app/hooks";
import { signup } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthForm  from "../components/AuthForm";

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    if (loading) return;
    try {
      setLoading(true);
      await dispatch(signup(data)).unwrap();
      toast.success("Account created successfully!",{
        position:"top-right",
        autoClose:3000
      });
      nav("/signin");
    } catch (err: any) {
      toast.error(err?.message || "register failed.",{
        position:"top-right",
        autoClose:3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-1 flex items-center justify-center
      bg-[radial-gradient(circle_at_center,#1f2937_0%,#020617_55%,#000000_100%)]">
      <div className="w-88 rounded-2xl bg-neutral-900/80 p-8 shadow-xl shadow-black/40 backdrop-blur">
        <h2 className="text-2xl font-semibold text-white text-center">
          Create your account
        </h2>
        <AuthForm<SignupForm>
          title="Signup"
          submitLabel="Register"
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          loading={loading}
          showFullname={true} // only for signup
        />
                <p className="text-white text-center mt-2">Already have an account?{" "}<Link to='/signin' className="text-indigo-400">login</Link></p>
      </div>
    </section>
  );
};
