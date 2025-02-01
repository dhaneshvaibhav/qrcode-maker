const express = require("express");
const cors = require("cors");
const qrcode = require("qrcode");

const app = express();
const port = 3000;

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

// Generate QR code route
app.post("/generate", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(200).json({ error: "Name and phone number are required" });
    }

    console.log("Data received:", req.body);

    // Format the data as a vCard
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEND:VCARD`;

    // Generate QR code as Base64 string
    const qrCodeImage = await qrcode.toDataURL(vCardData);

    // Send back the QR code as response
    res.json({ qrCode: qrCodeImage });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.listen(port, () => {
  console.log(`iam on working bhAAi at ${port}`);
});
