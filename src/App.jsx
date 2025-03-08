import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ToyPage } from './pages/ToyPage';
import './styles/gobal.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/toys" element={<ToyPage />} />
            </Routes>
        </Router>
    );
}

export default App;
