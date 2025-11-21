import { useState } from "react";
import { reportIllegalDumping } from "../utils/contract";

const ReportDumping = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    if (!location) {
      alert("Please enter a location.");
      return;
    }

    setLoading(true);
    const success = await reportIllegalDumping(location);
    setLoading(false);

    if (success) {
      alert(`✅ Illegal dumping reported at ${location}!`);
      setLocation("");
    } else {
      alert("❌ Failed to report illegal dumping.");
    }
  };

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-bold mb-4">Report Illegal Dumping</h2>
      <input
        type="text"
        placeholder="Enter location"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleReport}
        disabled={loading}
      >
        {loading ? "Reporting..." : "Report Dumping"}
      </button>
    </div>
  );
};

export default ReportDumping;
