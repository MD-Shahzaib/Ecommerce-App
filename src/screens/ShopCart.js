import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ShopCart = () => {

    const { cartItems, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
    const deliveryTax = 0;
    const discount = 0;
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className="min-h-screen bg-slate-200 text-slate-800">
            <div className="container mx-auto px-5 py-10">
                <div className="flex justify-between items-center mb-4 flex-wrap">
                    <h1 className="text-3xl font-bold mt-4">Shopping Cart ({cartItems.length} items)</h1>
                    {cartItems.length !== 0 && <button onClick={clearCart} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4' >Clear All</button>}
                </div>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {cartItems.map(item => (
                            <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                                    <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p>{item.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center">
                                        <button className="bg-blue-500 text-white rounded-l px-3 py-2 focus:outline-none" onClick={() => decrementQuantity(item._id)}>-</button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button className="bg-blue-500 text-white rounded-r px-3 py-2 focus:outline-none" onClick={() => incrementQuantity(item._id)}>+</button>
                                    </div>
                                    <button className="text-red-500 focus:outline-none" onClick={() => { removeFromCart(item._id) }}>Remove</button>
                                </div>
                                <div className="mt-4">
                                    <p className="text-lg">Price: ${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white p-4 shadow-md rounded-md flex items-center justify-between flex-wrap mt-8 sm:flex-no-wrap">
                    <div>
                        <p className="text-lg">Subtotal: ${cartTotal}</p>
                        <p className="text-lg">Delivery Tax: ${deliveryTax}</p>
                        <p className="text-lg">Discount: -${discount}</p>
                    </div>
                    <div className="my-4 sm:my-0">
                        <p className="text-3xl font-bold">Total: ${subtotal}</p>
                    </div>
                    <Link to='/checkout'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShopCart;