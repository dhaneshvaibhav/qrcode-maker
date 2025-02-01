import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back icon

const QRCodeGenerator = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [qr, setQr] = useState("");
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = async () => {
    if (phone && name) {
      try {
        const response = await axios.post("http://localhost:3000/generate", {
          name,
          phone,
        });

        setQr(response.data.qrCode);
        setShowQR(true);
      } catch (e) {
        console.error("Error generating QR Code:", e);
      }
    }
  };

  const handleBack = () => {
    setShowQR(false);
    setName(""); // Reset name input
    setPhone(""); // Reset phone input
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 text-center" style={{ width: "22rem" }}>
        {showQR ? (
          // === QR Code Display Section ===
          <div>
            {/* Back Button */}
            <button 
              className="btn btn-outline-secondary mb-3 d-flex align-items-center mx-auto" 
              onClick={handleBack}
            >
              <FaArrowLeft className="me-2" /> Back
            </button>

            {/* QR Code Image */}
            <img src={qr} alt="Generated QR Code" className="img-fluid" style={{ width: "200px", height: "200px" }} />

            {/* Name & Phone Display */}
            <h5 className="mt-3 text-secondary">Name: {name}</h5>
            <h6 className="text-muted">Phone: {phone}</h6>
          </div>
        ) : (
          // === Input Form Section ===
          <div>
            <h1 className="mb-4">Generate QR Code</h1>

            {/* Phone Input */}
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
              />
            </div>

            {/* Name Input */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <button className="btn btn-success w-100" onClick={generateQRCode}>
              Generate QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
