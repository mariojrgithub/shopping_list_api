const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

// Body parser
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
