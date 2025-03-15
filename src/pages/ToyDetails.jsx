import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toyService } from "../services/toyService";
import { NicePopup } from "../components/nicePopup";
import { Chat } from "../components/chat";
import { fetchToys } from "../store/toySlice";


export function ToyDetails() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChatOpen, setIsChatOpen] = useState(false);

    let selectedToy = useSelector(state => state.toy.toys.find(toy => toy._id === toyId)) || toyService.getToyById(toyId);

    useEffect(() => {
        if(!selectedToy) {
            dispatch(fetchToys())
        }
    })

    if(!selectedToy) return (<h2>❌ Toy Not Found </h2>);

    return (
        <div className="toy-details">
            <h1>{selectedToy.name}</h1>
            <img src={selectedToy.imgUrl || "https://placehold.co/100x100"} alt={selectedToy.name}
            onError={(e) => e.target.src = "https://placehold.co/100x100"}  />

            <p><strong>Price:</strong>{selectedToy.price}</p>
            <p><strong>Labels:</strong>{selectedToy.labels?.join(', ') || 'No Labels'}</p>
            <p><strong>Created At:</strong>{new Date(selectedToy.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong>{selectedToy.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>

            <button onClick={() => navigate(-1)}>🔙 Go Back</button>
            <button onClick={() => navigate(`/toy/edit/${selectedToy._id}`)}>✏️ Edit</button>
            <button onClick={()=> setIsChatOpen(true)}>💬 Chat</button>

            <NicePopup isOpen={isChatOpen} 
            onClose={()=> setIsChatOpen(false)}
            header="Chat with Support"
            footer={<button onClick={()=> setIsChatOpen(false)}>close</button>}>
                <Chat/>
            </NicePopup>
        </div>
    )
}