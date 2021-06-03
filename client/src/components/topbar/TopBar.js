import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./topbar.css"
const TopBar = () => {
    const {user, dispatch} = useContext(Context);
    const handleLogout = () => {
        dispatch({type:"LOGOUT"})
    };
  const PF = "http://localhost:5000/images/"

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">home</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/about" className="link">about</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/contact" className="link">contact</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">write</Link>   
                    </li>
                    <li onClick={handleLogout} className="topListItem">
                        {user && "logout"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <Link to="/settings">
                        <img className="topImg" src={PF + user.profilePic} alt="" />
                        </Link>

                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">login</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">register</Link>
                            </li>
                        </ul>
                    )
                }
                        <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}

export default TopBar
