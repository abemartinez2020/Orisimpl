const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const connectDB = require("./config/db");

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
