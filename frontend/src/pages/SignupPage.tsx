import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { signup } from "../features/auth/authSlice";

const SignupPage = () => {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!form.fullname || !form.email || !form.password) return;
    try {
      await dispatch(signup(form));
      navigate("/signin");
    } catch (e) {
      console.log("singup error", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center max-w-full">
      <div className="border-2 p-15 rounded-2xl md:w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h2 className="text-center text-2xl mb-3">Create Your Account</h2>
          <label className="font-gsans">Enter your fullname</label>
          <input
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            className="border outline-none px-1.5 h-8"
          />
          <label className="font-gsans">Enter your Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border outline-none px-1.5 h-8"
          />
          <label className="font-gsans">Enter your password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border outline-none px-1.5 h-8"
          />
          <button
            type="submit"
            className="bg-black cursor-pointer mt-2.5 mb-2.5 text-white px-7 py-2 rounded-3xl hover:bg-white hover:text-black hover:outline-1 font-poppins"
          >
            register
          </button>
        </form>
        <p className="text-center font-poppins">
          Already have an account?{" "} 
          <Link to="/signin" className="hover:underline">
             login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
