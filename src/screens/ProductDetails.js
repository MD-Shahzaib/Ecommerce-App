import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductDetails() {

    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            setProduct(data.product);
        } catch (error) {
            console.log('Error fetching product:', error);
        }
    };

    // handle AddToCart with the selected (size, quantity).
    const handleAddToCart = () => {
        addToCart({ ...product, size: selectedSize, quantity: quantity });
        setQuantity(1);
        setSelectedSize("M");
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                {product ? (
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {/* Product Image */}
                        <img src={product.image} alt={product.name} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />

                        {/* Product Details */}
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-base text-slate-700 tracking-widest">{product.brand}</h2>
                            <h1 className="text-gray-900 text-3xl font-medium">{product.name}</h1>

                            {/* Product Rating */}
                            <span className="flex items-center my-2">
                                {[...Array(5)].map((_, index) => (<svg key={index} fill={`${index < 4 ? 'currentColor' : 'none'}`} className={`w-4 h-4 text-blue-500 ${index < 4 ? 'mr-1' : ''}`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>))}
                                <span className="text-gray-600 ml-3 tracking-wide">4 Reviews</span>
                            </span>

                            {/* Product Description */}
                            <p className="leading-relaxed text-slate-500 tracking-wide">{product.description}</p>

                            {/* Product Options */}
                            <div className="flex items-center flex-wrap gap-5 pb-5 my-5 border-b-2 border-gray-100">

                                {/* Size options */}
                                <div className="flex items-center">
                                    <span className="mr-3 text-lg font-semibold text-slate-700">Size</span>
                                    <div className="relative">
                                        <select
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                            className="rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-2 pr-8 font-medium"
                                        >
                                            {['SM', 'M', 'L', 'XL'].map((size, index) => (
                                                <option key={index} value={size}>{size}</option>
                                            ))}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></span>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center flex-wrap">
                                    <span className="mr-3 text-lg text-slate-700 font-semibold">Quantity</span>
                                    <div className="relative">
                                        <button
                                            onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                                            className="w-8 h-9 rounded bg-gray-200 text-gray-600 focus:outline-none"
                                        >-</button>
                                        <span className="rounded border font-medium border-gray-300 py-1.5 px-4 mx-1 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-8 h-9 rounded bg-gray-200 text-gray-600 focus:outline-none"
                                        >+</button>
                                    </div>
                                </div>

                            </div>

                            {/* Product Price and Actions */}
                            <div className="flex items-center">
                                <span className="title-font font-medium text-3xl text-gray-900"><span className='text-xl mr-0.5'>&#8360;</span>{product.price}</span>
                                {/* AddToCart buttons */}
                                <button onClick={handleAddToCart} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded font-medium">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading product...</p>
                )}
            </div>
        </section>
    );
}

export default ProductDetails;