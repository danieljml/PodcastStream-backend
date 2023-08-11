const express = require("express");
const cors = require("cors");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/search/:query", async (req, res) => {
  const apiKey = "BSF8RLDX4MB7XVEQKR3D";
  const apiSecret = "WVf3ENMTwZcS8d#vwxcv3tubJKwxUzxhupuyU8h3";
  const apiHeaderTime = Math.floor(Date.now() / 1000);

  const sha1Algorithm = "sha1";
  const sha1Hash = crypto.createHash(sha1Algorithm);
  const data4Hash = apiKey + apiSecret + apiHeaderTime;
  sha1Hash.update(data4Hash);
  const hash4Header = sha1Hash.digest("hex");

  const query = req.params.query;
  const url = `https://api.podcastindex.org/api/1.0/search/byterm?q=${query}&max=8`;

  const options = {
    headers: {
      "X-Auth-Date": "" + apiHeaderTime,
      "X-Auth-Key": apiKey,
      Authorization: hash4Header,
      "User-Agent": "SuperPodcastPlayer/1.8",
    },
  };

  try {
    const response = await axios.get(url, options);
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
