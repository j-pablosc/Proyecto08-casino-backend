require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

require("./app/routes")(app);

const { PORT, HOST, MONGO_URI } = process.env;
console.log(PORT, HOST, MONGO_URI);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`BD contadata en:  ${HOST}:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
