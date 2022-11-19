const express = require("express");
const os = require("os");
const app = express();
const multer = require("multer");
const { handelePostCertificates } = require("./app.controller");
const { formatError } = require("./helpers");

const upload = multer({ dest: os.tmpdir() }); // Set destination to os temporary dir e.g /tmp (Linux)

// Express Middlewares
app.use(express.json());

// File upload handler Route
app.post("/certificates", upload.single("file"), handelePostCertificates);

app.use((req, res) => {
  res.status(404).json(formatError("Resource Not Found"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port ", port));
