import { BrowserRouter, Routes , Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"


function App() {
 

  return (
    
      <BrowserRouter>
        <NavBar />
        <main  className="min-h-screen min-w-full fixed">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
        </main>
      </BrowserRouter>
    
   
  )
}

export default App
