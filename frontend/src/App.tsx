import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import ReviewPage from "./pages/ReviewPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen flex flex-col w-full bg-neutral-950">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </main>
    </BrowserRouter>
  );
}

export default App;
