import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { fileURLToPath } from "url";

const app = express();

const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

//location of combines csv file
const csvFile = path.join(__dirname, "output", "combinedGHI.csv");

app.get("/api/ghi", (req, res) => {
  const data = [];

  if (!fs.existsSync(csvFile)) {
    return res.status(404).json({
      message: "Combined csv file not found",
    });
  }

  fs.createReadStream(csvFile)
    .pipe(csvParser())
    .on("data", (row) => {
      data.push({
        Date: row.Date,
        GHI: Number(row.GHI),
      });
    })
    .on("end", () => {
      res.json(data);
    })
    .on("error", (error) => {
      console.error(error);

      res.status(500).json({
        message: "Error reading GHI data",
      });
    });
});

app.listen(PORT, ()=>{
    console.log("Server running on port 5000")
})
