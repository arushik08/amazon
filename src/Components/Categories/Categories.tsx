import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => setItems(json));
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/category/${categoryName}`);
    };

    return (
        <div className="category-list">
            {items.map((item, index) => {
                const formattedItem = item.charAt(0).toUpperCase() + item.slice(1);
                return (
                    <div className="category-item" key={index} onClick={() => handleCategoryClick(item)}>
                        <ul>
                            <div>
                                <li>{formattedItem}</li>
                                <i className="fa-solid fa-angle-right" onClick={() => handleCategoryClick(item)} />
                            </div>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default Categories;
