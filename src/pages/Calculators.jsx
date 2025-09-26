import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Activity, Zap } from 'lucide-react';

/**
 * A component that displays a hub of health calculators with links to each tool.
 */
const Calculators = () => {
    const navigate = useNavigate();

    const calculators = [
        {
            title: 'BMI Calculator',
            description: 'Calculate your Body Mass Index to assess your weight status',
            icon: Calculator,
            route: '/calculators/bmi',
            color: 'bg-red-50 text-red-600'
        },
        {
            title: 'Calorie Calculator',
            description: 'Estimate your daily caloric needs based on your activity level',
            icon: Activity,
            route: '/calculators/calorie',
            color: 'bg-blue-50 text-blue-600'
        },
        {
            title: 'Protein Calculator',
            description: 'Determine your optimal daily protein intake for your goals',
            icon: Zap,
            route: '/calculators/protein',
            color: 'bg-green-50 text-green-600'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Calculators</h1>
                <p className="text-gray-600">Tools to help you track and optimize your fitness journey</p>
            </div>

            {/* Calculator Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.map((calc, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => calc.route && navigate(calc.route)}
                    >
                        <div className={`inline-flex p-3 rounded-lg ${calc.color} mb-4`}>
                            <calc.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{calc.title}</h3>
                        <p className="text-gray-600 mb-4">{calc.description}</p>
                        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                            Open Calculator
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calculators;
