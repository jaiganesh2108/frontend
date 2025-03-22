import React, { useState } from "react";
import "../styles/UploadCredential.css";

export default function UploadCredential() {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const handleUpload = async () => {
    if (!file || !studentName || !rollNo || !dob || !academicYear) {
      alert("Please fill in all fields and choose a file.");
      return;
    }

    try {
      // Convert file to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Generate SHA-256 hash
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

      console.log("Generated File Hash:", hashHex);

      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("studentName", studentName);
      formData.append("rollNo", rollNo);
      formData.append("dob", dob);
      formData.append("academicYear", academicYear);
      formData.append("fileHash", hashHex); // Send hash to backend/blockchain

      // Simulate Upload
      alert(`✅ File hash generated:\n${hashHex}\n\nUpload successful (mock)`);

      // Reset form
      setFile(null);
      setStudentName("");
      setRollNo("");
      setDob("");
      setAcademicYear("");
    } catch (error) {
      console.error("Error generating hash or uploading:", error);
      alert("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Student Credential</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="upload-input"
      />

      <input
        type="text"
        placeholder="Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        className="upload-input"
      />

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="upload-input"
      />

      <input
        type="text"
        placeholder="Academic Year (e.g. 2023-2024)"
        value={academicYear}
        onChange={(e) => setAcademicYear(e.target.value)}
        className="upload-input"
      />

      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />

      <label htmlFor="fileInput" className="gradient-button choose-file">
        {file ? file.name : "Choose File"}
      </label>

      <button onClick={handleUpload} className="gradient-button">
        Upload
      </button>
    </div>
  );
}
