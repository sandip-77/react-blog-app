const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(console.log("connected to mongodb")).catch((err) => console.log(err))


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// upload image
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
});

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("file has been uploaded");
})




app.listen("5000", () => {
    console.log("backend is running at 5000")
})