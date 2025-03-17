import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../store/authSlice";




export function Signup() {
    const [formData, setFormData] = useState({username:'', password:'', fullname:''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, isLoading} = useSelector(state => state.auth)


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(formData)).then((res) => {
            if(!res.error)navigate('/login')
        });
    };

    return(
        <div className="signup">
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" 
                name="fullname" 
                placeholder="Full Name" onChange={handleChange} required/>
                <input type="text" 
                name="username" 
                placeholder="usermame" onChange={handleChange} required/>
                <input type="password" 
                name="password" 
                placeholder="password" onChange={handleChange} required/>
                <button type="submit" disabled={isLoading}>Submit</button>
                <Link to='/login' >
                <p>Have User?</p>
                <button>Login</button></Link>
            </form>
        </div>
    )
}