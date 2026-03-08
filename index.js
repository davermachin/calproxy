const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use((req, res, next) => {
  // Allow all origins (for testing; you can restrict to your site later)
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow necessary HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  // Allow headers the browser may send
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.get("/fetch-ics", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url parameter");

  try {
    const response = await axios.get(url, { responseType: "text" });

    // Set content type to ICS
    res.setHeader("Content-Type", "text/calendar");

    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});