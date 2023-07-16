import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ShopCart = () => {

    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    /* const cartItems = [
        {
            id: 1,
            image: 'https://dummyimage.com/200x150',
            title: 'Product 1',
            category: 'Category 1',
            price: 10,
            quantity: 2,
        },
        {
            id: 2,
            image: 'https://dummyimage.com/200x150',
            title: 'Product 2',
            category: 'Category 2',
            price: 15,
            quantity: 1,
        },
        {
            id: 3,
            image: 'https://dummyimage.com/200x150',
            title: 'Product 3',
            category: 'Category 1',
            price: 20,
            quantity: 3,
        },
    ]; */

    const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
    const deliveryTax = 5;
    const discount = 10;
    const subtotal = cartTotal + deliveryTax - discount;

    return (
        <div className="min-h-screen bg-slate-200 text-slate-800">
            <div className="container mx-auto px-5 py-10">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart ({cartItems.length} items)</h1>
                {/* <button onClick={clearCart} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded' >Clear Cart</button> */}

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
                                        <button className="bg-blue-500 text-white rounded-l px-3 py-2 focus:outline-none">
                                            -
                                        </button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button className="bg-blue-500 text-white rounded-r px-3 py-2 focus:outline-none">
                                            +
                                        </button>
                                    </div>
                                    <button className="text-red-500 focus:outline-none" onClick={() => { removeFromCart(item._id) }}>Remove</button>
                                </div>
                                <div className="mt-4">
                                    <p className="text-lg">Price: ${item.price}</p>
                                </div>
                            </div>

                            // <div class="p-4 md:w-1/3">
                            //     <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            //         <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog" />
                            //         <div class="p-6">
                            //             <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                            //             <h1 class="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
                            //             <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                            //             <div class="flex items-center flex-wrap ">
                            //                 <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                            //                     <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            //                         <path d="M5 12h14"></path>
                            //                         <path d="M12 5l7 7-7 7"></path>
                            //                     </svg>
                            //                 </a>
                            //                 <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            //                     <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            //                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            //                         <circle cx="12" cy="12" r="3"></circle>
                            //                     </svg>1.2K
                            //                 </span>
                            //                 <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                            //                     <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            //                         <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            //                     </svg>6
                            //                 </span>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
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