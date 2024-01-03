import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { activity: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  const request = req.body;
  const type = request.type;
  const participants = request.participants;

  const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
  const result = response.data;
  res.render("index.ejs", { activity: result[0] });
  console.log("This is the result:", result[0])
});

  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
