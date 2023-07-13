import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {products.map((product) => {
                            return (
                                <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                    <Link to={product._id} className="block relative h-48 rounded overflow-hidden">
                                        <img alt={product.name} className="object-cover object-center w-full h-full block" src={product.image} />
                                    </Link>
                                    <div className="mt-4">
                                        <h4 className="text-gray-700 font-semibold text-xs mb-1">BRAND : {product.brand}</h4>
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY : {product.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                                        <p className="mt-1">${product.price}</p>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            {/* <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {products.map((product) => (
                            <div className="p-4 md:w-1/3">
                                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={product.image} alt={product.name} />
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY : {product.category}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{product.name}</h1>
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">BRAND : {product.brand}</h2>
                                        <p className="leading-relaxed mb-3">{product.description}</p>
                                        <div className="flex items-center flex-wrap ">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
                                            <span className="text-gray-400 items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm">${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </>
    );
}

export default ProductListing;
