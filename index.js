require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", require("./routes/auth.js"));
app.use("/task", require("./routes/tasks.js"));

app.listen(PORT, (req, res) => {
  console.log(`server running at port ${PORT}`);
});
