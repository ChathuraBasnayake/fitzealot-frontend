import React, {useEffect, useReducer, useState} from 'react';
import {
    Dumbbell, Clock, Activity, Heart, ChevronDown, ChevronUp, User, Target, Calendar, Loader2, RefreshCw
} from 'lucide-react';
import axios from 'axios';


const useJwtUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {

            setUser({username: localStorage.getItem("username")});
            setLoading(false);
        }, 500);


        return () => clearTimeout(timer);
    }, []);

    return {user, loading};
};


const API_BASE_URL = '';


const initialState = {


    loading: false, initialLoading: true, error: null, showForm: true, hasExistingData: false,


    weeklyPlan: [],


    formData: {
        username: "",
        heightCm: 170,
        weightKg: 70,
        fitnessGoal: 'weight_loss',
        activityLevel: 'beginner',
        preferredWorkoutTime: 'morning',
        workoutDaysPerWeek: 3,
        description: ''
    }
};


const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        case 'SET_INITIAL_LOADING':
            return {...state, initialLoading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'SET_SHOW_FORM':
            return {...state, showForm: action.payload};
        case 'SET_HAS_EXISTING_DATA':
            return {...state, hasExistingData: action.payload};
        case 'SET_WEEKLY_PLAN':
            return {...state, weeklyPlan: action.payload};
        case 'SET_FORM_DATA':
            return {...state, formData: action.payload};
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

function Workouts() {
    const [state, dispatch] = useReducer(workoutReducer, initialState);
    const [expandedSections, setExpandedSections] = useState({});
    const {user, loading: userLoading} = useJwtUser();

    /**
     * Toggles the expanded state of a workout section (warm-up, exercises, cool-down).
     * @param {number} dayId The ID of the workout day.
     * @param {string} section The name of the section to toggle.
     */
    const toggleSection = (dayId, section) => {
        const key = `${dayId}-${section}`;
        setExpandedSections(prev => ({
            ...prev, [key]: !prev[key]
        }));
    };

    /**
     * Checks if a specific section is expanded.
     * @param {number} dayId The ID of the workout day.
     * @param {string} section The name of the section.
     * @returns {boolean} True if the section is expanded, false otherwise.
     */
    const isExpanded = (dayId, section) => {
        return expandedSections[`${dayId}-${section}`] || false;
    };

    /**
     * Determines the Tailwind CSS classes for the workout type label based on its content.
     * @param {string} workoutType The type of the workout (e.g., 'Strength', 'Cardio').
     * @returns {string} The appropriate Tailwind CSS class string.
     */
    const getWorkoutTypeColor = (workoutType) => {
        const type = workoutType.toLowerCase();
        if (type.includes('strength')) return 'bg-red-50 text-red-700 border-red-200';
        if (type.includes('cardio')) return 'bg-blue-50 text-blue-700 border-blue-200';
        if (type.includes('hiit')) return 'bg-orange-50 text-orange-700 border-orange-200';
        if (type.includes('recovery')) return 'bg-green-50 text-green-700 border-green-200';
        return 'bg-gray-50 text-gray-700 border-gray-200';
    };

    /**
     * Asynchronously fetches the user's existing workout data from the API using Axios.
     * It handles loading states, errors, and updates the application state.
     */
    const checkExistingUserData = async () => {


        dispatch({type: 'SET_INITIAL_LOADING', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});


        if (!user || !user.username) {
            dispatch({type: 'SET_INITIAL_LOADING', payload: false});
            dispatch({type: 'SET_SHOW_FORM', payload: true});
            dispatch({type: 'SET_HAS_EXISTING_DATA', payload: false});
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/workouts/get/${localStorage.getItem("username")}`);

            const data = response.data;

            if (data && data.weeklyPlan && data.weeklyPlan.length > 0) {


                dispatch({type: 'SET_WEEKLY_PLAN', payload: data.weeklyPlan});
                dispatch({type: 'SET_HAS_EXISTING_DATA', payload: true});
                dispatch({type: 'SET_SHOW_FORM', payload: false});
            } else {


                dispatch({type: 'SET_SHOW_FORM', payload: true});
                dispatch({type: 'SET_HAS_EXISTING_DATA', payload: false});
            }
        } catch (err) {


            if (err.response && err.response.status === 404) {


                dispatch({type: 'SET_SHOW_FORM', payload: true});
                dispatch({type: 'SET_HAS_EXISTING_DATA', payload: false});
            } else {


                dispatch({type: 'SET_ERROR', payload: err.message});
                dispatch({type: 'SET_SHOW_FORM', payload: true});
                console.error('Error fetching user data:', err);
            }
        } finally {
            dispatch({type: 'SET_INITIAL_LOADING', payload: false});
        }
    };

    /**
     * Handles form submission to generate a new workout plan using Axios.
     * It manages loading, error, and success states.
     */
    const generateWorkoutPlan = async () => {
        dispatch({type: 'SET_LOADING', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});


        if (!user || !user.username) {
            dispatch({type: 'SET_ERROR', payload: "Authentication error: User ID not available."});
            dispatch({type: 'SET_LOADING', payload: false});
            return;
        }

        try {
            state.formData.username = localStorage.getItem("username");
            const response = await axios.post(`${API_BASE_URL}/workouts/generate-plan`, state.formData);

            const data = response.data;

            if (data && data.weeklyPlan) {
                dispatch({type: 'SET_WEEKLY_PLAN', payload: data.weeklyPlan});
                dispatch({type: 'SET_SHOW_FORM', payload: false});
                dispatch({type: 'SET_HAS_EXISTING_DATA', payload: true});
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (err) {
            dispatch({type: 'SET_ERROR', payload: err.message});
            console.error('Error generating workout plan:', err);
        } finally {
            dispatch({type: 'SET_LOADING', payload: false});
        }
    };

    /**
     * Resets the application to the initial form state.
     */
    const resetForm = () => {
        dispatch({type: 'SET_SHOW_FORM', payload: true});
        dispatch({type: 'SET_ERROR', payload: null});
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
                    <Loader2 className="w-8 h-8 animate-spin text-red-600 mr-3"/>
                    <span className="text-lg font-medium text-gray-700">Loading your workout data...</span>
                </div>
            </div>
        </div>);
    }

    return (<div className="space-y-6 bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center">
                    <div className="bg-red-50 p-3 rounded-lg mr-4">
                        <Dumbbell className="w-8 h-8 text-red-600"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Workout Plan Generator</h1>
                        <p className="text-gray-600">
                            {state.hasExistingData ? 'Your personalized weekly workout plan' : 'Create your personalized weekly workout plan'}
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
                            <RefreshCw className="w-4 h-4 mr-2"/>
                            Refresh
                        </button>
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
                            disabled={state.loading}
                        >
                            <Dumbbell className="w-4 h-4 mr-2"/>
                            New Plan
                        </button>
                    </>)}
                </div>
            </div>

            {state.hasExistingData && !state.showForm && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                        <User className="w-5 h-5 text-green-600 mr-2"/>
                        <span className="text-green-800 font-medium">Welcome back, {user?.username}! Showing your current workout plan.</span>
                    </div>
                </div>)}
        </div>

        {/* Input Form Section */}
        {state.showForm && (<div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                {state.hasExistingData ? 'Update your fitness goals' : 'Tell us about your fitness goals'}
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-2">
                        <Target className="w-4 h-4 inline mr-2"/>
                        Fitness Goal
                    </label>
                    <select
                        id="fitnessGoal"
                        value={state.formData.fitnessGoal}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'fitnessGoal', value: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="weight_loss">Weight Loss</option>
                        <option value="muscle_gain">Muscle Gain</option>
                        <option value="strength_building">Strength Building</option>
                        <option value="endurance">Endurance</option>
                        <option value="general_fitness">General Fitness</option>
                        <option value="flexibility">Flexibility</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">
                        <Activity className="w-4 h-4 inline mr-2"/>
                        Activity Level
                    </label>
                    <select
                        id="activityLevel"
                        value={state.formData.activityLevel}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'activityLevel', value: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="preferredWorkoutTime"
                           className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-2"/>
                        Preferred Workout Time
                    </label>
                    <select
                        id="preferredWorkoutTime"
                        value={state.formData.preferredWorkoutTime}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'preferredWorkoutTime', value: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="night">Night</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="workoutDays" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2"/>
                        Workout Days Per Week
                    </label>
                    <select
                        id="workoutDays"
                        value={state.formData.workoutDaysPerWeek}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT',
                            field: 'workoutDaysPerWeek',
                            value: parseInt(e.target.value)
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                        {[...Array(7).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1} day{i + 1 > 1 ? 's' : ''}</option>))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description (Optional)
                    </label>
                    <textarea
                        id="description"
                        value={state.formData.description}
                        onChange={(e) => dispatch({
                            type: 'UPDATE_FORM_INPUT', field: 'description', value: e.target.value
                        })}
                        placeholder="Tell us more about your fitness preferences, any injuries, equipment available, etc."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={generateWorkoutPlan}
                    disabled={state.loading || userLoading || !user?.username}
                    className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                >
                    {state.loading ? (<>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                        Generating Plan...
                    </>) : (<>
                        <Dumbbell className="w-5 h-5 mr-2"/>
                        {state.hasExistingData ? 'Update My Workout Plan' : 'Generate My Workout Plan'}
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
                    className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 hover:shadow-md ${day.restDay ? 'border-gray-200' : 'border-red-100'}`}
                >
                    {/* Card Header */}
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{day.dayOfWeek}</h3>
                        {day.restDay ? (<div className="flex items-center text-gray-500">
                            <Heart className="w-5 h-5 mr-2"/>
                            <span className="font-medium">Rest Day</span>
                        </div>) : (<div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getWorkoutTypeColor(day.workoutType)}`}>
                            <Activity className="w-4 h-4 mr-2"/>
                            {day.workoutType}
                        </div>)}
                    </div>

                    {/* Rest Day Content */}
                    {day.restDay && (<div className="p-6 text-center">
                        <div className="bg-gray-50 rounded-lg p-8">
                            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                            <p className="text-gray-600 font-medium">Take a well-deserved rest!</p>
                            <p className="text-sm text-gray-500 mt-2">Recovery is just as important as
                                training</p>
                        </div>
                    </div>)}

                    {/* Workout Content */}
                    {!day.restDay && (<div className="p-6 space-y-4">
                        {/* Warm-up Section */}
                        {day.warmUp && day.warmUp.length > 0 && (
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleSection(day.id, 'warmup')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-orange-600 mr-3"/>
                                        <span className="font-medium text-gray-900">Warm-up</span>
                                    </div>
                                    {isExpanded(day.id, 'warmup') ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400"/>) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400"/>)}
                                </button>
                                {isExpanded(day.id, 'warmup') && (<div className="px-4 pb-4">
                                    <ul className="space-y-2">
                                        {day.warmUp.map((warmup, index) => (
                                            <li key={index} className="flex items-start">
                                                                <span
                                                                    className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                <span className="text-gray-700 text-sm">{warmup}</span>
                                            </li>))}
                                    </ul>
                                </div>)}
                            </div>)}

                        {/* Exercises Section */}
                        {day.exercises && day.exercises.length > 0 && (
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleSection(day.id, 'exercises')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex items-center">
                                        <Dumbbell className="w-5 h-5 text-red-600 mr-3"/>
                                        <span className="font-medium text-gray-900">Exercises</span>
                                        <span
                                            className="ml-2 text-sm text-gray-500">({day.exercises.length})</span>
                                    </div>
                                    {isExpanded(day.id, 'exercises') ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400"/>) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400"/>)}
                                </button>
                                {isExpanded(day.id, 'exercises') && (<div className="px-4 pb-4">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-2 font-medium text-gray-700">Exercise</th>
                                                <th className="text-center py-2 font-medium text-gray-700">Sets</th>
                                                <th className="text-center py-2 font-medium text-gray-700">Reps</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {day.exercises.map((exercise) => (<tr key={exercise.id}
                                                                                  className="border-b border-gray-100 last:border-b-0">
                                                <td className="py-3">
                                                    <div>
                                                        <div
                                                            className="font-medium text-gray-900">{exercise.name}</div>
                                                        {exercise.weight && (<div
                                                            className="text-xs text-gray-500">{exercise.weight}</div>)}
                                                    </div>
                                                </td>
                                                <td className="text-center py-3 font-medium text-gray-700">{exercise.sets}</td>
                                                <td className="text-center py-3 font-medium text-gray-700">{exercise.reps}</td>
                                            </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>)}
                            </div>)}

                        {/* Cool-down Section */}
                        {day.coolDown && day.coolDown.length > 0 && (
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleSection(day.id, 'cooldown')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex items-center">
                                        <Heart className="w-5 h-5 text-green-600 mr-3"/>
                                        <span className="font-medium text-gray-900">Cool-down</span>
                                    </div>
                                    {isExpanded(day.id, 'cooldown') ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400"/>) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400"/>)}
                                </button>
                                {isExpanded(day.id, 'cooldown') && (<div className="px-4 pb-4">
                                    <ul className="space-y-2">
                                        {day.coolDown.map((cooldown, index) => (
                                            <li key={index} className="flex items-start">
                                                                <span
                                                                    className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                <span
                                                    className="text-gray-700 text-sm">{cooldown}</span>
                                            </li>))}
                                    </ul>
                                </div>)}
                            </div>)}
                    </div>)}
                </div>))}
            </div>)}

        {/* Empty State Message */}
        {!state.showForm && state.weeklyPlan.length === 0 && !state.loading && !state.initialLoading && (
            <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4"/>
                <p className="text-gray-500">No workout plan found. Please generate a new workout plan.</p>
                <button
                    onClick={resetForm}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                    Create Workout Plan
                </button>
            </div>)}
    </div>);
}

export default Workouts;
