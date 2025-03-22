import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ViewCredential.css"; // Import CSS for styling

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ViewCredential() {
  const [credentials, setCredentials] = useState([]);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [formData, setFormData] = useState({
    studentName: "",
    registerNo: "",
    dob: "",
    course: "",
    hashValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyCredential = (credential) => {
    const validCredential = {
      studentName: "Alice",
      registerNo: "REG202301",
      dob: "2000-05-15",
      course: "B.Sc Computer Science",
      hashValue: "ABC123HASH",
    };

    return (
      credential.studentName === validCredential.studentName &&
      credential.registerNo === validCredential.registerNo &&
      credential.dob === validCredential.dob &&
      credential.course === validCredential.course &&
      credential.hashValue === validCredential.hashValue
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCredential = {
      id: Date.now(),
      ...formData,
    };

    if (verifyCredential(newCredential)) {
      setCredentials((prev) => [...prev, newCredential]);
      setVerificationMessage("");
      setFormData({
        studentName: "",
        registerNo: "",
        dob: "",
        course: "",
        hashValue: "",
      });
    } else {
      setVerificationMessage("No match found!");
    }
  };

  return (
    <motion.div
      className="view-credential-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="section-title" variants={itemVariants}>
        Verify Credential
      </motion.h2>

      <motion.form
        className="credential-form"
        onSubmit={handleSubmit}
        variants={itemVariants}
      >
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="registerNo">Register Number</label>
          <input
            type="text"
            id="registerNo"
            name="registerNo"
            value={formData.registerNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hashValue">Hash Value</label>
          <input
            type="text"
            id="hashValue"
            name="hashValue"
            value={formData.hashValue}
            onChange={handleChange}
            required
          />
        </div>

        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          Submit Credential
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {verificationMessage && (
          <motion.p
            className="verification-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {verificationMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.h2 className="section-title" variants={itemVariants}>
        Submitted Credentials
      </motion.h2>

      <div className="credentials-list">
        <AnimatePresence>
          {credentials.length > 0 ? (
            credentials.map((cred) => (
              <motion.div
                key={cred.id}
                className="credential-card"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p><strong>Name:</strong> {cred.studentName}</p>
                <p><strong>Register No:</strong> {cred.registerNo}</p>
                <p><strong>DOB:</strong> {cred.dob}</p>
                <p><strong>Course:</strong> {cred.course}</p>
                <p><strong>Hash Value:</strong> {cred.hashValue}</p>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="no-credentials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No credentials submitted yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}