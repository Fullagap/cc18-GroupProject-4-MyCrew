import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import adminStore from "../../../store/admin-store";
import authStore from "../../../store/authSrore";
import userStore from "../../../store/user-store";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Map click handler component
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect({
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6),
      });
    },
  });
  return null;
}

function AttendanceManagement() {
  const { token } = authStore();
  const { createSiteLocation, editSiteLocation,deleteSiteLocation } = adminStore();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const { getSiteLocationData } = userStore();
  const [selectedLocation, setSelectedLocation] = useState({
    longitude: "",
    latitude: "",
    siteName: "",
    area: "",
    id: "",
  });
  const [location, setLocation] = useState("");
  const [editForm, setEditForm] = useState({
    longitude: "",
    latitude: "",
    siteName: "",
    area: "",
    id: "",
  });
  const [pageStatus, setPageStatus] = useState("create");
  const [form, setForm] = useState({
    longitude: "",
    latitude: "",
    siteName: "",
    area: "",
  });

  const initialState = {
    longitude: "",
    latitude: "",
    siteName: "",
    area: "",
  };

  const fetchLocationData = async () => {
    try {
      const result = await getSiteLocationData();
      setLocationData(result);
      console.log("result", result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditChange = (event) => {
    setLocation(event.target.value);
    setEditForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    handleSelectLocation(event.target.value);
  };

  const handleSelectLocation = (siteName) => {
    const location = locationData.find((loc) => loc.siteName === siteName);

    if (location) {
      setEditForm({
        area: location.area,
        latitude: location.latitude,
        longitude: location.longitude,
        siteName: location.siteName,
        id: location.id,
      });
    }
    if (location) {
      setSelectedLocation({
        area: location.area,
        latitude: location.latitude,
        longitude: location.longitude,
        siteName: location.siteName,
        id: location.id,
      });
      setSelectedPosition([location.latitude, location.longitude]);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedPosition([location.latitude, location.longitude]);
    setForm((prev) => ({
      ...prev,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  };

  const hdlOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("form", form);
  };
  const hdlOnEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("edit form", editForm);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSiteLocation(form, token);
      setForm(initialState);
      setSelectedPosition(null);
      fetchLocationData();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editSiteLocation(editForm, token);
      setEditForm(initialState);
      setSelectedPosition(null);
      fetchLocationData();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteSiteLocation(editForm, token);
      setEditForm(initialState);
      setSelectedPosition(null);
      fetchLocationData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  const renderContent = () => {
    switch (pageStatus) {
      case "create":
        return (
          <div className="flex gap-6 w-full max-w-7xl">
            {/* Form Section */}
            <form
              className="bg-white p-6 rounded shadow-md w-1/2"
              onSubmit={hdlSubmit}
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                Add New Location
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Site Name:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="siteName"
                    value={form.siteName}
                    onChange={hdlOnChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Latitude:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="latitude"
                    value={form.latitude}
                    onChange={hdlOnChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Longitude:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="longitude"
                    value={form.longitude}
                    onChange={hdlOnChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Area (meters):
                  </label>
                  <input
                    type="number"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="area"
                    value={form.area}
                    onChange={hdlOnChange}
                    placeholder="Radius in meters"
                    min="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the maximum allowed distance for clock-in/out
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="bg-[#082777] text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 transition-colors"
                    // disabled={!selectedPosition || !form.siteName || !form.area}
                  >
                    Add Location
                  </button>
                </div>
              </div>
            </form>

            {/* Map Section */}
            <div className="w-1/2 bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Click on the map to select location
              </h3>
              <div className="h-[500px] rounded overflow-hidden">
                <MapContainer
                  center={[13.7563, 100.5018]} // Bangkok coordinates
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler onLocationSelect={handleLocationSelect} />
                  {selectedPosition && (
                    <>
                      <Marker position={selectedPosition}>
                        {form.siteName && (
                          <Popup>
                            <strong>{form.siteName}</strong>
                            <br />
                            Radius: {form.area}m
                          </Popup>
                        )}
                      </Marker>
                      {form.area && (
                        <Circle
                          center={selectedPosition}
                          radius={Number(form.area)}
                          pathOptions={{
                            fillColor: "#2196F3",
                            fillOpacity: 0.2,
                            color: "#2196F3",
                            weight: 1,
                          }}
                        />
                      )}
                    </>
                  )}
                </MapContainer>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  • Click on the map to select the office location
                </p>
                <p className="text-sm text-gray-600">
                  • Enter the radius in meters to see the allowed clock-in/out
                  area
                </p>
                <p className="text-sm text-gray-600">
                  • The blue circle shows the maximum distance employees can be
                  from the location
                </p>
              </div>
            </div>
          </div>
        );
      case "delete":
        return (
          <div className="flex gap-6 w-full max-w-7xl">
            {/* Form Section */}
            <form
              className="bg-white p-6 rounded shadow-md w-1/2"
              onSubmit={hdlDeleteSubmit}
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                Delete Location Data
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    <div>
                      <label className="block text-gray-700 text-sm mb-2">
                        Select Location:
                      </label>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="siteName"
                        value={location}
                        label="location"
                        onChange={handleEditChange}
                        className="border rounded w-full  text-gray-700"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {locationData?.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.siteName}>
                              {item.siteName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  </label>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Site name:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="siteName"
                    value={editForm.siteName}
                    onChange={hdlOnEditChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Latitude:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="latitude"
                    value={editForm.latitude}
                    onChange={hdlOnEditChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Longitude:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="longitude"
                    value={editForm.longitude}
                    onChange={hdlOnEditChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Area (meters):
                  </label>
                  <input
                    disabled
                    type="number"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="area"
                    value={editForm.area}
                    onChange={hdlOnEditChange}
                    placeholder="Radius in meters"
                    min="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the maximum allowed distance for clock-in/out
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="bg-red-600 text-white font-semibold py-2 px-6 rounded hover:bg-red-500 transition-colors"
                    // disabled={!selectedPosition || !form.siteName || !form.area}
                  >
                    Delete Location
                  </button>
                </div>
              </div>
            </form>

            {/* Map Section */}
            <div className="w-1/2 bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Click on the map to select location
              </h3>
              <div className="h-[500px] rounded overflow-hidden">
                <MapContainer
                  center={[
                    selectedLocation.latitude,
                    selectedLocation.longitude,
                  ]} // Bangkok coordinates
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler onLocationSelect={handleLocationSelect} />
                  {selectedPosition && (
                    <>
                      <Marker position={selectedPosition}>
                        {editForm.siteName && (
                          <Popup>
                            <strong>{editForm.siteName}</strong>
                            <br />
                            Radius: {editForm.area}m
                          </Popup>
                        )}
                      </Marker>
                      {editForm.area && (
                        <Circle
                          center={selectedPosition}
                          radius={Number(editForm.area)}
                          pathOptions={{
                            fillColor: "#2196F3",
                            fillOpacity: 0.2,
                            color: "#2196F3",
                            weight: 1,
                          }}
                        />
                      )}
                    </>
                  )}
                </MapContainer>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  • Click on the map to select the office location
                </p>
                <p className="text-sm text-gray-600">
                  • Enter the radius in meters to see the allowed clock-in/out
                  area
                </p>
                <p className="text-sm text-gray-600">
                  • The blue circle shows the maximum distance employees can be
                  from the location
                </p>
              </div>
            </div>
          </div>
        );
      case "edit":
        return (
          <div className="flex gap-6 w-full max-w-7xl">
            {/* Form Section */}
            <form
              className="bg-white p-6 rounded shadow-md w-1/2"
              onSubmit={hdlEditSubmit}
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                Edit Location Data
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    <div>
                      <label className="block text-gray-700 text-sm mb-2">
                        Select Location:
                      </label>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="siteName"
                        value={location}
                        label="location"
                        onChange={handleEditChange}
                        className="border rounded w-full  text-gray-700"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {locationData?.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.siteName}>
                              {item.siteName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  </label>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Site name:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="siteName"
                    value={editForm.siteName}
                    onChange={hdlOnEditChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Latitude:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="latitude"
                    value={editForm.latitude}
                    onChange={hdlOnEditChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Longitude:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="longitude"
                    value={editForm.longitude}
                    onChange={hdlOnEditChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Area (meters):
                  </label>
                  <input
                    type="number"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    name="area"
                    value={editForm.area}
                    onChange={hdlOnEditChange}
                    placeholder="Radius in meters"
                    min="1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the maximum allowed distance for clock-in/out
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-500 transition-colors"
                    // disabled={!selectedPosition || !form.siteName || !form.area}
                  >
                    Edit Location
                  </button>
                </div>
              </div>
            </form>

            {/* Map Section */}
            <div className="w-1/2 bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Click on the map to select location
              </h3>
              <div className="h-[500px] rounded overflow-hidden">
                <MapContainer
                  center={[
                    selectedLocation.latitude,
                    selectedLocation.longitude,
                  ]} // Bangkok coordinates
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler onLocationSelect={handleLocationSelect} />
                  {selectedPosition && (
                    <>
                      <Marker position={selectedPosition}>
                        {editForm.siteName && (
                          <Popup>
                            <strong>{editForm.siteName}</strong>
                            <br />
                            Radius: {editForm.area}m
                          </Popup>
                        )}
                      </Marker>
                      {editForm.area && (
                        <Circle
                          center={selectedPosition}
                          radius={Number(editForm.area)}
                          pathOptions={{
                            fillColor: "#2196F3",
                            fillOpacity: 0.2,
                            color: "#2196F3",
                            weight: 1,
                          }}
                        />
                      )}
                    </>
                  )}
                </MapContainer>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  • Click on the map to select the office location
                </p>
                <p className="text-sm text-gray-600">
                  • Enter the radius in meters to see the allowed clock-in/out
                  area
                </p>
                <p className="text-sm text-gray-600">
                  • The blue circle shows the maximum distance employees can be
                  from the location
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-8">
        <div className="flex gap-5 justify-start w-full px-5 p-2">
          <button
            className={`font-semibold py-2 px-4 rounded transition-colors ${
              pageStatus === "create"
                ? "bg-[#082777] hover:bg-blue-700 text-white"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
            onClick={() => setPageStatus("create")}
          >
            Create Location
          </button>
          <button
            className={`font-semibold py-2 px-4 rounded transition-colors ${
              pageStatus === "delete"
                ? "bg-red-600 text-white"
                : "bg-red-200 text-red-600 hover:bg-red-400"
            }`}
            onClick={() => setPageStatus("delete")}
          >
            Delete Location
          </button>
          <button
            className={`font-semibold py-2 px-4 rounded transition-colors ${
              pageStatus === "edit"
                ? "bg-green-600 text-white"
                : "bg-green-200 text-green-600 hover:bg-green-400"
            }`}
            onClick={() => setPageStatus("edit")}
          >
            Edit Location
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default AttendanceManagement;
