import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import AuthContext from "./contexts/AuthContext"
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"
import Profile from "./views/Profile/Profile"
import Create from "./views/Product/Create"

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="container my-3">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="create" element={<ProtectedRoute>
              <Create />
            </ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App