import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Actions/CartActions";
import { Product as ProductType } from "../../Redux/Types";
import './Products.css';

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => setProductDetail(json));
  }, [id]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="star-rating">
        {Array(fullStars).fill(0).map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star full-star"></i>
        ))}
        {halfStars === 1 && <i className="fas fa-star-half-alt half-star"></i>}
        {Array(emptyStars).fill(0).map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star empty-star"></i>
        ))}
      </div>
    );
  };

  return (
    <div className="product-details-container">
      <img src={productDetail.image} alt={productDetail.title} className="product-details-image" />
      <div className="product-details-info">
        <h1>{productDetail.title}</h1>
        {renderStarRating(productDetail.rating.rate)}
        <p className="product-details-price">${productDetail.price}</p>
        <p className="product-details-description">{productDetail.description}</p>
        <div className="product-details-rating">
          <span>Count: {productDetail.rating.count}</span>
        </div>
        <button
          className="add-to-cart"
          onClick={() => handleAddToCart(productDetail)}>
          Add To Cart
        </button>
        <button className="back-to-shop" onClick={() => navigate(-1)}>Back To Shop</button>
      </div>
    </div>
  );
};

export default ProductDetails;
