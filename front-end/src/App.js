import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SingleView from './pages/SingleView';
import CheckoutPage from './pages/Checkout';
import GallerySection from './pages/Gallery';
import Register from './pages/register';
import ProtectedData from './pages/ProtectedData';
import Logout from './pages/logout';
import TrendingSection from './components/Home/TrendingSection';
import ContactForm from './components/Home/ContactForm';
import FAQList from './components/Home/FAQList';
import Bookings from './components/Home/Bookings';
import ListProperty from './components/Home/ListProperty';
import Notification from './pages/Notification';


function App() {
  return (
    <div className="App">
     
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<ProtectedData />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<SingleView />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/gallery" element={<GallerySection />} />
        <Route path="/trendingsection" element={<TrendingSection />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/faq" element={<FAQList />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/listproperty" element={<ListProperty />} />
        <Route path="/notification" element={<Notification />} />

      </Routes>
    </div>
  );
}

export default App;
