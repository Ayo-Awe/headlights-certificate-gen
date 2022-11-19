const Joi = require("joi");

const postCertificateSchema = Joi.object({
  organisationName: Joi.string().required(),
  companyLogo: Joi.string().required(),
  file: Joi.object({
    mimetype: "text/csv",
  })
    .unknown()
    .required(),
});

module.exports = {
  postCertificateSchema,
};
