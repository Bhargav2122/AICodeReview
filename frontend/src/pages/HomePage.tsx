import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
     navigate('/review')
  }
  return (
    <section
      className="relative flex-1 flex items-center justify-center text-center text-white
      bg-[radial-gradient(circle_at_center,#1f2937_0%,#020617_55%,#000000_100%)]"
    >
      <div>
        <h1 className="text-5xl font-bold">TwinScan</h1>
        <p className="mt-3 text-lg text-gray-300">
          AI-powered code reviews
        </p>

        
        <button
          onClick={handleClick}
          className="mt-8 px-10 py-4 min-w-50
          rounded-xl font-semibold text-lg
          bg-linear-to-r from-indigo-500 to-blue-600
          hover:from-indigo-400 hover:to-blue-500
          transition-all duration-200 shadow-lg"
        >
          Scan Your Code
        </button>
      </div>
    </section>
  );
};

export default HomePage;
