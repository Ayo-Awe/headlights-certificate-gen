const csvParser = require("csv-parser");
const { createReadStream } = require("fs");

// Read a CSV in a promisified manner
const readCSV = (filePath) =>
  new Promise((resolve, reject) => {
    if (!filePath) throw Error("file path is required");

    const results = [];

    // Create new read stream to read file
    const stream = createReadStream(filePath);

    // Pipe the read stream into the csvParser
    stream
      .pipe(csvParser())
      // Add new row to results
      .on("data", (data) => results.push(data))
      // Resolve the promise on success
      .on("end", () => resolve(results))
      // Reject the promise of error
      .on("error", (error) => reject(error));
  });

const handleAsync = (callback) => {
  return async (req, res, next) => {
    try {
      callback(req, res, next);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  };
};

const formatError = (errorMessage) => {
  return { error: errorMessage, success: false };
};

module.exports = { readCSV, handleAsync, formatError };
