import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import "./login.css"


const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const {  dispatch, isFetching } = useContext(Context);

    const handelSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try{
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"})
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handelSubmit}>
                <label>Username</label>
                <input className="loginInput" type="text" ref={userRef} placeholder="Enter your username..." />
                <label>Password</label>
                <input className="loginInput" type="password" ref={passwordRef} placeholder="Enter your password..." />
                <button type="submit" className="loginButton">{isFetching ? <CircularProgress style={{color :"white", height:20, width:20}}/> : "Login"}</button>
                
            </form>
           
                <Link className='link' to="register">
                    <button className="loginRegisterButton">Register</button>
                </Link>
            
        </div>
    )
}

export default Login
