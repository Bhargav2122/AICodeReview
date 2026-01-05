
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SigninForm } from "../schemas/authSchema";
import { useAppDispatch } from "../app/hooks";
import { signin } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthForm  from "../components/AuthForm";


const SigninPage = () => {
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({ resolver: zodResolver(signinSchema) });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const onSubmit = async (data: SigninForm) => {
    if (loading) return;
    try {
      setLoading(true);
      await dispatch(signin(data)).unwrap();
      toast.success("logged in successfully!",{
        position:"top-right", 
        autoClose:3000
      });
      nav("/review");
    } catch (err: any) {
      toast.error(err?.message || "login failed.",{
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
        <AuthForm<SigninForm>
          title="Signup"
          submitLabel="Login"
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          loading={loading}
          showFullname={false} // only for signup
        />
        <p className="text-white text-center mt-2">Don't have an account?{" "}<Link to='/signup' className="text-indigo-400">register</Link></p>
      </div>
    </section>
  )
}

export default SigninPage
