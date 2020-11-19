const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://nakseono:Love!3254@wherewego.zltd5.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World test1"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
