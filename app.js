const express = require("express");
const os = require("os");
const app = express();
const multer = require("multer");
const upload = multer({ dest: os.tmpdir() }); // Set destination to os temporary dir e.g /tmp (Linux)

// Express Middlewares
app.use(express.json());

// File upload handler Route
app.post("/", upload.single("file"), (req, res) => {
  res.status(200);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port ", port));
