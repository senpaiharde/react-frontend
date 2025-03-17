import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toyService";
import { addToyAsync, updateToyAsync } from "../store/toySlice";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";
import PropTypes from "prop-types";



export function ToyEdit() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [toy, setToy] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    useUnsavedChanges(isDirty);

    useEffect(()=>{
        const fetchToy = async() => {
            if(toyId) {
                const existingToy = await toyService.getToyById(toyId);
                if(existingToy){
                    setToy(existingToy);
                }else{
                    alert("Toy not Found!");
                    navigate('/toys')
                }
            }else{
                setToy({name:'', price:'', labels:[], inStock:true});
            }
            setIsLoading(false);
        };
        fetchToy();
    },[toyId, navigate])
      

    const handleChange = e => {
        const {name, value} = e.target;
        setToy(prevToy => ({...prevToy, [name]: value}));
        setIsDirty(true);
    };

     const handleCheckBoxChange = e => {
        setToy(prevToy => ({...prevToy, inStock: e.target.checked}))
        setIsDirty(true);
    };

    const handleLabelsChange = e => {
        const selectedLabels = Array.from(e.target.selectedOptions, option => option.value)
        setToy(prevToy => ({...prevToy, labels: selectedLabels}));
        setIsDirty(true);
    }


    const handleSubmit = async e => {
        e.preventDefault();
        try{
            if(!toy.imgUrl){
                toy.imgUrl = "https://placehold.co/100x100";
            }
            if(toy._id){
                dispatch(updateToyAsync(toy));
            } else{
                dispatch(addToyAsync(toy));
            }
            setIsDirty(false);
            navigate('/toys');
        }catch(error){
            alert("error saving Toy:"+ error.meesage);
        }
    };

    if(isLoading)return<p>Loading...</p>

   return(<div className="toy-edit">
    <h1 className="toy-edit__title">{toyId ? 'edit Toy' : 'Create Toy'}</h1>
       {isDirty && <p className="unsaved-warning">⚠ You have unsaved changes!</p>}


    <form className="toy-edit__form" onSubmit={handleSubmit}>
        <label className="toy-edit__label">Name:</label>
        <input type="text" 
        name="name" 
        value={toy.name} 
        onChange={handleChange} required
        className="toy-edit__input"/>

        <label className="toy-edit__label">Price:</label>
        <input type="number" 
        name="price" 
        value={toy.price} 
        onChange={handleChange} required
        className="toy-edit__input"/>

        <label className="toy-edit__label">Labels:</label>
        <select multiple value={toy.labels}
         className="toy-edit__select" 
        onChange={handleLabelsChange}>
            {toyService.getLabels().map(label => (
                <option key={label} value={label} >{label}</option>
            ))}
        </select>

        <label className="toy-edit__label">In Stock:</label>
        <input type="checkbox" 
        checked={toy.inStock} 
        onChange={handleCheckBoxChange}
        className="toy-edit__checkbox"/>

        <button type="submit" className="btn save-btn">💾 Save</button>
        <button type="button" onClick={() => navigate('/toys')} 
        className="btn cancel-btn">❌ Cancel</button>
    </form>
   </div>
   )
}

ToyEdit.propTypes = {
    toyId: PropTypes.string,
};