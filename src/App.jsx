import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ToyIndex } from './pages/ToyIndex';
import './styles/global.scss';
import { ToyDetails } from './pages/toyDetails';
import { ToyEdit } from './pages/ToyEdit';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Header } from './components/header';
import PropTypes from 'prop-types';

const mockUser = {name:"slava vasin"};
function App() {

    const isOnline = useOnlineStatus(); /* get user status */
    


    return (
        <Router>
        
           
        
        <Header mockUser={mockUser}/>
        <div>
           <div className={`status-banner ${isOnline ? "online" : "offline"}`}>
                {isOnline ? "✅ You are online" : "⚠ You are offline"}
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/toys" element={<ToyIndex />} />
                <Route path="/toy/:toyId" element={<ToyDetails />} />
                <Route path="/toy/edit/:toyId?" element={<ToyEdit />} /> 

            </Routes>
        
        </div>
        </Router>
    );
}

export default App;

App.PropTypes = {
    mockUser: PropTypes.shape({
        name:PropTypes.string.isRequired,
    }),
};