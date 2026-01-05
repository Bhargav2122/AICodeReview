import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen flex flex-col w-full bg-neutral-950">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
