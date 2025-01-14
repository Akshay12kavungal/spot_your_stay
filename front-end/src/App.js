import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SingleView from './pages/SingleView';
import CheckoutPage from './pages/Checkout';
import GallerySection from './pages/Gallery';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={< Home/>} />
      <Route path='/single' element={< SingleView/>} />
      <Route path='/checkout' element={< CheckoutPage/>} />
      <Route path='/gallery' element={< GallerySection/>} />
      </Routes>
    </div>
  );
}

export default App;
