import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa"; // Using a lock icon for the heading

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handlePasswordReset = (e) => {
        e.preventDefault();
        // Logic to handle password reset request (e.g., sending an email)
        console.log("Password reset requested for:", email);
        alert(`A password reset link has been sent to ${email}`);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white font-sans">
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-sm lg:max-w-md">
                    <div className="mb-8 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start text-red-600 mb-2">
                            <FaLock className="h-6 w-6 mr-2" />
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Forgot Password
                            </h1>
                        </div>
                        <p className="text-gray-500 text-base mt-2">
                            Enter your email address and we'll send you a link to reset your
                            password.
                        </p>
                    </div>

                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-red-600 text-sm placeholder-transparent"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 peer-focus:text-red-600 peer-focus:-top-0 peer-focus:left-0 peer-focus:text-xs peer-placeholder-shown:top-4"
                            >
                                Email Address
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-red-600 hover:text-red-500"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-1 hidden md:block relative bg-white">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="src\assets\right side.svg"
                    alt="A dynamic illustration of a person exercising"
                />
            </div>
        </div>
    );
}

export default ForgotPassword;