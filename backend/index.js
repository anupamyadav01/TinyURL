import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./router/urlRoutes.js";
import mongoose from "mongoose";
// import { urlModel } from "./model/urlModel.js";
const app = express();

const portNo = process.env.PORT_NO || 8080;
dotenv.config();

// connecting to database
(async () => {
  try {
    const database = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    if (database) console.log("Connected to database successfully!!");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
})();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", router);
app.listen(portNo, () => {
  console.log(`Server is running at http://localhost:${portNo}`);
});
