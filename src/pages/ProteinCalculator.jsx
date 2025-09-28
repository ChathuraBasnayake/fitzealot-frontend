import React, { useState } from 'react';
import { Beef, Target, Activity } from 'lucide-react';

const ProteinCalculator = () => {
    // State variables for user inputs
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [goal, setGoal] = useState('maintain');

    // State variables for results
    const [proteinNeeds, setProteinNeeds] = useState(null);
    const [proteinRange, setProteinRange] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Protein multipliers based on activity level and goal (grams per kg of body weight)
    const proteinMultipliers = {
        sedentary: {
            maintain: { min: 0.8, max: 1.0 },
            lose: { min: 1.0, max: 1.2 },
            gain: { min: 1.2, max: 1.4 }
        },
        lightly_active: {
            maintain: { min: 1.0, max: 1.2 },
            lose: { min: 1.2, max: 1.4 },
            gain: { min: 1.4, max: 1.6 }
        },
        moderately_active: {
            maintain: { min: 1.2, max: 1.4 },
            lose: { min: 1.4, max: 1.6 },
            gain: { min: 1.6, max: 1.8 }
        },
        very_active: {
            maintain: { min: 1.4, max: 1.6 },
            lose: { min: 1.6, max: 1.8 },
            gain: { min: 1.8, max: 2.0 }
        },
        extra_active: {
            maintain: { min: 1.6, max: 1.8 },
            lose: { min: 1.8, max: 2.0 },
            gain: { min: 2.0, max: 2.2 }
        }
    };

    // Function to calculate protein needs
    const calculateProtein = () => {
        // Basic input validation
        if (!age || !weight) {
            alert("Please fill in all the required fields.");
            return;
        }

        setIsLoading(true);
        setProteinNeeds(null);
        setProteinRange(null);

        try {
            const weightInKg = parseFloat(weight);
            const multiplier = proteinMultipliers[activityLevel][goal];

            // Calculate protein range
            const minProtein = Math.round(weightInKg * multiplier.min);
            const maxProtein = Math.round(weightInKg * multiplier.max);
            const avgProtein = Math.round((minProtein + maxProtein) / 2);

            setProteinNeeds(avgProtein);
            setProteinRange({ min: minProtein, max: maxProtein });

        } catch (error) {
            console.error("An error occurred during calculation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to get goal description
    const getGoalDescription = () => {
        switch (goal) {
            case 'lose':
                return 'Weight Loss';
            case 'maintain':
                return 'Maintain Weight';
            case 'gain':
                return 'Weight/Muscle Gain';
            default:
                return 'Maintain Weight';
        }
    };

    // Helper function to get goal color
    const getGoalColor = () => {
        switch (goal) {
            case 'lose':
                return 'text-red-600';
            case 'maintain':
                return 'text-green-600';
            case 'gain':
                return 'text-blue-600';
            default:
                return 'text-green-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-2 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-orange-50 p-2 rounded-full">
                            <Beef className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Protein Calculator</h1>
                            <p className="text-sm text-gray-600">Calculate your daily protein requirements</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Calculator Form */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">Enter Your Information</h2>
                        <div className="space-y-3">
                            {/* Gender and Age Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                                    <input
                                        type="number"
                                        id="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="30"
                                    />
                                </div>
                            </div>

                            {/* Weight */}
                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="70"
                                />
                            </div>

                            {/* Activity Level */}
                            <div>
                                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                                <select
                                    id="activityLevel"
                                    value={activityLevel}
                                    onChange={(e) => setActivityLevel(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="sedentary">Sedentary (little to no exercise)</option>
                                    <option value="lightly_active">Lightly Active (1-3 days/week)</option>
                                    <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                                    <option value="very_active">Very Active (6-7 days/week)</option>
                                    <option value="extra_active">Extra Active (daily intense)</option>
                                </select>
                            </div>

                            {/* Goal Selection */}
                            <div>
                                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
                                <select
                                    id="goal"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="lose">Weight Loss</option>
                                    <option value="maintain">Maintain Current Weight</option>
                                    <option value="gain">Weight/Muscle Gain</option>
                                </select>
                            </div>

                            {/* Calculate Button */}
                            <button
                                onClick={calculateProtein}
                                disabled={isLoading || !age || !weight}
                                className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm"
                            >
                                {isLoading ? 'Calculating...' : 'Calculate Protein Needs'}
                            </button>
                        </div>

                        {/* Protein Sources Guide */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">High Protein Sources (per 100g):</p>
                            <div className="text-xs text-gray-600 space-y-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>• Chicken Breast: 31g</div>
                                    <div>• Greek Yogurt: 10g</div>
                                    <div>• Eggs: 13g</div>
                                    <div>• Lentils: 9g</div>
                                    <div>• Salmon: 25g</div>
                                    <div>• Quinoa: 4.4g</div>
                                    <div>• Tofu: 8g</div>
                                    <div>• Almonds: 21g</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Protein Requirements</h2>

                        {(proteinNeeds && proteinRange) ? (
                            <div className="space-y-4">
                                {/* Main Protein Recommendation */}
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-600 mb-1">Daily Protein Target</p>
                                    <p className="text-3xl font-extrabold text-orange-600">{proteinNeeds}g</p>
                                    <p className={`text-sm font-medium ${getGoalColor()}`}>for {getGoalDescription()}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Optimal range: {proteinRange.min}g - {proteinRange.max}g per day
                                    </p>
                                </div>

                                {/* Protein Timing */}
                                <div className="space-y-3">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <Target className="w-4 h-4 mr-1" />
                                            Per Meal Distribution
                                        </p>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-blue-600">{Math.round(proteinNeeds / 3)}g</p>
                                                <p className="text-xs text-gray-600">Breakfast</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-blue-600">{Math.round(proteinNeeds / 3)}g</p>
                                                <p className="text-xs text-gray-600">Lunch</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-bold text-blue-600">{Math.round(proteinNeeds / 3)}g</p>
                                                <p className="text-xs text-gray-600">Dinner</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <Activity className="w-4 h-4 mr-1" />
                                            Post-Workout (if applicable)
                                        </p>
                                        <div className="text-center">
                                            <p className="text-xl font-bold text-green-600">{Math.round(proteinNeeds * 0.25)}g</p>
                                            <p className="text-xs text-gray-600">Within 30 minutes after exercise</p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Protein Quality Tips:</p>
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <div>• Complete proteins: Meat, fish, eggs, dairy, quinoa</div>
                                            <div>• Combine plant proteins: Rice + beans, nuts + seeds</div>
                                            <div>• Spread intake throughout the day for better absorption</div>
                                            <div>• Include protein at every meal and snack</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                                    <p className="font-medium text-amber-800 mb-1">Important Notes:</p>
                                    <ul className="space-y-1 text-amber-700">
                                        <li>• These are general recommendations - individual needs may vary</li>
                                        <li>• Athletes may need higher amounts (up to 2.5g/kg)</li>
                                        <li>• Older adults may benefit from higher protein intake</li>
                                        <li>• Consult a nutritionist for personalized advice</li>
                                        <li>• Stay hydrated when consuming high protein amounts</li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <Beef className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                <p className="text-sm mb-2 font-medium">Ready to Calculate!</p>
                                <p className="text-xs">Fill in your information and click "Calculate Protein Needs" to get your personalized protein requirements.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProteinCalculator;