import React, { useState, useEffect } from "react";
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

//mui for select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import userStore from "../../store/user-store";
import MapComponent from "../../components/user/MapComponent";

const Attendance = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [locationDetails, setLocationDetails] = useState(null);
  const { createClockIn, createClockOut, getSiteLocationData } = userStore();
  const [locationData, setLocationData] = useState([]);
  const [location, setLocation] = useState("");
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [currentDistance, setCurrentDistance] = useState(null);

  // Get current position with continuous updates
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Unable to get your location. Please enable location services."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup function to stop watching position
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const result = await getSiteLocationData();
        setLocationData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocationData();
  }, []);

  const handleChange = (event) => {
    setLocation(event.target.value);
    setLocationDetails(null); // Reset location details when changing office
  };

  const handleDistanceChange = (distance, withinRadius, allowedRadius) => {
    setCurrentDistance(Math.round(distance));
    setIsWithinRadius(withinRadius);
    setLocationDetails({
      distance: Math.round(distance),
      allowedRadius: allowedRadius,
    });
  };

  const handleAttendance = async (type) => {
    if (!location) {
      setError("Please select an office location");
      return;
    }
    if (!isWithinRadius) {
      setError("You must be within the allowed radius to clock in/out");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { latitude, longitude } = {
        latitude: currentPosition[0],
        longitude: currentPosition[1],
      };

      // const { latitude, longitude } = position.coords;

      // API call with location data
      let apiResponse;

      if (type === "in") {
        apiResponse = await createClockIn(latitude, longitude, location);
      } else {
        apiResponse = await createClockOut(latitude, longitude, location);
      }

      if (apiResponse?.data?.ok) {
        setStatus(apiResponse.data.message);
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
      <Box sx={{ mb: 3, height: "400px" }}>
        <MapComponent
          currentPosition={currentPosition}
          officeLocations={locationData}
          selectedOfficeId={location ? Number(location) : null}
          onDistanceChange={handleDistanceChange}
        />
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom >
            <h1 className="text-center font-bold">

            Attendance System
            </h1>
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

          {/* select */}

          <FormControl sx={{ m: 1, mb: 2, minWidth: 500 }} size="small">
            <InputLabel id="demo-select-small-label">Location</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={location}
              label="location"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {locationData?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.siteName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Clock In/Out Buttons */}

          <Box sx={{ display: "flex", gap: 2, "& button": { flex: 1 } }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                loading ? <CircularProgress size={20} /> : <LoginIcon />
              }
              onClick={() => handleAttendance("in")}
              disabled={loading || !isWithinRadius || !location}
            >
              Clock In
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={
                loading ? <CircularProgress size={20} /> : <LogoutIcon />
              }
              onClick={() => handleAttendance("out")}
              disabled={loading || !isWithinRadius || !location}
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
