import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import noteRoutes from "./src/routes/note.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

await connectDB();

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});