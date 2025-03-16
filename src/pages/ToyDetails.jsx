import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toyService } from "../services/toyService";
import { NicePopup } from "../components/nicePopup";
import { Chat } from "../components/chat";
import { fetchToys } from "../store/toySlice";
import PropTypes from "prop-types";

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
    },[selectedToy, dispatch]);
    
    if(!selectedToy) return (<h2 className="toy-not-found">❌ Toy Not Found </h2>);

    return (
        <div className="toy-details">
            <h1 className="toy-details__title">{selectedToy.name}</h1>
            <img className="toy-details__image"
            src={selectedToy.imgUrl || "https://placehold.co/100x100"} alt={selectedToy.name}
            onError={(e) => e.target.src = "https://placehold.co/100x100"}  />

            <p className="toy-details__price"><strong>Price:</strong>{selectedToy.price}</p>
            <p className="toy-details__labels"><strong>Labels:</strong>{selectedToy.labels?.join(', ') || 'No Labels'}</p>
            <p className="toy-details__created"><strong>Created At:</strong>{new Date(selectedToy.createdAt).toLocaleDateString()}</p>
            <p className={`toy-details__status ${selectedToy.inStock ? 'in-stock' : 'out-stuck'}`}>
                <strong>Status:</strong>{selectedToy.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>
            <div className="toy-details__actions">
            <button className="btn back-btn" onClick={() => navigate(-1)}>🔙 Go Back</button>
            <button className="btn edit-btn" onClick={() => navigate(`/toy/edit/${selectedToy._id}`)}>✏️ Edit</button>
            <button className="btn chat-btn" onClick={()=> setIsChatOpen(true)}>💬 Chat</button>
            </div>

            <NicePopup isOpen={isChatOpen} 
            onClose={()=> setIsChatOpen(false)}
            header="Chat with Support"
            footer={<button onClick={()=> setIsChatOpen(false)}>close</button>}>
                <Chat/>
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