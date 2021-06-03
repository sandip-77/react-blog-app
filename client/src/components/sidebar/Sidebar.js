import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
const Sidebar = () => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories")
            setCats(res.data);
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://images.pexels.com/photos/594610/pexels-photo-594610.jpeg?cs=srgb&dl=pexels-martin-p%C3%A9chy-594610.jpg&fm=jpg" alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae aspernatur tenetur suscipit. Eos dolor ratione reprehenderit deleniti dolorem commodi soluta nam. Harum quidem a sunt!</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATAGORIES</span>
                <ul className='sidebarList'>
                {
                    cats.map((c) => (
                        <Link key={c._id} className="link" to={`/?cat=${c.name}`}>
                            <li  className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))
                }
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Us</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
