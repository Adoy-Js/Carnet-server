require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./app/router");

const app = express();
app.use(cors());
const port = process.env.PORT;

app.use(express.json());

//on va pouvoir utiliser le req.body via urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});