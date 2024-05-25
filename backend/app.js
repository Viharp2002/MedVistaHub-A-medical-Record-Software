require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use("/files", express.static(path.join(__dirname, "./files")));

const router = require("./src/routers/route");

app.use(cors());
app.use(express.json());

require("./src/conn/conn");

const port = process.env.PORT || 3605;

app.use(router)

app.listen(port, () => {
    console.log("Running on: ",port);
})