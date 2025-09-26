import React, { useEffect, useReducer, useState } from 'react';
import {
    Utensils, Calendar, Target, Activity, RefreshCw, Loader2, Heart, User, ChefHat,
    ChevronDown, ChevronUp
} from 'lucide-react';
import axios from 'axios';

// API base URL for diet plan generation
const API_BASE_URL = '';

const initialState = {
    loading: false,
    initialLoading: true,
    error: null,
    showForm: true,
    hasExistingData: false,
    weeklyPlan: [],
    formData: {
        username: "",
        heightCm: 170.5,
        weightKg: 67.0,
        fitnessGoal: 'muscle_gain',
        activityLevel: 'moderately_active',
        mealsPerDay: 3,
        dietaryPreferences: 'vegetarian,high_protein',
        allergies: 'peanuts,gluten',
        description: ''
    }
};

const dietPlanReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_INITIAL_LOADING':
            return { ...state, initialLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_SHOW_FORM':
            return { ...state, showForm: action.payload };
        case 'SET_HAS_EXISTING_DATA':
            return { ...state, hasExistingData: action.payload };
        case 'SET_WEEKLY_PLAN':
            return { ...state, weeklyPlan: action.payload };
        case 'SET_FORM_DATA':
            return { ...state, formData: action.payload };
        case 'UPDATE_FORM_INPUT':
            return {
                ...state, formData: {
                    ...state.formData, [action.field]: action.value
                }
            };
        case 'RESET_APP_STATE':
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

const useJwtUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUser({ username: localStorage.getItem("username") });
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { user, loading };
};

