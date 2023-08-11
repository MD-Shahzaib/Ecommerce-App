import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
// ICONS.
import { MdDelete, MdAddCircle, MdRemoveCircle, MdShoppingBag, MdClear } from 'react-icons/md';

const Cart = () => {

    // STATES
    const { cartItems, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryTax = 0; // Change this to actual delivery tax
    const discount = 0; // Change this to actual discount
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className={`bg-slate-200 py-10 ${cartItems.length === 0 && "h-[calc(100vh-10rem)]"}`}>
            <div className="container mx-auto px-5">
                <h1 className="text-2xl font-semibold mb-4 flex items-center">
                    <span>Shopping Cart</span>
                    <span className='ml-2 mt-1 bg-slate-800 text-white text-sm py-0.5 px-2 rounded-full'>{cartItems.length}</span>
                </h1>
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
                    <div className="flex items-center justify-between mt-10 bg-white p-4 shadow-md rounded-md max-[475px]:flex-col">
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