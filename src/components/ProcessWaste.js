import { useState } from "react";
import { processWaste } from "../utils/contract";

const ProcessWaste = () => {
  const [wasteIndex, setWasteIndex] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (wasteIndex === "") {
      alert("Please enter a valid waste index.");
      return;
    }

    setLoading(true);
    const success = await processWaste(wasteIndex);
    setLoading(false);

    if (success) {
      alert(`✅ Waste at index ${wasteIndex} processed successfully!`);
      setWasteIndex("");
    } else {
      alert("❌ Failed to process waste. Check MetaMask and contract.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Process Collected Waste</h2>
      <input
        type="number"
        placeholder="Enter waste index"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={wasteIndex}
        onChange={(e) => setWasteIndex(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleProcess}
        disabled={loading}
      >
        {loading ? "Processing..." : "Process Waste"}
      </button>
    </div>
  );
};

export default ProcessWaste;
