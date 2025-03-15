import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ToyIndex } from './pages/ToyIndex';
import './styles/global.scss';
import { ToyDetails } from './pages/toyDetails';
import { ToyEdit } from './pages/ToyEdit';
import { useOnlineStatus } from './hooks/useOnlineStatus';


const mockUser = {name:"slava vasin"};
function App() {

    const isOnline = useOnlineStatus(); /* get user status */
    


    return (
        <div>
            {isOnline && <p>Welcome, {mockUser.name}</p>}
            {!isOnline && <p>⚠ You are offline!</p>}
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/toys" element={<ToyIndex />} />
                <Route path="/toy/:toyId" element={<ToyDetails />} />
                <Route path="/toy/edit/:toyId?" element={<ToyEdit />} /> 

            </Routes>
        </Router>
        </div>
    );
}

export default App;
