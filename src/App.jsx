import { useContext } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Home from "./views/Home/Home"
import Login from "./views/Login/Login"
import Signup from "./views/Signup/Signup"
import Profile from "./views/Profile/Profile"
import Create from "./views/Product/Create"
import DetailProduct from "./views/Product/DetailProduct"
import DetailAuction from "./views/Product/DetailAuction"
import AllProducts from "./views/Product/AllProducts"
import AddressPurchaseForm from "./views/Purchase/AddressPurchaseForm"
import ThankYou from './views/Purchase/ThankYou';


function App() {
  const location = useLocation();
  const containerClass = location.pathname === "/" ? "" : "container my-3";
  return (
    <div className="App">
      <Navbar />
      <div className={containerClass}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
          <Route path="create" element={<ProtectedRoute>
            <Create />
          </ProtectedRoute>} />
          <Route path="/purchase-address/:purchaseId" element={<ProtectedRoute>
            <AddressPurchaseForm />
          </ProtectedRoute>} />
          <Route path="/thank-you/:purchaseId" element={<ProtectedRoute>
            <ThankYou />
          </ProtectedRoute>} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<DetailProduct type="product" />} />
          <Route path="/auction/:id" element={<DetailAuction type="auction" />} />
        </Routes>

      </div>
    </div>
  )
}

export default App