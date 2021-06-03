import axios  from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./register.css";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    

    const handelSubmit = async(e) => {
        e.preventDefault();
        setError(false);
        try{
            const res = await axios.post("/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login")
        } catch(err){
            setError(true);
        }
    } 
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handelSubmit}>
                <label>Username</label>
                <input 
                    required
                    onChange={e => setUsername(e.target.value)} 
                    className="registerInput" 
                    type="text"
                    placeholder="Enter your username..." 
                 />
                <label>Email</label>
                <input
                    required
                    onChange={e => setEmail(e.target.value)} 
                    className="registerInput" 
                    type="email" 
                    placeholder="Enter your email..." 
                />
                <label>Password</label>
                <input 
                    required
                    onChange={e => setPassword(e.target.value)} 
                    className="registerInput" type="password" 
                    placeholder="Enter your password..." 
                />
                <button type="submit" className="registerButton">Register</button>
            </form>
                <Link className="link" to="/login">
                    <button className="registerLoginButton"> Login</button>
                </Link>
                {error && <>
                    <span className="error">Something went wrong!!</span><span className="error"> (Username or email is/are already in use)</span>
                        </>}
            
    </div>
    )
}

export default Register
