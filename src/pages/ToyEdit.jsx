import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toyService";
import { addToy, updateToy } from "../store/toySlice";




export function ToyEdit() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [toy, setToy] = useState(
        toyId ? toyService.getToyById(toyId) : {name:'', price:'', labels:[], inStock:true}
    );

    useEffect(() => {
        if(toyId) {
            const fetchToy = async () =>  {
                const existingToy = await toyService.getToyById(toyId);
                if(existingToy) setToy(existingToy);
            };
            fetchToy();
        }
    }, [toyId]);

    const handleChange = e => {
        const {name, value} = e.target;
        setToy(prevToy => ({...prevToy, [name]: value}))
    };

     const handleCheckBoxChange = e => {
        setToy(prevToy => ({...prevToy, inStock: e.target.checked}))
    };

    const handleLabelsChange = e => {
        const selectedLabels = Array.from(e.target.selectedOptions, option => option.value)
        setToy(prevToy => ({...prevToy, labels: selectedLabels}));
    }


    const hanldeSubmit = async e => {
        e.preventDefault();
        if(toy._id){
            const updatedToy = await toyService.saveToy(toy);
            dispatch(updateToy(updatedToy));
        }else{
            const newToy = await toyService.saveToy(toy);
            dispatch(addToy(newToy));
        }
        navigate('/toys');
    };

   return(<div className="toy-edit">
    <h1>{toyId ? 'edit Toy' : 'Create Toy'}</h1>
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