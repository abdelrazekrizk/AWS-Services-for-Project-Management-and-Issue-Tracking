import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<div>Welcome to the App</div>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;