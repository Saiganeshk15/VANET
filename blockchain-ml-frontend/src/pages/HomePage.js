import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import { storeMaliciousMessage, isUserBlocked } from "../utils/api";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [vehicleId, setVehicleId] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  // Fetch vehicle ID from localStorage on component mount
  useEffect(() => {
    const storedVehicleId = localStorage.getItem("vehicleId");
    if (!storedVehicleId ) {
      navigate("/register"); // Redirect to Register if no vehicle ID is found
    } else if (checkIsUserBlocked(storedVehicleId).isBlocked) {
        navigate("/blocked");
    }else {
      setVehicleId(storedVehicleId);
    }

  }, [navigate]);

  const checkIsUserBlocked = async (vehicleId) => {
    const blockedStatus = await isUserBlocked(vehicleId);
    return blockedStatus;
    };

    useEffect(() => {
    const checkIsUserBlocked = async () => {
      const blockedStatus = await isUserBlocked(vehicleId);
      if (blockedStatus.isBlocked) {
        navigate("/blocked");
      }
    };
    checkIsUserBlocked();
  }, [vehicleId, navigate]);

  const handleSubmit = async () => {
    if (!message) {
      alert("Please enter a message.");
      return;
    }

    try {
      // Check if vehicle is blocked before sending message
      const blockedStatus = await isUserBlocked(vehicleId);
      if (blockedStatus.isBlocked) {
        navigate("/blocked");
        return;
      }

      const res = await storeMaliciousMessage(message);
      setResponse(res);
      setMessage("");
    } catch (error) {
      alert("Failed to send message: " + error.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Send Message
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Vehicle ID: {vehicleId || "Loading..."}
        </Typography>
        <TextField
          fullWidth
          label="Enter Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>

        {response && (
          <Alert severity={response.result === "Malicious" ? "error" : "success"} sx={{ mt: 2 }}>
            {response.result === "Malicious"
              ? `Malicious Message Detected! Status: ${response.status}`
              : "Message Sent Successfully!"}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default HomePage;
