import React, { useState } from 'react';

function Checkout() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();

        // Perform payment processing logic and API calls here
        // ...

        // Clear form fields after payment is processed
        setCardNumber('');
        setCardExpiry('');
        setCardCvc('');
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <form onSubmit={handlePayment} className="bg-white p-6 shadow-md rounded-md">
                {/* Payment form fields */}
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-3 py-2 border rounded-md"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="cardExpiry" className="block text-gray-700 font-medium mb-2">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            id="cardExpiry"
                            className="w-full px-3 py-2 border rounded-md"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="cardCvc" className="block text-gray-700 font-medium mb-2">
                            CVC
                        </label>
                        <input
                            type="text"
                            id="cardCvc"
                            className="w-full px-3 py-2 border rounded-md"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Payment button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
}

export default Checkout;