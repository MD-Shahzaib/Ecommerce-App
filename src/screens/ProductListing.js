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
                                            <div className="flex justify-between items-center gap-2 text-gray-400 font-medium text-xs tracking-wide">
                                                <h3>{product.category}</h3>
                                                <span><span className='mr-0.5'>&#8360;</span>{product.price}</span>
                                            </div>
                                            <h1 className="text-lg font-medium text-gray-900 my-1">{product.name}</h1>
                                            <p className="leading-relaxed text-xs">{product.description}</p>
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