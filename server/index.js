import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import authRouter from "./routes/auth.js";
import authorsRouter from "./routes/authors.js";
import categoriesRouter from "./routes/categories.js";
import booksRouter from "./routes/books.js";
import profileRouter from "./routes/profile.js";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Роутери
app.use("/auth", authRouter);
app.use("/authors", authorsRouter);
app.use("/categories", categoriesRouter);
app.use("/books", booksRouter);
app.use("/profile", profileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));