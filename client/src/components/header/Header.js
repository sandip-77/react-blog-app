import React from 'react';
import "./header.css"

const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className='headerTitleSm'>React & Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>
            <img className="headerImg" src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?cs=srgb&dl=pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-1591056.jpg&fm=jpg" alt="" />
        </div>
    )
}

export default Header
