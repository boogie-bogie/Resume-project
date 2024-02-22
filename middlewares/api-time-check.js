const { mode } = require("crypto-js");
const axios = require("axios");

const apiTimeCheck = (req, res, next) => {
  const start = new Date();
  console.time("api");
  next();
  res.on("finish", () => {
    const end = new Date();
    console.log("api end > ", end - start);

    if (end - start >= 3000) {
      // slack
      const requestUrl = req.originalUrl;
      const authorization = req.headers.authorization;
      axios.post("", {
        text: `URL: ${requestUrl}\nTOKEN: ${authorization}\nAPI가 너무 느려요!! > ${end - start}ms가 걸렸어요.`,
      });
    }
  });
};

module.exports = { apiTimeCheck };
