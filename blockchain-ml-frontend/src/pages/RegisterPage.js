import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import { registerVehicle } from "../utils/api";

const RegisterPage = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [owner, setOwner] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!vehicleId || !owner) {
      alert("Please enter both Vehicle ID and Owner Name.");
      return;
    }


    try {
      const res = await registerVehicle(vehicleId, owner);
        console.log(res);
      if (res.success) {
        // ✅ Store only vehicleId in localStorage
        localStorage.setItem("vehicleId", vehicleId);
        navigate("/");
      }
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  useEffect(() => {
    const storedVehicleId = localStorage.getItem("vehicleId");
    if (storedVehicleId) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Vehicle Registration
        </Typography>
        <TextField
          fullWidth
          label="Vehicle ID"
          variant="outlined"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Owner Name"
          variant="outlined"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
