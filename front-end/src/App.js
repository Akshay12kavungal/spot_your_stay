import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SingleView from './pages/SingleView';
import CheckoutPage from './pages/Checkout';
import GallerySection from './pages/Gallery';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedData from './pages/ProtectedData';
import Logout from './pages/logout';
import Profile from './pages/Profile';
import TrendingSection from './components/Home/TrendingSection';


function App() {
  return (
    <div className="App">
     
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<ProtectedData />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<SingleView />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/gallery" element={<GallerySection />} />
        <Route path="/" element={<TrendingSection />} />

      </Routes>
    </div>
  );
}

export default App;
