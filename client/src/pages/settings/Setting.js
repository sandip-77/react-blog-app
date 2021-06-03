import axios from 'axios';
import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';
import "./setting.css";

const Setting = () => {
  const { user,dispatch } = useContext(Context);
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const upadatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      upadatedUser.profilePic = filename;
      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err);
      }
    }
    try{
     const res = await axios.put("/user/"+ user._id, upadatedUser);
      setSuccess(true);
    dispatch({type: "UPDATE_SUCCESS", payload: res.data})

    }catch(err){
      dispatch({type: "UPDATE_FAILURE"})

    }
  }
  

    return (
        <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input required type="text" placeholder={user.username} name="name" onChange={(e) => setUsername(e.target.value)}/>
          <label>Email</label>
          <input required type="email" placeholder={user.email} name="email" onChange={(e) => setEmail(e.target.value)}/>
          <label>Password</label>
          <input required type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color:"green", textAlign:"center", marginTop:10}}>Profile has been updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
    )
}

export default Setting
