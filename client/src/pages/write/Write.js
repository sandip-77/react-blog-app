import React, { useContext, useRef, useState } from 'react';
import "./write.css";
import axios from "axios";
import { Context } from '../../context/Context';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Write = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState("")
  const { user } =useContext(Context);
  const classes = useStyles();
  const [cat, setCat] = useState('');
  const category = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      catagories: [cat]
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename;
      try{
        await axios.post("/upload", data)
      }catch(err){
        console.log(err);
      }
    };

    try{
     const res =  await axios.post("/posts", newPost  );
     console.log(res);
     window.location.replace("/post/" + res.data._id)
    }catch(err){
      console.log(err);
    };

    


  }

  console.log(cat);


    return (
        <div className="write">
        {
          file && 
      <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />
        }
      <form className="writeForm" onSubmit={handleSubmit} >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
          <input
            required
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cat}
            ref={category}
            onChange={(i) => setCat(i.target.value)}
            >
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="Fitness">Fitness</MenuItem>
            <MenuItem value="Tech">Tech</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Gaming">Gaming</MenuItem>
            <MenuItem value="Movie">Movie</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            <MenuItem value="News">News</MenuItem>
          </Select>
        </FormControl>
          <CKEditor
                    required
                    className="writeInput writeText"
                    editor={ ClassicEditor }
                    data="<p>Tell your story</p>"
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
        </div>
        <button type="submit" className="writeSubmit" >
          Publish
        </button>
      </form>
    </div>
    )
}

export default Write
