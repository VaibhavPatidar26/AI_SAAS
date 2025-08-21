require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./config/connection");
const userRouter = require("./Router/userRouter");
const ImageRouter = require("./Router/ImageRouter");
const cors = require("cors");
const HistoryRouter = require("./Router/HistoryRouter");
const app = express();
const port = 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")

app.use(cors({
    origin: allowedOrigins,
    credentials:true
}))


app.use(express.json());

app.get("/", (req, res) => {
    res.send("hi");
});

app.use("/api/users", userRouter);
app.use("/api/text-to-image",ImageRouter)
app.use("/api/history",HistoryRouter)

// ✅ Connect DB
dbConnect();

// ✅ Start server
app.listen(port, "0.0.0.0",() => {
    console.log(`🚀 Server running on port ${port}`);
});
