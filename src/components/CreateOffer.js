import { useEffect, useState } from "react";
import { getWasteContract } from "../utils/contract";

const CreateOffer = () => {
  const [wastes, setWastes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedWasteIndex, setSelectedWasteIndex] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = await getWasteContract();
        const myWastes = await contract.getMyWastes();

        // We'll need the original index of each waste if possible
        // Since getMyWastes may just return wastes belonging to msg.sender without index,
        // Ideally your contract should provide waste indices or you fetch all wastes with indices then filter here.

        const allOffers = await contract.getAllOffers();

        setWastes(myWastes);
        setOffers(allOffers);
      } catch (err) {
        console.error("Failed to fetch wastes or offers", err);
      }
    };
    fetchData();
  }, []);

  // Filter wastes that are assessed and have no offers posted for them
  const wastesAvailableForOffer = wastes.filter((waste, idx) => {
    if (!waste.isAssessed) return false;

    // Exclude waste if any offer exists for it (open, fulfilled, or cancelled)
    const offerExists = offers.some((offer) => {
      const wasteIdx = offer.wasteIndex.toNumber?.() ?? offer.wasteIndex;
      return wasteIdx === idx;
    });

    return !offerExists;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedWasteIndex === "" || quantity === "" || price === "") {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const contract = await getWasteContract();
      await contract.createOffer(selectedWasteIndex, Number(quantity), Number(price));
      alert("Offer created!");
      setSelectedWasteIndex("");
      setQuantity("");
      setPrice("");
    } catch (err) {
      console.error("Failed to create offer", err);
      alert("Failed to create offer. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 max-w-screen mt-6 mx-auto shadow">
      <h2 className="text-xl font-semibold mb-4">Create Marketplace Offer</h2>

      <label className="block mb-2">
        Select Waste:
        <select
          value={selectedWasteIndex}
          onChange={(e) => setSelectedWasteIndex(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="">Select Waste Record</option>
          {wastesAvailableForOffer.map((waste, idx) => (
            <option key={idx} value={idx}>
              {waste.wasteType} - Quantity: {waste.quantity.toString()}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2">
        Quantity for Offer:
        <input
          type="number"
          min="1"
          max={selectedWasteIndex !== "" ? wastes[selectedWasteIndex]?.quantity : undefined}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block mb-4">
        Price per Unit (in wei):
        <input
          type="number"
          min="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Creating Offer..." : "Create Offer"}
      </button>
    </form>
  );
};

export default CreateOffer;
