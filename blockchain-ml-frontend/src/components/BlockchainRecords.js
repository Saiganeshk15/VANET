import { useState, useEffect } from "react";
import { contract } from "../web3";

const BlockchainRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const count = await contract.methods.getMaliciousCount().call();
      let data = [];
      for (let i = 0; i < count; i++) {
        const entry = await contract.methods.maliciousMessages(i).call();
        data.push(entry);
      }
      setRecords(data);
    };
    fetchRecords();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">Malicious Records</h2>
      {records.map((record, idx) => (
        <div key={idx} className="p-2 border mt-2">
          <p><strong>Message:</strong> {record.message}</p>
          <p><strong>Blocked User:</strong> {record.user}</p>
        </div>
      ))}
    </div>
  );
};

export default BlockchainRecords;
