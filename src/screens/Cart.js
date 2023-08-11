import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
// ICONS.
import { MdDelete, MdAddCircle, MdRemoveCircle, MdShoppingBag, MdClear } from 'react-icons/md';

const Cart = () => {

    // STATES
    const { cartItems, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryTax = 0;
    const discount = 0;
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className="bg-slate-200 py-10">
            <div className="container mx-auto px-5">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart ({cartItems.length})</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="overflow-auto">
                        <div className="w-full">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900 text-white overflow-hidden">
                                        <th className="p-3 rounded-tl-md border">Product</th>
                                        <th className="p-3 border">Quantity</th>
                                        <th className="p-3 border">Price</th>
                                        <th className="p-3 border">Total</th>
                                        <th className="p-3 rounded-tr-md border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item._id} className="bg-white">
                                            <td className="p-3 border border-gray-300 hover:bg-gray-100">
                                                <div className="flex items-center gap-4 flex-wrap">
                                                    <img src={item.image} alt={item.title} className="w-16 h-16 max-[770px]:hidden  object-cover" />
                                                    <div>
                                                        <p className="font-semibold truncate">{item.name}</p>
                                                        <p className="text-gray-600 text-xs">{item.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 border border-gray-300 hover:bg-gray-100">
                                                <div className="flex items-center justify-center">
                                                    <MdRemoveCircle
                                                        onClick={() => decrementQuantity(item._id)}
                                                        className="text-3xl text-black"
                                                    />
                                                    <span className="font-medium px-3 text-center w-14">{item.quantity}</span>
                                                    <MdAddCircle
                                                        onClick={() => incrementQuantity(item._id)}
                                                        className="text-3xl text-black"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-3 border border-gray-300 hover:bg-gray-100 text-center font-semibold">${item.price}</td>
                                            <td className="p-3 border border-gray-300 hover:bg-gray-100 text-center font-semibold">${item.price * item.quantity}</td>
                                            <td className="p-3 border border-gray-300 hover:bg-gray-100">
                                                <MdDelete onClick={() => { removeFromCart(item._id) }} className='text-red-500 text-2xl mx-auto' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className="flex items-center justify-between mt-10 bg-white p-4 shadow-md rounded-md max-[600px]:flex-col">
                        <div className="mb-4 sm:mb-0 max-[475px]:w-full">
                            <h2 className='text-2xl font-semibold mb-4'>Summary</h2>
                            <div className="flex items-center justify-between font-medium text-slate-600 text-lg gap-4">
                                <span>Subtotal</span>
                                <span className='ml-auto text-slate-800'>{cartTotal}</span>
                            </div>
                            <div className="flex items-center justify-between font-medium text-slate-600 text-lg gap-4">
                                <span>Delivery</span>
                                <span className='ml-auto text-slate-800'>{deliveryTax}</span>
                            </div>
                            <div className="flex items-center justify-between font-medium text-slate-600 text-lg gap-4">
                                <span>Discount</span>
                                <span className='ml-auto text-slate-800'>{discount}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center flex-col gap-2">
                            <div className="flex items-center max-[475px]:justify-center justify-end font-medium text-slate-600 text-3xl w-full mb-4">
                                <span className='text-black font-semibold'>Total</span>
                                <span className='ml-4 text-blue-600'>&#36;{subtotal}</span>
                            </div>
                            <div className='flex gap-2'>
                                <Link to='/checkout' className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold flex items-center gap-2">
                                    <MdShoppingBag className='text-2xl' />
                                    Checkout
                                </Link>
                                <button
                                    onClick={clearCart}
                                    className='bg-red-500 hover:bg-red-600 text-white p-3 rounded-md font-semibold flex items-center gap-2'
                                >
                                    <MdClear className='text-2xl' />
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;





// (grid)
/*
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryTax = 0;
    const discount = 0;
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart ({cartItems.length})</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
                                <div className="flex items-center justify-between">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-gray-600">{item.category}</p>
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
                                <p className="mt-4 text-lg font-semibold">${item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className="mt-8 bg-white p-4 shadow-md rounded-md flex flex-col sm:flex-row items-center justify-between">
                        <div className="mb-4 sm:mb-0">
                            <p className="text-lg">Subtotal: ${cartTotal}</p>
                            <p className="text-lg">Delivery Tax: ${deliveryTax}</p>
                            <p className="text-lg">Discount: -${discount}</p>
                        </div>
                        <div className="my-4 sm:my-0">
                            <p className="text-3xl font-bold">Total: ${subtotal}</p>
                        </div>
                        <Link to='/checkout'>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">Checkout</button>
                        </Link>
                        <button onClick={clearCart} className='mt-4 sm:mt-0 font-medium bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold sm:ml-4'>Clear All</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
*/



// (darktheme)
/*
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryTax = 0;
    const discount = 0;
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className="bg-gray-900 text-white min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart ({cartItems.length})</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-gray-800 p-4 shadow-md rounded-md">
                            <thead>
                                <tr className="bg-blue-700">
                                    <th className="py-2">Product</th>
                                    <th className="py-2">Quantity</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Total</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item._id}>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                                                <div>
                                                    <p className="font-semibold">{item.title}</p>
                                                    <p className="text-gray-400">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                <button className="bg-blue-700 text-white rounded-l px-3 py-1 focus:outline-none" onClick={() => decrementQuantity(item._id)}>-</button>
                                                <span className="px-3">{item.quantity}</span>
                                                <button className="bg-blue-700 text-white rounded-r px-3 py-1 focus:outline-none" onClick={() => incrementQuantity(item._id)}>+</button>
                                            </div>
                                        </td>
                                        <td className="py-3">${item.price}</td>
                                        <td className="py-3">${item.price * item.quantity}</td>
                                        <td className="py-3">
                                            <button className="text-red-500 focus:outline-none" onClick={() => { removeFromCart(item._id) }}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className="mt-8 bg-gray-800 p-4 shadow-md rounded-md flex flex-col sm:flex-row items-center justify-between">
                       <div className="mb-4 sm:mb-0">
                            <p className="text-lg">Subtotal: ${cartTotal}</p>
                            <p className="text-lg">Delivery Tax: ${deliveryTax}</p>
                            <p className="text-lg">Discount: -${discount}</p>
                        </div>
                        <div className="my-4 sm:my-0">
                            <p className="text-3xl font-bold">Total: ${subtotal}</p>
                        </div>
                        <Link to='/checkout'>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">Checkout</button>
                        </Link>
                        <button onClick={clearCart} className='mt-4 sm:mt-0 font-medium bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full sm:ml-4'>Clear All</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
*/
