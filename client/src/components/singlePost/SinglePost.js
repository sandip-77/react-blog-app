import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './singlePost.css';
import ReactHtmlParser from 'react-html-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const SinglePost = () => {
    const PF = "http://localhost:5000/images/"

    const { user } = useContext(Context);
    const location = useLocation();
    const path = (location.pathname.split("/")[2]);
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            const res = await axios.get("/posts/"+ path );
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPosts();
    },[path]);

    const handleDelete = async  () => {
        try{
            await axios.delete(`/posts/${path}` , {data : {username: user.username}})
            console.log('run');
            window.location.reload();
            window.location.replace("/");
        }catch(err){
            console.log(err);
        }
    };

    const handleUpdate = async() => {
        try{
            await axios.put(`/posts/${path}` , {username: user.username, title, desc})
            console.log('run');
            setUpdateMode(false);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
            {
                post.photo && (
                    <img className="singlePostImg" src={ PF + post.photo} alt="post" />
                )
            }
            {updateMode ? (
                <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} className="singlePostTitleInput"/>
            ) : (
                <h1 className="singlePostTitle">{title}
                {post.username === user?.username && (
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                )}
                </h1>
            )}
                
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                         <b className="singlePostAuthor">{post.username}  </b>
                        </Link>
                    </span>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                    {updateMode ? (
                        <CKEditor
                            autoFocus
                            editor={ ClassicEditor }
                            data={desc}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log(data);
                                setDesc(data);
                            } }
                        />

                    ) : (<div className="singlePostDesc">{ReactHtmlParser(desc)}</div> )
                    }
                    {updateMode && <button onClick={handleUpdate} className="singlePostButton">Update</button> }
                    

            </div>
        </div>
    )
}

export default SinglePost;
