import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const FitnessDetails = () => {
    const [formData, setFormData] = useState({
        username: '',
        height: '',
        weight: '',
        age: '',
        goal: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Prevent non-numeric characters where appropriate
        if (['height', 'weight', 'age'].includes(name)) {
            // Allow empty for controlled input clearing
            if (value === '') {
                setFormData((prev) => ({ ...prev, [name]: value }));
                return;
            }
            // Allow only numbers, optional decimal for height/weight
            const numericRegex = name === 'age' ? /^[0-9]*$/ : /^[0-9]*[.]?[0-9]*$/;
            if (!numericRegex.test(value)) return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        const heightNum = parseFloat(formData.height);
        const weightNum = parseFloat(formData.weight);
        const ageNum = parseInt(formData.age, 10);

        if (Number.isNaN(heightNum) || heightNum <= 0) {
            alert('Please enter a valid height greater than 0.');
            return;
        }
        if (Number.isNaN(weightNum) || weightNum <= 0) {
            alert('Please enter a valid weight greater than 0.');
            return;
        }
        if (Number.isNaN(ageNum) || ageNum <= 0) {
            alert('Please enter a valid age greater than 0.');
            return;
        }

        try {
            // Adjust the endpoint to match your backend (e.g., /users/fitness or /fitness/details)
            const response = await axios.post(
                '/users/fitness',
                {
                    username: formData.username,
                    height: heightNum,
                    weight: weightNum,
                    age: ageNum,
                    goal: formData.goal,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Fitness details saved:', response.data);
            alert('Fitness details saved successfully!');
            // Optionally reset or navigate
            // setFormData({ username: '', height: '', weight: '', age: '', goal: '' });
            // navigate('/dashboard');
        } catch (error) {
            console.error('Saving fitness details failed:', error);
            alert('Failed to save fitness details: ' + (error.response?.data?.message || error.message));
        }
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
            <div className="flex-1 flex items-center justify-center p-8 md:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                            FITNESS DETAILS
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Help us personalize your experience by adding your details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="number"
                                    name="height"
                                    id="height"
                                    step="0.1"
                                    min="0"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    placeholder=" "
                                    required
                                    value={formData.height}
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="height"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Height (cm)
                                </label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    step="0.1"
                                    min="0"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                    placeholder=" "
                                    required
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="weight"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Weight (kg)
                                </label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="number"
                                name="age"
                                id="age"
                                min="0"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                                required
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="age"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Age
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="goal"
                                id="goal"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                                required
                                value={formData.goal}
                                onChange={handleInputChange}
                            />
                            <label
                                htmlFor="goal"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Goal (e.g., Lose weight, Build muscle, Maintain)
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        onClick={() => navigate("/login")}
                        >
                            Save and Create User
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Changed your mind?{' '}
                        <Link to="/login" className="font-semibold text-red-600 hover:text-red-500">
                            Back to Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-1 hidden md:block relative bg-white">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="src/assets/right side.svg"
                    alt="A dynamic illustration of a person exercising"
                />
            </div>
        </div>
    );
};

export default FitnessDetails;