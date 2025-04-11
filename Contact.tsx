import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { db } from "./firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        timestamp: Timestamp.now(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting lead: ", error);
      setStatus("error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      {status === "success" && <Alert severity="success">Submitted!</Alert>}
      {status === "error" && <Alert severity="error">Error submitting lead.</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} margin="normal" required multiline rows={4} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Submit</Button>
      </Box>
    </Container>
  );
};

export default Contact;
