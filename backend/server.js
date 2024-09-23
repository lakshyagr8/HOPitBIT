import cors from 'cors';
import 'dotenv/config';
import express from "express";
import connectCloudinary from "./src/config/cloudinary.js";
import connectDB from "./src/config/mongodb.js";
import albumRouter from "./src/routes/albumRoute.js";
import songRouter from "./src/routes/songRoute.js";

// app config
const app = express()
const port = process.env.PORT || 5173
connectCloudinary()
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

// Initializing Routers
app.use("/api/song", songRouter )
app.use("/api/album", albumRouter )

app.get("/", (req, res) => res.send("API Working"))

app.listen(port, () => console.log(`Server started on ${port}`))



// lwlnnFn0GTKQWXIN