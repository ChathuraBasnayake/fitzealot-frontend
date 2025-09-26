import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Workouts from "./pages/Workouts.jsx";
import Calculators from "./pages/Calculators.jsx";
import BMICalculator from "./pages/BMICalculator.jsx";
import CalorieCalculator from "./pages/CalorieCalculator.jsx";
import ProteinCalculator from "./pages/ProteinCalculator.jsx";
import DietPlan from "./pages/DietPlan.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Unauthenticated route */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />



                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/workouts" element={<Workouts />} />
                        <Route path="/" element={<Dashboard />} /> {/* Default route */}
                        <Route path="/calculators" element={<Calculators />} /> {/* Default route */}
                        <Route path="/calculators/bmi" element={<BMICalculator />} /> {/* Default route */}
                        <Route path="/calculators/calorie" element={<CalorieCalculator />} /> {/* Default route */}
                        <Route path="/calculators/protein" element={<ProteinCalculator />} /> {/* Default route */}
                        <Route path="/diet" element={<DietPlan />} /> {/* Default route */}
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;