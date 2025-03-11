import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toyService } from "../services/toyService";
import { NicePopup } from "../components/nicePopup";
import { Chat } from "../components/chat";


export function ToyDetails() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false);

    const selectedToy = useSelector(state => state.toy.toys.find(toy => toy._id === toyId)) || toyService.getToyById(toyId);

    if(!selectedToy) return (<h2>❌ Toy Not Found </h2>);

    return (
        <div className="toy-details">
            <h1>{selectedToy.name}</h1>
            <img src={selectedToy.imgUrl} alt={selectedToy.name}/>
            <p><strong>Price:</strong>{selectedToy.price}</p>
            <p><strong>Labels:</strong>{selectedToy.Labels.join(', ')}</p>
            <p><strong>Created At:</strong>{new Date(selectedToy.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong>{selectedToy.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>

            <button onClick={() => navigate(-1)}>🔙 Go Back</button>
            <button onClick={() => navigate(`/toy/edit/${selectedToy._id}`)}>✏️ Edit</button>
            <button onClick={()=> setIsChatOpen(true)}>💬 Chat</button>

            <NicePopup isOpen={isChatOpen} 
            onClose={()=> setIsChatOpen(false)}
            header="Chat with Support"
            footer={<button onClick={()=> setIsChatOpen(false)}>clase</button>}>
                <Chat/>
            </NicePopup>
        </div>
    )
}