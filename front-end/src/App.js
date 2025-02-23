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
import ContactForm from './components/Home/ContactForm';
import FAQList from './components/Home/FAQList';
import Bookings from './components/Home/Bookings';


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
        <Route path="/trendingsection" element={<TrendingSection />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/faq" element={<FAQList />} />
        <Route path="/bookings" element={<Bookings />} />

      </Routes>
    </div>
  );
}

export default App;
