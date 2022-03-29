require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

const router = require("./app/router");

const app = express();
app.use(cors({ credentials: true, origin: true }));
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
//on va pouvoir utiliser le req.body via urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(router);

app.listen(port, async () => {
  console.log(`Server started on http://localhost:${port}`);
  await sequelize.authenticate();
  console.log("Database connected !");
});
