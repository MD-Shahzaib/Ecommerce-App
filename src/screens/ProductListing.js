import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductListing() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const productData = await response.json();
            setProducts(productData.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-12 mx-auto">
                    {loading ? (<p>Loading products...</p>) : (
                        <div className="flex flex-wrap -m-4 justify-center">
                            {products.map((product) => (
                                <div key={product._id} className="p-4 md:w-1/3">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                        <Link to={product._id}><img className="lg:h-48 md:h-36 w-full object-cover object-center" src={product.image} alt={product.name} /></Link>
                                        <div className="p-4">
                                            <div className="flex justify-between items-center gap-2">
                                                <h2 className="tracking-widest text-xs font-medium text-gray-400">{product.category}</h2>
                                                <span className="text-gray-400 items-center leading-none text-base">${product.price}</span>
                                            </div>
                                            <h1 className="text-lg font-medium text-gray-900 my-1.5">{product.name}</h1>
                                            <p className="leading-relaxed">{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default ProductListing;