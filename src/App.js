import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { ToyPage } from './pages/ToyPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/toys' element={<ToyPage/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
