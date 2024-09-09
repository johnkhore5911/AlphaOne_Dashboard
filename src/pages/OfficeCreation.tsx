import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import axios from "axios"; // For API requests
import AdminSidebar from "../components/AdminSidebar";
import './styles/OficeCreation.scss';
import { useNavigate } from "react-router-dom";

const LocationMarker = ({ setOffice }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setOffice(prevOffice => ({
        ...prevOffice,
        latitude: e.latlng.lat.toString(),
        longitude: e.latlng.lng.toString(),
      }));
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const OfficeCreation = () => {
  const [office, setOffice] = useState({
    name: "",
    Address:"",
    distance: "",
    latitude: "",
    longitude: "",
  });

  const navigate = useNavigate();

  const handleCreation = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://alpha-one-server.vercel.app/api/office/createOffice',
        {
          name: office.name,
          Address:office.Address,
          distance: office.distance,
          latitude: office.latitude,
          longitude: office.longitude,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      .then((response) => {
        console.log('Office created:', response.data);
        navigate('/dept-creation', { state: { officeName: office.name } });
      })
      .catch((error) => {
        console.error('Error creating office:', error.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffice({
      ...office,
      [name]: value,
    });
  };

  return (
    <div className="AdminContainer">
      <AdminSidebar />
      <main>
        <h2>Create New Office</h2>
        
        <div className="map-section">
          <MapContainer center={[30.7526,76.760]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker setOffice={setOffice} />
          </MapContainer>
        </div>

        <form onSubmit={handleCreation}>
          <div>
            <label>Office Name:</label>
            <input
              type="text"
              name="name"
              value={office.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Office Address:</label>
            <input
              type="text"
              name="Address"
              value={office.Address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Office Radius (in meters):</label>
            <input
              type="number"
              name="distance"
              value={office.distance}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={office.latitude}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <div>
            <label>Longitude:</label>
            <input
              type="text"
              name="longitude"
              value={office.longitude}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <button type="submit">Create Office</button>
        </form>
      </main>
    </div>
  );
};

export default OfficeCreation;