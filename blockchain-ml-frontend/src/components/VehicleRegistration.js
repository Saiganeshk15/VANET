import { useState } from "react";
import axios from "axios";

const VehicleRegistration = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [owner, setOwner] = useState("");

  const registerVehicle = async () => {
    try {
      await axios.post("/api/register", { vehicleId, owner });
      alert("Vehicle registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">Register Vehicle</h2>
      <input type="text" placeholder="Vehicle ID" className="p-2 border" onChange={(e) => setVehicleId(e.target.value)} />
      <input type="text" placeholder="Owner" className="p-2 border" onChange={(e) => setOwner(e.target.value)} />
      <button className="p-2 bg-blue-500 text-white" onClick={registerVehicle}>Register</button>
    </div>
  );
};

export default VehicleRegistration;