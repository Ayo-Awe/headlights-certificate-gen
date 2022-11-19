const { readCSV, handleAsync } = require("./helpers");

const handelePostCertificates = handleAsync(async (req, res) => {
  // Invalid file type
  if (req.file?.mimetype != "text/csv")
    return res.status(400).json({ error: "Invalid file type", success: false });

  const { organisationName, companyLogo } = req.body;

  // Bad requrest
  if (!organisationName || !companyLogo)
    return res.status(400).json({
      error: "organisationName and companyLogo are required",
      sucess: false,
    });

  // Read csv file
  const csv = await readCSV(req.file.path);

  // Append org name and logo to each certificate
  const certificates = csv.map((row) => {
    return { ...row, organisationName, companyLogo };
  });

  res.status(200).json({
    certificates,
    totalCertificates: certificates.length,
    success: true,
  });
});

module.exports = { handelePostCertificates };
