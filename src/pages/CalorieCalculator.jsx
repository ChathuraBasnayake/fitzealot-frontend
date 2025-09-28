import React, { useState } from 'react';
import { Calculator, HeartPulse } from 'lucide-react';

const CalorieCalculator = () => {
    // State variables for user inputs
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');

    // State variables for results
    const [bmr, setBmr] = useState(null);
    const [tdee, setTdee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Constants for activity level multipliers
    const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extra_active: 1.9,
    };

    // Function to calculate daily calories
    const calculateCalories = () => {
        // Basic input validation
        if (!age || !height || !weight) {
            alert("Please fill in all the required fields.");
            return;
        }

        setIsLoading(true);
        setBmr(null);
        setTdee(null);

        try {
            const weightInKg = parseFloat(weight);

            // Calculate BMR using Mifflin-St Jeor formula
            let bmrValue = 0;
            if (gender === 'male') {
                bmrValue = (10 * weightInKg) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) + 5;
            } else {
                bmrValue = (10 * weightInKg) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) - 161;
            }
            setBmr(bmrValue.toFixed(0));

            // Calculate TDEE
            const tdeeValue = bmrValue * activityMultipliers[activityLevel];
            setTdee(tdeeValue.toFixed(0));

        } catch (error) {
            console.error("An error occurred during calculation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 font-sans flex flex-col">
            <div className="flex flex-col flex-1 h-full p-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full">
                    <div className="flex items-center space-x-3">
                        <div className="bg-red-50 p-2 rounded-full">
                            <HeartPulse className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Calorie Calculator</h1>
                            <p className="text-sm text-gray-600">Calculate your daily caloric needs</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                    {/* Calculator Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full h-full">
                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-gray-800 text-center xl:text-left">Enter Your Information</h2>
                            <div className="space-y-3">
                                {/* Gender and Age Row */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select
                                            id="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                                        <input
                                            type="number"
                                            id="age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="30"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                {/* Height and Weight Row */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                        <input
                                            type="number"
                                            id="height"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="175"
                                            min="0"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                        <input
                                            type="number"
                                            id="weight"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="70"
                                            min="0"
                                        />
                                    </div>
                                </div>
                                {/* Activity Level */}
                                <div>
                                    <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                                    <select
                                        id="activityLevel"
                                        value={activityLevel}
                                        onChange={(e) => setActivityLevel(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="sedentary">Sedentary (little to no exercise)</option>
                                        <option value="lightly_active">Lightly Active (1-3 days/week)</option>
                                        <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                                        <option value="very_active">Very Active (6-7 days/week)</option>
                                        <option value="extra_active">Extra Active (daily intense)</option>
                                    </select>
                                </div>
                                {/* Calculate Button */}
                                <button
                                    onClick={calculateCalories}
                                    disabled={isLoading || !age || !height || !weight}
                                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm mt-2"
                                >
                                    {isLoading ? 'Calculating...' : 'Calculate Calories'}
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">Activity Level Guide:</p>
                            <div className="text-xs text-gray-600 space-y-1">
                                <div>• <strong>Sedentary:</strong> Desk job, minimal exercise</div>
                                <div>• <strong>Lightly Active:</strong> Light exercise 1-3 days/week</div>
                                <div>• <strong>Moderately Active:</strong> Moderate exercise 3-5 days/week</div>
                                <div>• <strong>Very Active:</strong> Hard exercise 6-7 days/week</div>
                                <div>• <strong>Extra Active:</strong> Very hard exercise, physical job</div>
                            </div>
                        </div>
                    </div>
                    {/* Results Section */}
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center w-full h-full">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800 text-center xl:text-left">Your Calorie Results</h2>
                        {(bmr && tdee) ? (
                            <div className="space-y-4">
                                {/* Calorie Results */}
                                <div className="space-y-3">
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <p className="text-sm font-medium text-gray-700 mb-1">BMR (Basal Metabolic Rate)</p>
                                        <p className="text-2xl font-bold text-blue-600">{bmr} kcal</p>
                                        <p className="text-xs text-gray-600">Calories burned at complete rest</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 text-center">
                                        <p className="text-sm font-medium text-gray-700 mb-1">TDEE (Total Daily Energy Expenditure)</p>
                                        <p className="text-2xl font-bold text-green-600">{tdee} kcal</p>
                                        <p className="text-xs text-gray-600">Total calories burned including activity</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2 text-center">Daily Calorie Goals</p>
                                        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
                                            <div className="text-center bg-white rounded-lg p-2">
                                                <p className="text-lg font-bold text-red-600">{Math.round(tdee * 0.8)}</p>
                                                <p className="text-xs text-gray-600 font-medium">Weight Loss</p>
                                                <p className="text-xs text-gray-500">-20% deficit</p>
                                            </div>
                                            <div className="text-center bg-white rounded-lg p-2">
                                                <p className="text-lg font-bold text-green-600">{tdee}</p>
                                                <p className="text-xs text-gray-600 font-medium">Maintenance</p>
                                                <p className="text-xs text-gray-500">Current weight</p>
                                            </div>
                                            <div className="text-center bg-white rounded-lg p-2">
                                                <p className="text-lg font-bold text-blue-600">{Math.round(tdee * 1.15)}</p>
                                                <p className="text-xs text-gray-600 font-medium">Weight Gain</p>
                                                <p className="text-xs text-gray-500">+15% surplus</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400 mt-2">
                                    <p className="font-medium text-amber-800 mb-1">Important Notes:</p>
                                    <ul className="space-y-1 text-amber-700">
                                        <li>• These are estimates based on general formulas</li>
                                        <li>• Individual metabolic rates can vary significantly</li>
                                        <li>• Consult healthcare professionals for personalized advice</li>
                                        <li>• Monitor your progress and adjust as needed</li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-500">
                                <Calculator className="w-16 h-16 mb-4 opacity-30" />
                                <p className="text-sm mb-2 font-medium">Ready to Calculate!</p>
                                <p className="text-xs text-center">Fill in your information and click "Calculate Calories" to see your daily caloric needs.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalorieCalculator;