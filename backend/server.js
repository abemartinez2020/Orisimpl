const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const router = require("./routes/postRoutes");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", router);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
