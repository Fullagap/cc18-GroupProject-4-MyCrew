import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import userStore from "../../store/user-store";

const Attendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [locationDetails, setLocationDetails] = useState(null);
  const { createClockIn, response, createClockOut } = userStore();

  const handleAttendance = async (type) => {
    setLoading(true);
    setError("");
    setLocationDetails(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // API call with location data
      let apiResponse;

      if (type === "in") {
        apiResponse = await createClockIn(latitude, longitude);
      } else {
        apiResponse = await createClockOut(latitude, longitude);
      }
      console.log("api response", apiResponse);
      console.log("here is latitude", latitude, longitude);

      if (apiResponse?.data?.ok) {
        setStatus(apiResponse.data.message);
        if (apiResponse.data.location) {
          setLocationDetails({
            distance: apiResponse.data.location.distance,
            allowedRadius: apiResponse.data.location.office.radius,
          });
        }
      } else {
        setError(apiResponse?.data?.message || "Failed to record attendance");
      }
    } catch (error) {
      if (error.code === 1) {
        setError(
          "Location permission denied. Please enable location services."
        );
      } else if (error.code === 2) {
        setError("Location unavailable. Please try again.");
      } else {
        setError(
          error.response?.data?.message || "Failed to record attendance"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Attendance System
          </Typography>

          {/* Status and Error Messages */}
          <Box sx={{ my: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {status && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {status}
              </Alert>
            )}

            {locationDetails && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Distance from office: {locationDetails.distance}m
                <br />
                Maximum allowed distance: {locationDetails.allowedRadius}m
              </Alert>
            )}
          </Box>

          {/* Clock In/Out Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              "& button": { flex: 1 },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <LoginIcon />
                )
              }
              onClick={() => handleAttendance("in")}
              disabled={loading}
            >
              Clock In
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <LogoutIcon />
                )
              }
              onClick={() => handleAttendance("out")}
              disabled={loading}
            >
              Clock Out
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Attendance;
