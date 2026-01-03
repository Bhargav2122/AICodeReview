import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="min-h-screen w-full flex flex-col justify-center items-center gap-2">
        <h1 className="font-poppins text-4xl font-medium">TwinScan</h1>
        <p className="font-gsans text-xl">Your Personal AI Code Review</p>
        <Link
          to="/review"
          className="bg-black text-white px-7 py-2 rounded-3xl hover:bg-white hover:text-black hover:outline-1 font-poppins"
        >
          Get Started
        </Link>
      </section>
    </>
  );
};

export default HomePage;
