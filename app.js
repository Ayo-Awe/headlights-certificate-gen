const express = require("express");
const os = require("os");
const app = express();
const multer = require("multer");
const { readCSV } = require("./helpers");
const upload = multer({ dest: os.tmpdir() }); // Set destination to os temporary dir e.g /tmp (Linux)

// Express Middlewares
app.use(express.json());

// File upload handler Route
app.post("/", upload.single("file"), async (req, res) => {
  // Invalid file type
  if (req.file.mimetype != "text/csv")
    return res.status(400).json({ error: "Invalid file type", success: false });

  const { organisationName, companyLogo } = req.body;

  // Read csv file
  const csv = await readCSV(req.file.path);

  // Append org name and logo to each certificate
  const certificates = csv.map((row) => {
    return { ...row, organisationName, companyLogo };
  });

  res.status(200).json({
    certificates,
    success: true,
    totalCertificates: certificates.length,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port ", port));
