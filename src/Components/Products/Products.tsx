import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Actions/CartActions";
import { Product as ProductType } from "../../Redux/Types";
import './Products.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  const handleViewDetails = (productId: number) => {
    navigate(`/productdetails/${productId}`);
  };

  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="products-container">
      <h2>Showing Results for All Products</h2>
      <ul className="products-list">
        {products.map((product) => (
          <li
            className="product-list-item"
            key={product.id}
            onClick={() => handleViewDetails(product.id)}
          >
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
              <button
                className="add-to-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                Add To Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
