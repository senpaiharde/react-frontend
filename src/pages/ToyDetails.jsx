import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { toyService } from "../services/toyService";
import { NicePopup } from "../components/nicePopup";
import { Chat } from "../components/chat";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";

export function ToyDetails() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    
    const {user} = useSelector((state) => state.auth)
    

    let selectedToy = useSelector(state => state.toy.toys.find(toy => toy._id === toyId)) || toyService.getToyById(toyId);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [toy, setToy] = useState(selectedToy || null);
    const [msg, setMsg] = useState('');


    useEffect(()=>{
        if(!selectedToy){
            axios.get(`http://localhost:5000/api/toys/${toyId}`)
            .then(res => setToy(res.data))
            .catch(err => console.error('error fetching toy:', err));
        }
    }, [toyId, selectedToy]);

    const hanldeSendMessage = async () => {
        if(!user){
            alert("You must be logged in to send messages!")
        }
        console.log("🔍 Sending message to toyId:", toyId);
        console.log("📦 Payload:", { txt: msg });
        console.log("🛡️ Token being sent:", user.token);
        try{
            const headers = { Authorization: `Bearer ${user.token}` };
            const res = await axios.post(
                `http://localhost:5000/api/toys/${toyId}/msg`,
                { txt:msg },
                {
                    headers
                }
            );
            console.log("✅ Message sent successfully:", res.data);
            setToy(res.data);
            setMsg('');
        }catch(err){
            console.error("❌ Error sending message:", err.response ? err.response.data : err);
        }
    };

    const handleDeleteMessage = async (msgId, event) => {
        event.stopPropagation();
        if (!user || !user.isAdmin) {
            alert("Only admins can delete messages!");
            return;
        }
    
        console.log("🗑 Deleting message:", msgId);
        try {
            const headers = { Authorization: `Bearer ${user.token}` };
            const res = await axios.delete(
                `http://localhost:5000/api/toys/${toyId}/msg/${msgId}`,
                { headers }
            );
            console.log("✅ Message deleted successfully:", res.data);
            setToy(res.data);
        }catch(err){
            console.error("❌ Error deleting message:", err.response ? err.response.data : err);
        }
    }
    
    if(!toy) return (<h2 className="toy-not-found">❌ Toy Not Found </h2>);

    return (
        <div className="toy-details">
            <h1 className="toy-details__title">{toy.name}</h1>
            <img className="toy-details__image"
            src={toy.imgUrl || "https://placehold.co/100x100"} alt={toy.name}
            onError={(e) => e.target.src = "https://placehold.co/100x100"}  />

            <p className="toy-details__price"><strong>Price:</strong>{toy.price}</p>
            <p className="toy-details__labels"><strong>Labels:</strong>{toy.labels?.join(', ') || 'No Labels'}</p>
            <p className="toy-details__created"><strong>Created At:</strong>
            {toy.createdAt ? new Date(toy.createdAt).toLocaleDateString(): "N/A"}</p>
            <p className={`toy-details__status ${toy.inStock ? 'in-stock' : 'out-stuck'}`}>
                <strong>Status:</strong>{toy.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>
            <div className="toy-details__actions">
            <button className="btn back-btn" onClick={() => navigate(-1)}>🔙 Go Back</button>
            <button className="btn edit-btn" onClick={() => navigate(`/toy/edit/${toy._id}`)}>✏️ Edit</button>
            <button className="btn chat-btn" onClick={()=> setIsChatOpen(true)}>💬 Chat</button>
            </div>
            <h3>Messages</h3>
            {toy.msgs.length === 0 
            ? (<p>No messages yet.</p>) 
            : (<ul>
                {toy.msgs.map((msg)=> (
                    <li key={msg.id}>
                        <strong>{msg.by?.fullname || "Unknown User"}:</strong>{msg.txt}
                        <div className="msg-meta">
                            <small>{moment(msg.id).format("DD/MM/YY HH:mm")}</small>
                            {user?.isAdmin && (
                                <button className="delete-btn" onClick={(event) => handleDeleteMessage(msg.id, event)}>Delete</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        )}
        {user && (
            <div>
                <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Type a message..." />
                <button onClick={hanldeSendMessage}>Send</button>
            </div>
        )}
            <NicePopup isOpen={isChatOpen} 
            onClose={()=> setIsChatOpen(false)}
            header="Chat with Support"
            footer={<button onClick={()=> setIsChatOpen(false)}>close</button>}>
                <div className="chat-support">
                    <h3>Chat with Support</h3>
                <Chat/>
                </div>
                
            </NicePopup>
        </div>
    )
}

ToyDetails.propTypes = {
    selectedToy: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imgUrl:PropTypes.string,
        price: PropTypes.number.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string),
        createdAt:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        inStock: PropTypes.bool.isRequired
    })
};