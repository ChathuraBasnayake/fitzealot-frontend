import axios from "axios";
import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const navigateSignIn = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "/users/login",
                new URLSearchParams({ username, password }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            const token = response.data;
            console.log(" username:",username);


            localStorage.setItem("username", username); // save username

            localStorage.setItem("jwtToken", token);

            navigateSignIn("/dashboard");

            alert("Login successful!");
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white font-sans">
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-sm lg:max-w-md">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 text-base">
                            Please sign in to your account.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-red-600 text-sm placeholder-transparent"
                                placeholder=" "
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                            />
                            <label
                                htmlFor="username"
                                className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 peer-focus:text-red-600 peer-focus:-top-0 peer-focus:left-0 peer-focus:text-xs peer-placeholder-shown:top-4"
                            >
                                Username
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 pt-5 pb-2 bg-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-red-600 text-sm placeholder-transparent"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 peer-focus:text-red-600 peer-focus:-top-0 peer-focus:left-0 peer-focus:text-xs peer-placeholder-shown:top-4"
                            >
                                Password
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Link
                                to="/forgotpassword"
                                className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors border border-gray-300"
                            onClick={() => console.log("Google login clicked")}
                        >
                            <FcGoogle className="h-5 w-5 mr-2" />
                            Sign in with Google
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-red-600 hover:text-red-500"
                        >
                            Sign up
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

export default Login;
