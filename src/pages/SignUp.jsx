import axios from 'axios';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSignUp = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      "/users/register",
      {
        fullname: formData.fullName,
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Signup success:", response.data);
    alert("Signup successful! You can now login.");

  } catch (error) {
    console.error("Signup failed:", error);
    alert(
      "Signup failed: " +
      (error.response?.data?.message || error.message)
    );
  }
};

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
              CREATE ACCOUNT
            </h1>
            <p className="text-gray-500 text-sm">
              Join our community and get started today!
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  placeholder=" "
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="fullName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  placeholder=" "
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="username"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <label
                htmlFor="phoneNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                placeholder=" "
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              <label
                htmlFor="dateOfBirth"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date of Birth
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  placeholder=" "
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                  placeholder=" "
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="confirmPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Create Account
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors border border-gray-300"
              onClick={() => console.log("Google sign up clicked")}
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign up with Google
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
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
};

export default SignUp;