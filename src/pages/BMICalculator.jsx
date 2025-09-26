// src/pages/BMICalculator.js
import React, { useState } from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * A component for the BMI calculator page.
 * It handles user input for height and weight, and simulates fetching the BMI result from a backend.
 */
const BMICalculator = () => {
    const navigate = useNavigate();
    // Existing states
    const [height, setHeight] = useState(''); // used when heightUnit === 'cm'
    const [weight, setWeight] = useState(''); // stores value in current weightUnit
    const [bmi, setBmi] = useState(null); // No type annotation needed in JSX
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // New states for units and validation
    const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' | 'lb'
    const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' | 'ftin'
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    /**
     * Utility: convert current inputs to meters/kg
     */
    const toHeightMeters = () => {
        if (heightUnit === 'cm') {
            const h = parseFloat(height);
            return isFinite(h) ? h / 100 : NaN;
        }
        const ft = parseFloat(heightFt) || 0;
        const inch = parseFloat(heightIn) || 0;
        const totalIn = ft * 12 + inch;
        if (totalIn <= 0) return NaN;
        const cm = totalIn * 2.54;
        return cm / 100;
    };

    const toWeightKg = () => {
        const w = parseFloat(weight);
        if (!isFinite(w)) return NaN;
        return weightUnit === 'kg' ? w : w * 0.45359237;
    };

    /**
     * Simulates a backend API call to calculate and retrieve the BMI.
     * This function would be replaced with an actual `fetch` call to your backend.
     */
    const calculateBMI = async () => {
        setErrorMsg('');
        // Validate inputs based on unit selection
        const heightMeters = toHeightMeters();
        const weightKg = toWeightKg();
        if (!isFinite(heightMeters) || heightMeters <= 0 || !isFinite(weightKg) || weightKg <= 0) {
            setErrorMsg('Please provide valid, positive values for height and weight.');
            return;
        }

        setIsLoading(true); // Show a loading state while fetching data
        setBmi(null); // Reset BMI and status to clear previous results
        setStatus('');

        try {
            // --- START OF BACKEND SIMULATION ---
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            // --- END OF BACKEND SIMULATION ---

            const bmiValue = weightKg / (heightMeters * heightMeters);
            const calculatedBmi = parseFloat(bmiValue.toFixed(1));
            setBmi(calculatedBmi);

            // Determine status based on the backend's returned BMI value
            if (calculatedBmi < 18.5) {
                setStatus('Underweight');
            } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
                setStatus('Normal weight');
            } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
                setStatus('Overweight');
            } else {
                setStatus('Obese');
            }
        } catch (error) {
            console.error("Failed to fetch BMI data:", error);
            setErrorMsg('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false); // Hide the loading state
        }
    };

    const resetAll = () => {
        setHeight('');
        setHeightFt('');
        setHeightIn('');
        setWeight('');
        setWeightUnit('kg');
        setHeightUnit('cm');
        setBmi(null);
        setStatus('');
        setErrorMsg('');
    };

    /**
     * Helper function to determine the status color based on BMI category.
     */
    const getStatusColor = () => {
        switch (status) {
            case 'Underweight':
                return 'text-blue-600';
            case 'Normal weight':
                return 'text-green-600';
            case 'Overweight':
                return 'text-yellow-600';
            case 'Obese':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 py-4 sm:py-6">
            {/* Header */}
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 border border-gray-200">
                    <div className="flex items-center mb-4">
                        <button
                            onClick={() => navigate('/calculators')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            aria-label="Back to calculators"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex items-center">
                            <div className="bg-red-50 p-3 rounded-lg mr-4">
                                <Calculator className="w-8 h-8 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">BMI Calculator</h1>
                                <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
                            </div>
                        </div>
                    </div>

                    {/* Small tip */}
                    <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                        Tip: BMI only needs height and weight. Use the unit toggles below if your values are in ft/in or lb.
                    </div>
                </div>
            </div>

            {/* Calculator */}
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
                    <div className="space-y-5">
                        {/* Weight with unit toggle */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                                <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-md p-1">
                                    <button
                                        type="button"
                                        onClick={() => setWeightUnit('kg')}
                                        className={`px-2 py-1 text-xs rounded ${weightUnit==='kg' ? 'bg-white shadow border border-gray-200' : 'text-gray-600'}`}
                                        aria-pressed={weightUnit==='kg'}
                                    >KG</button>
                                    <button
                                        type="button"
                                        onClick={() => setWeightUnit('lb')}
                                        className={`px-2 py-1 text-xs rounded ${weightUnit==='lb' ? 'bg-white shadow border border-gray-200' : 'text-gray-600'}`}
                                        aria-pressed={weightUnit==='lb'}
                                    >LB</button>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    min={1}
                                    step={0.1}
                                    className={`peer w-full px-4 py-3 pr-16 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errorMsg ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder={`Weight in ${weightUnit}`}
                                />
                                <span className="absolute right-3 inset-y-0 flex items-center text-xs text-gray-500">{weightUnit}</span>
                            </div>
                        </div>

                        {/* Height with unit toggle */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">Height</label>
                                <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-md p-1">
                                    <button
                                        type="button"
                                        onClick={() => setHeightUnit('cm')}
                                        className={`px-2 py-1 text-xs rounded ${heightUnit==='cm' ? 'bg-white shadow border border-gray-200' : 'text-gray-600'}`}
                                        aria-pressed={heightUnit==='cm'}
                                    >CM</button>
                                    <button
                                        type="button"
                                        onClick={() => setHeightUnit('ftin')}
                                        className={`px-2 py-1 text-xs rounded ${heightUnit==='ftin' ? 'bg-white shadow border border-gray-200' : 'text-gray-600'}`}
                                        aria-pressed={heightUnit==='ftin'}
                                    >FT+IN</button>
                                </div>
                            </div>

                            {heightUnit === 'cm' ? (
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="height-cm"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        min={1}
                                        className={`peer w-full px-4 py-3 pr-16 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errorMsg ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Height in cm"
                                    />
                                    <span className="absolute right-3 inset-y-0 flex items-center text-xs text-gray-500">cm</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="height-ft"
                                            value={heightFt}
                                            onChange={(e) => setHeightFt(e.target.value)}
                                            min={0}
                                            className={`peer w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errorMsg ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="0"
                                        />
                                        <span className="absolute right-3 inset-y-0 flex items-center text-xs text-gray-500">ft</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="height-in"
                                            value={heightIn}
                                            onChange={(e) => setHeightIn(e.target.value)}
                                            min={0}
                                            max={11}
                                            className={`peer w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errorMsg ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="0"
                                        />
                                        <span className="absolute right-3 inset-y-0 flex items-center text-xs text-gray-500">in</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Error message */}
                        {errorMsg && (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                                {errorMsg}
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={calculateBMI}
                                disabled={isLoading}
                                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                            >
                                {isLoading ? 'Calculating...' : 'Calculate BMI'}
                            </button>
                            <button
                                onClick={resetAll}
                                disabled={isLoading}
                                className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Results */}
                        {bmi && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-1">Your BMI is</p>
                                    <p className="text-3xl font-bold text-gray-900 mb-2">{bmi}</p>
                                    <p className={`text-lg font-medium ${getStatusColor()}`}>{status}</p>
                                </div>

                                {/* BMI Scale Reference */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 mb-2">BMI Scale:</p>
                                    <div className="text-xs text-gray-600 space-y-1">
                                        <div>• Underweight: Below 18.5</div>
                                        <div>• Normal weight: 18.5 - 24.9</div>
                                        <div>• Overweight: 25 - 29.9</div>
                                        <div>• Obese: 30 and above</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;
