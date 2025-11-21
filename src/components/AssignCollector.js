import { useState } from "react";
import { assignCollector } from "../utils/contract";

const AssignCollector = () => {
  const [collectorAddress, setCollectorAddress] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleAssign = async () => {
    if (!collectorAddress) {
      alert("Please enter a valid address.");
      return;
    }

    setLoading(true);
    const success = await assignCollector(collectorAddress);
    setLoading(false);

    if (success) {
      alert(`✅ Collector ${collectorAddress} assigned successfully!`);
      setCollectorAddress("");
    } else {
      alert("❌ Failed to assign collector. Check MetaMask and contract.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Assign Waste Collector</h2>
      
      <input
        type="text"
        placeholder="Enter collector address"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={collectorAddress}
        onChange={(e) => setCollectorAddress(e.target.value)}
      />
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleAssign}
        disabled={loading}
      >
        {loading ? "Assigning..." : "Assign Collector"}
      </button>
    </div>
  );
};

export default AssignCollector;
