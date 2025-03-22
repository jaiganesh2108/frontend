import React, { useState } from "react";
import ViewCredential from "./ViewCredential";
import UploadCredential from "./UploadCredential";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <>
      
      <Navbar />

      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">🎓 EduChain Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage and secure your academic credentials with ease.
          </p>
        </header>

        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "view" ? "active" : ""}`}
            onClick={() => setActiveTab("view")}
          >
            <span className="icon">
              <i className="fas fa-eye" aria-hidden="true"></i>
            </span>
            View Credentials
          </button>

          <button
            className={`tab-button ${activeTab === "upload" ? "active" : ""}`}
            onClick={() => setActiveTab("upload")}
          >
            <span className="icon">
              <i className="fas fa-upload" aria-hidden="true"></i>
            </span>
            Upload Credential
          </button>
        </div>
        
        <div className="tab-content fade-in">
          {activeTab === "view" ? <ViewCredential /> : <UploadCredential />}
        </div>
      </div>
    </>
  );
}
