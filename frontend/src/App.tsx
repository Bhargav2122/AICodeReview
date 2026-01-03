import { BrowserRouter, Routes , Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import HomePage from "./pages/HomePage"
import { ReviewPage } from "./pages/ReviewPage"
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"



function App() {
 

  return (
    
      <BrowserRouter>
      <NavBar />
        <main  className="min-h-screen min-w-full fixed">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/review" element={ <ProtectedRoute>{<ReviewPage />}</ProtectedRoute> } />
        </Routes>
        </main>
      </BrowserRouter>
    
   
  )
}

export default App
