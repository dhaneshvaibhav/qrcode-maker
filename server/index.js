const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const qrcode = require("qrcode");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Generate QR code route
app.post("/generate", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone number are required" });
    }

    console.log("Data received:", req.body);

    // Data to encode in the QR code
    const qrData = `Name: ${name}, Phone: ${phone}`;

    // Generate QR code as Base64 string
    const qrCodeImage = await qrcode.toDataURL(qrData);

    // Send back the QR code as response
    res.json({ qrCode: qrCodeImage });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.listen(port, () => {
  console.log("I am working, bhai, at port " + port);
});
