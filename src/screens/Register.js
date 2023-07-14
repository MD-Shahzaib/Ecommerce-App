import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone }),
            });
            console.log(response);
            if (response.ok) {
                console.log(response);
                navigate("/");
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow my-8 md:my-4 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl">Create your Account</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    required=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    required=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required=""
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Your Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone number (123-456-7890)"
                                    required=""
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
                            <p className="text-sm font-normal text-gray-500">Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;