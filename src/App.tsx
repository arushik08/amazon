import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Landing Page/Header';
import Footer from './Components/Landing Page/Footer';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import ProductDetails from './Components/Products/ProductDetails';
import CategorySpecific from './Components/Categories/CategorySpecific';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import Checkout from './Components/Checkout/Checkout';
import './App.css';

interface ConditionalLayoutProps {
  children: ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/login', '/signup'];

  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <main>{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Products />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/category/:categoryName" element={<CategorySpecific />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </ConditionalLayout>
      </Router>
    </div>
  );
}

export default App;
