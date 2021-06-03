import React from 'react'
import { Link } from 'react-router-dom';
import "./post.css";
import ReactHtmlParser from 'react-html-parser';

const Post = ({post}) => {

    const PF = "http://localhost:5000/images/"
    return (
        <div className="post">
            {post.photo && (
                <img className="postImg" 
                src= {PF + post.photo}
                alt="" /> 
            )}
           
           <div className="postInfo">
               <div className="postCat">
               <Link className="link" to={`/?cat=${post.catagories[0]}`}>
                <span className="postCat">{post.catagories[0]}</span>
               </Link>
               </div>
               <Link className="link" to={`/post/${post._id}`}>
                <span className="postTitle">
                    {post.title}
                </span>
               </Link>
               <hr />
               <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
           </div>
           <div className="postDesc">{ReactHtmlParser(post.desc)}</div>
        </div>
    )
}

export default Post
