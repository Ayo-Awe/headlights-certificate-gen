const { readCSV, handleAsync, formatError } = require("./helpers");
const { postCertificateSchema } = require("./validators");

const handelePostCertificates = handleAsync(async (req, res) => {
  const { organisationName, companyLogo } = req.body;

  // Define validation scehma
  const schema = postCertificateSchema;

  // Validate schema
  const { error } = schema.validate({
    organisationName,
    companyLogo,
    file: req.file,
  });

  if (error) return res.status(400).json(formatError(error.message));

  // Read csv file
  const csv = await readCSV(req.file.path);

  // Append org name and logo to each certificate
  const certificates = csv.map(({ firstname, lastname, studentId }) => {
    return { firstname, lastname, studentId, organisationName, companyLogo };
  });

  res.status(200).json({
    certificates,
    totalCertificates: certificates.length,
    success: true,
  });
});

module.exports = { handelePostCertificates };
