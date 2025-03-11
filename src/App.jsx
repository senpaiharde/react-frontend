import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ToyPage } from './pages/ToyPage';
import './styles/gobal.css';
import { ToyDetails } from './pages/toyDetails';
import { ToyEdit } from './pages/ToyEdit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/toys" element={<ToyPage />} />
                <Route path="/toy/:toyId" element={<ToyDetails />} />
                <Route path="/toy/edit/:toyId?" element={<ToyEdit />} /> 

            </Routes>
        </Router>
    );
}

export default App;
