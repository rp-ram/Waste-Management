import { useEffect, useState } from "react";
import { getWasteContract } from "../utils/contract";

const WasteList = () => {
  const [wasteRecords, setWasteRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserWasteRecords = async () => {
      try {
        const contract = await getWasteContract();
        const wastes = await contract.getMyWastes();

        const normalizedWastes = wastes.map((waste) => ({
          wasteType: waste.wasteType,
          location: waste.location,
          quantity: waste.quantity.toString(),  // Convert to string to avoid BigInt errors
          company: waste.company,
          timestamp: Number(waste.timestamp),   // Convert BigInt to Number explicitly
          isAssessed: waste.isAssessed,
        }));

        setWasteRecords(normalizedWastes);
      } catch (error) {
        console.error("Failed to fetch waste records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWasteRecords();
  }, []);

  if (loading) return <p>Loading waste records...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Your Waste Records</h2>

      {wasteRecords.length > 0 ? (
        <table className="w-full border border-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Assessed</th>
            </tr>
          </thead>
          <tbody>
            {wasteRecords.map((record, index) => (
              <tr key={index} className="border bg-white text-black">
                <td className="border px-4 py-2">{record.wasteType}</td>
                <td className="border px-4 py-2">{record.location}</td>
                <td className="border px-4 py-2">{record.quantity}</td>
                <td className="border px-4 py-2">{record.company}</td>
                <td className="border px-4 py-2">{new Date(record.timestamp * 1000).toLocaleString()}</td>
                <td className="border px-4 py-2">{record.isAssessed ? "✅ Yes" : "❌ No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mb-4">No waste records found.</p>
      )}
    </div>
  );
};

export default WasteList;
