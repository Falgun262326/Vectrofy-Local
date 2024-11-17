const express = require("express");
const cors = require("cors");

const app = express();

require("./connection");

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(5000, () => {
  console.log("server started");
});
