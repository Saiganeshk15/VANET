import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { fetchBlockchainRecords } from "../utils/api";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await fetchBlockchainRecords();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    loadRecords();
  }, []);

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Malicious Messages Records
        </Typography>
        <List>
          {records.length > 0 ? (
            records.map((record, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Message: ${record.message}`} secondary={`Vehicle: ${record.vehicle}`} />
              </ListItem>
            ))
          ) : (
            <Typography>No malicious messages found.</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecordsPage;
