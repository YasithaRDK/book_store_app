import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

//Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware for handling CORS POLICY
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  })
);

app.use("/api/books", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
