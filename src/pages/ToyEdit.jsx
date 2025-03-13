import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toyService";
import { addToy, updateToy } from "../store/toySlice";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";




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
                setToy({name:'', price:'', label:[], inStock:true});
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


    const hanldeSubmit = async e => {
        e.preventDefault();
        try{
            if(toy._id){
                const updatedToy = await toyService.saveToy(toy);
                dispatch(updateToy(updatedToy));
            } else{
                const newToy = await toyService.saveToy(toy);
                dispatch(addToy(newToy));
            }
            setIsDirty(false);
            navigate('/toys');
        }catch(error){
            alert("error saving Toy:"+ error.meesage);
        }
    };

    if(isLoading)return<p>Loading...</p>

   return(<div className="toy-edit">
    <h1>{toyId ? 'edit Toy' : 'Create Toy'}</h1>
       {isDirty && <p className="unsaved-warning">⚠ You have unsaved changes!</p>}


    <form onSubmit={hanldeSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={toy.name} onChange={handleChange} required/>

        <label>Price:</label>
        <input type="number" name="price" value={toy.price} onChange={handleChange} required/>

        <label>Name:</label>
        <select multiple value={toy.labels} onChange={handleLabelsChange}>
            {toyService.getLabels().map(label => (
                <option key={label} value={label} >{label}</option>
            ))}
        </select>

        <label>In Stock:</label>
        <input type="checkbox" value={toy.inStock} onChange={handleCheckBoxChange} required/>

        <button type="submit">💾 Save</button>
        <button type="button" onClick={() => navigate('/toys')}>❌ Cancel</button>
    </form>
   </div>
   )
}