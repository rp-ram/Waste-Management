import { useState } from "react";
import { getWasteContract } from "../utils/contract";

const wasteTypeOptions = [
  "Acids and bases",
  "Spent solvents",
  "Reactive wastes",
  "Wastewater (organic constituents)",
  "Wastewater (hydrocarbons)",
  "Heavy metal solutions",
  "Waste inks",
  "Oil and petroleum derivatives",
  "Sludges (with heavy metals)",
  "Ink sludges",
  "Refining sludge",
  "Toluene and benzene",
  "Paint waste",
  "Plastics",
  "Fly ash",
  "Synthetic fibres",
  "Gypsum",
  "Glass objects"
];

const WasteForm = () => {
  const [wasteType, setWasteType] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contract = await getWasteContract();

      // Convert quantity string to number
      const qty = Number(quantity);
      if (isNaN(qty) || qty <= 0) {
        alert("Please enter a valid quantity greater than zero");
        return;
      }

      const txn = await contract.submitWaste(wasteType, location, qty);
      await txn.wait();
      alert("Waste successfully submitted!");
      
      // Clear form after submission
      setWasteType("");
      setLocation("");
      setQuantity("");
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold">Submit Waste</h2>
      <select
        value={wasteType}
        onChange={(e) => setWasteType(e.target.value)}
        className="w-full p-2 my-2 border rounded"
        required
      >
        <option value="" disabled>Select Waste Type</option>
        {wasteTypeOptions.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 my-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Quantity (kg)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 my-2 border rounded"
        required
        min="1"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default WasteForm;
