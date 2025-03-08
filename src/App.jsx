import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import ProductList from './Pages/ProductList';
import Product from './Pages/Product';
import { useEffect } from 'react';

function App() {
  const navigation = useNavigate();

  useEffect(() => {
    navigation('/products');
  }, []);

  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
