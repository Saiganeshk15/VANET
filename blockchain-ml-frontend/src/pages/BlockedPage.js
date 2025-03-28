import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const BlockedPage = () => {

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Your vehicle has been blocked due to malicious activity.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlockedPage;