function DietPlan() {
    const [state, dispatch] = useReducer(dietPlanReducer, initialState);
    const [expandedMeals, setExpandedMeals] = useState({});
    const { user, loading: userLoading } = useJwtUser();

    /**
     * Toggles the expanded state of a meal plan section.
     * @param {string} dayId The ID of the day.
     * @param {string} mealId The ID of the meal.
     */
    const toggleMeal = (dayId, mealId) => {
        const key = `${dayId}-${mealId}`;
        setExpandedMeals(prev => ({
            ...prev, [key]: !prev[key]
        }));
    };

    /**
     * Checks if a specific meal section is expanded.
     * @param {string} dayId The ID of the day.
     * @param {string} mealId The ID of the meal.
     * @returns {boolean} True if the section is expanded, false otherwise.
     */
    const isMealExpanded = (dayId, mealId) => {
        return expandedMeals[`${dayId}-${mealId}`] || false;
    };


    /**
     * Asynchronously fetches the user's existing diet plan data from the API using Axios.
     * It handles loading states, errors, and updates the application state.
     */
    const checkExistingUserData = async () => {
        dispatch({ type: 'SET_INITIAL_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        if (!user || !user.username) {
            dispatch({ type: 'SET_INITIAL_LOADING', payload: false });
            dispatch({ type: 'SET_SHOW_FORM', payload: true });
            dispatch({ type: 'SET_HAS_EXISTING_DATA', payload: false });
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/diet/get/${localStorage.getItem("username")}`);

            const data = response.data;

            if (data && data.weeklyPlan && data.weeklyPlan.length > 0) {
                dispatch({ type: 'SET_WEEKLY_PLAN', payload: data.weeklyPlan });
                dispatch({ type: 'SET_HAS_EXISTING_DATA', payload: true });
                dispatch({ type: 'SET_SHOW_FORM', payload: false });
            } else {
                dispatch({ type: 'SET_SHOW_FORM', payload: true });
                dispatch({ type: 'SET_HAS_EXISTING_DATA', payload: false });
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                dispatch({ type: 'SET_SHOW_FORM', payload: true });
                dispatch({ type: 'SET_HAS_EXISTING_DATA', payload: false });
            } else {
                dispatch({ type: 'SET_ERROR', payload: err.message });
                console.error('Error fetching user data:', err);
            }
        } finally {
            dispatch({ type: 'SET_INITIAL_LOADING', payload: false });
        }
    };

    /**
     * Handles form submission to generate a new diet plan using Axios.
     * It manages loading, error, and success states.
     */
    const generateDietPlan = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        if (!user || !user.username) {
            dispatch({ type: 'SET_ERROR', payload: "Authentication error: User ID not available." });
            dispatch({ type: 'SET_LOADING', payload: false });
            return;
        }

        try {
            const payload = {
                ...state.formData,
                username: localStorage.getItem("username"),
                // Correctly format the comma-separated strings into arrays
                dietaryPreferences: state.formData.dietaryPreferences
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item !== ''),
                allergies: state.formData.allergies
                    .split(',')
                    .map(item => item.trim())
                    .filter(item => item !== '')
            };

            const response = await axios.post(`${API_BASE_URL}/diet/generate-plan`, payload);

            const data = response.data;

            if (data && data.weeklyPlan) {
                dispatch({ type: 'SET_WEEKLY_PLAN', payload: data.weeklyPlan });
                dispatch({ type: 'SET_SHOW_FORM', payload: false });
                dispatch({ type: 'SET_HAS_EXISTING_DATA', payload: true });
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.response?.data?.message || err.message });
            console.error('Error generating diet plan:', err);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    /**
     * Resets the application to the initial form state.
     */
    const resetForm = () => {
        dispatch({ type: 'SET_SHOW_FORM', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
    };

    useEffect(() => {
        if (!userLoading) {
            checkExistingUserData();
        }
    }, [userLoading, user]);

    if (state.initialLoading || userLoading) {
        return (<div className="space-y-6 bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600 mr-3" />
                    <span className="text-lg font-medium text-gray-700">Loading your diet data...</span>
                </div>
            </div>
        </div>);
    }

    return (<div className="space-y-6 bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center">
                    <div className="bg-green-50 p-3 rounded-lg mr-4">
                        <Utensils className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Diet Plan Generator</h1>
                        <p className="text-gray-600">
                            {state.hasExistingData ? 'Your personalized weekly diet plan' : 'Create your personalized weekly diet plan'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                    {!state.showForm && state.weeklyPlan.length > 0 && (<>
                        <button
                            onClick={checkExistingUserData}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                            disabled={state.loading}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </button>
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                            disabled={state.loading}
                        >
                            <Utensils className="w-4 h-4 mr-2" />
                            New Plan
                        </button>
                    </>)}
                </div>
            </div>

            {state.hasExistingData && !state.showForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                        <User className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-blue-800 font-medium">Welcome back, {user?.username}! Showing your current diet plan.</span>
                    </div>
                </div>)}
        </div>

        {/* Input Form Section */}
        {state.showForm && (<div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                {state.hasExistingData ? 'Update your dietary preferences' : 'Tell us about your dietary preferences'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm)
                    </label>
                    <input
                        id="height"
                        type="number"
                        value={state.formData.heightCm}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'heightCm', value: Number(e.target.value)
                        })}
                        min="100"
                        max="250"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                    </label>
                    <input
                        id="weight"
                        type="number"
                        value={state.formData.weightKg}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'weightKg', value: Number(e.target.value)
                        })}
                        min="30"
                        max="200"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-2">
                        <Target className="w-4 h-4 inline mr-2" />
                        Fitness Goal
                    </label>
                    <select
                        id="fitnessGoal"
                        value={state.formData.fitnessGoal}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'fitnessGoal', value: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="weight_loss">Weight Loss</option>
                        <option value="muscle_gain">Muscle Gain</option>
                        <option value="general_fitness">General Fitness</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">
                        <Activity className="w-4 h-4 inline mr-2" />
                        Activity Level
                    </label>
                    <select
                        id="activityLevel"
                        value={state.formData.activityLevel}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'activityLevel', value: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="sedentary">Sedentary</option>
                        <option value="lightly_active">Lightly Active</option>
                        <option value="moderately_active">Moderately Active</option>
                        <option value="very_active">Very Active</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="mealsPerDay" className="block text-sm font-medium text-gray-700 mb-2">
                        <Utensils className="w-4 h-4 inline mr-2" />
                        Meals Per Day
                    </label>
                    <select
                        id="mealsPerDay"
                        value={state.formData.mealsPerDay}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT',
                            field: 'mealsPerDay',
                            value: parseInt(e.target.value)
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        {[2, 3, 4, 5, 6].map(i => (
                            <option key={i} value={i}>{i} meals</option>))}
                    </select>
                </div>

                <div>
                    <label htmlFor="dietaryPreferences"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        <ChefHat className="w-4 h-4 inline mr-2" />
                        Dietary Preferences (comma-separated)
                    </label>
                    <input
                        id="dietaryPreferences"
                        type="text"
                        value={state.formData.dietaryPreferences}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'dietaryPreferences', value: e.target.value
                        })}
                        placeholder="e.g., vegetarian, high_protein"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2">
                        Allergies (comma-separated, optional)
                    </label>
                    <input
                        id="allergies"
                        type="text"
                        value={state.formData.allergies}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'allergies', value: e.target.value
                        })}
                        placeholder="e.g., peanuts, gluten"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        id="description"
                        value={state.formData.description}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'description', value: e.target.value
                        })}
                        placeholder="e.g., 'I prefer simple recipes', 'I'm on a tight budget'"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={generateDietPlan}
                    disabled={state.loading || userLoading || !user?.username}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                    {state.loading ? (<>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Plan...
                    </>) : (<>
                        <Utensils className="w-5 h-5 mr-2" />
                        {state.hasExistingData ? 'Update My Diet Plan' : 'Generate My Diet Plan'}
                    </>)}
                </button>
            </div>

            {state.error && (<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-center">{state.error}</p>
            </div>)}
        </div>)}

        {/* Weekly Schedule Grid */}
        {!state.showForm && state.weeklyPlan.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.weeklyPlan.map((day) => (<div
                    key={day.id}
                    className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 hover:shadow-md ${day.isRestDay ? 'border-gray-200' : 'border-green-100'}`}
                >
                    {/* Card Header */}
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{day.dayOfWeek}</h3>
                        {day.isRestDay ? (<div className="flex items-center text-gray-500">
                            <Heart className="w-5 h-5 mr-2" />
                            <span className="font-medium">Rest Day</span>
                        </div>) : (<div className="flex items-center text-green-700">
                            <Utensils className="w-5 h-5 mr-2" />
                            <span className="font-medium">Meal Plan</span>
                        </div>)}
                    </div>

                    {/* Rest Day Content */}
                    {day.isRestDay && (<div className="p-6 text-center">
                        <div className="bg-gray-50 rounded-lg p-8">
                            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Enjoy your rest day!</p>
                            <p className="text-sm text-gray-500 mt-2">Focus on hydration and mindful eating.</p>
                        </div>
                    </div>)}

                    {/* Meal Plan Content */}
                    {!day.isRestDay && (<div className="p-6 space-y-4">
                        {day.mealPlan.map((meal) => (
                            <div key={meal.id} className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleMeal(day.id, meal.id)}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex items-center">
                                        <ChefHat className="w-5 h-5 text-yellow-600 mr-3" />
                                        <span
                                            className="font-medium text-gray-900">{meal.mealType} - {meal.name}</span>
                                    </div>
                                    {isMealExpanded(day.id, meal.id) ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />)}
                                </button>
                                {isMealExpanded(day.id, meal.id) && (<div className="px-4 pb-4 space-y-3">
                                    <p className="text-gray-700 text-sm italic">{meal.description}</p>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-bold">Calories:</span> {meal.approxCalories} kcal
                                        <br />
                                        <span className="font-bold">Macros:</span> Protein: {meal.macros.protein}, Carbs: {meal.macros.carbs}, Fat: {meal.macros.fat}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Ingredients:</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                                            {meal.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Instructions:</h4>
                                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mt-1">
                                            {meal.preparationInstructions.map((instruction, index) => (
                                                <li key={index}>{instruction}</li>))}
                                        </ol>
                                    </div>
                                </div>)}
                            </div>))}
                    </div>)}
                </div>))}
            </div>)}

        {/* Empty State Message */}
        {!state.showForm && state.weeklyPlan.length === 0 && !state.loading && !state.initialLoading && (
            <div className="text-center py-12">
                <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No diet plan found. Please generate a new diet plan.</p>
                <button
                    onClick={resetForm}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                    Create Diet Plan
                </button>
            </div>)}
    </div>);
}

export default DietPlan;