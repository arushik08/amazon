import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Products/Products.css';
import { addToCart } from '../../Redux/Actions/CartActions';
import { Product as ProductType } from "../../Redux/Types";
import { useDispatch } from 'react-redux';

const CategorySpecific: React.FC = () => {
    const [specCategory, setSpecCategory] = useState<any[]>([]);
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("helllooowww");
        
        if (categoryName) {
            fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
                .then(res => res.json())
                .then(json => setSpecCategory(json));
                
        }
    }, [categoryName]);

    const handleViewDetails = (productId: number) => {
        navigate(`/productdetails/${productId}`);
    };

    const handleAddToCart = (product: ProductType) => {
        dispatch(addToCart(product)); 
      };
    

    return (
        <div className="products-container">
            <h2>Showing Results for : {categoryName}</h2>
            <ul className="products-list">
                {specCategory.map((product) => (
                    <li className="product-list-item" key={product.id} onClick={()=>handleViewDetails(product.id)}>
                        <img src={product.image} alt={product.title} className="product-image" />
                        <div className="product-details">
                            <h2 className="product-title">{product.title}</h2>
                            <p className="product-price">${product.price}</p>
                            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySpecific;
