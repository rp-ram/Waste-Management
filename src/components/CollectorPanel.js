import { useState } from "react";
import { getWasteContract } from "../utils/contract";
import ReportDumping from "./ReportDumping";

const CollectorPanel = () => {
  const [index, setIndex] = useState("");

  const handleCollect = async () => {
    try {
      const contract = await getWasteContract();
      const txn = await contract.collectWaste(index);
      await txn.wait();
      alert("Waste collected successfully!");
    } catch (error) {
      console.error("Error collecting waste:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 mt-6 rounded-lg">
      {/* <h2 className="text-lg font-bold">Collector Panel</h2>
      <input type="number" placeholder="Waste Index" value={index} onChange={(e) => setIndex(e.target.value)} className="w-full p-2 my-2 border rounded" />
      <button onClick={handleCollect} className="px-4 py-2 bg-green-500 text-white rounded">Collect Waste</button> */}
      <ReportDumping />
    </div>
  );
};

export default CollectorPanel;
