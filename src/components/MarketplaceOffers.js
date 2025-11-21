import { useEffect, useState } from "react";
import { getWasteContract } from "../utils/contract";

const MarketplaceOffers = () => {
  const [offers, setOffers] = useState([]);
  const [wastes, setWastes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserAddress(accounts[0].toLowerCase());
      }
    };

    fetchUserAddress();
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const contract = await getWasteContract();
      const rawOffers = await contract.getAllOffers();

      // You may remove fetching allWastes if you cannot call admin-only function
      // Instead, fetch wastes from offers or show placeholder wasteType
      // For demo, wasteType is unknown; implement public waste getter if available

      const mappedOffers = rawOffers.map((offer, index) => {  
        const wasteIndex = offer.wasteIndex.toNumber?.() || offer.wasteIndex;
        return {
          id: index,
          wasteIndex,
          wasteType: "Unknown", // Or fetch public waste data here if available
          seller: offer.seller.toLowerCase(),
          quantity: offer.quantity.toString(),
          price: offer.price.toString(),
          isOpen: offer.isOpen,
          buyer: offer.buyer,
          isFulfilled: offer.isFulfilled,
        };
      });

      setOffers(mappedOffers);
    } catch (err) {
      setError("Failed to load offers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (offer) => {
    try {
      const contract = await getWasteContract();
      const totalPrice = Number(offer.price) * Number(offer.quantity);
      const txn = await contract.bidOffer(offer.id, { value: totalPrice.toString() });
      await txn.wait();
      alert("Offer purchased successfully");
      fetchOffers();
    } catch (err) {
      alert("Failed to purchase offer");
      console.error(err);
    }
  };

  const handleCancel = async (offer) => {
    try {
      const contract = await getWasteContract();
      const txn = await contract.cancelOffer(offer.id);
      await txn.wait();
      alert("Offer cancelled");
      fetchOffers();
    } catch (err) {
      alert("Failed to cancel offer");
      console.error(err);
    }
  };

  if (loading) return <p>Loading marketplace offers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-screen mx-auto">
      <h2 className="text-3xl font-bold mb-4">Marketplace Offers</h2>
      {offers.length === 0 ? (
        <p>No offers available at the moment.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="border px-4 py-2">Waste Index</th> */}
              <th className="border px-4 py-2">Waste Type</th>
              <th className="border px-4 py-2">Seller</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price (wei)</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.filter(offer => offer.isOpen).map((offer) => (
              <tr key={offer.id} className="text-center">
                {/* <td className="border px-4 py-2">{offer.wasteIndex}</td> */}
                <td className="border px-4 py-2">Plastics</td>
                <td className="border px-4 py-2">{offer.seller}</td>
                <td className="border px-4 py-2">{offer.quantity}</td>
                <td className="border px-4 py-2">{offer.price}</td>
                <td className="border px-4 py-2">
                  {offer.isFulfilled ? "Fulfilled" : offer.isOpen ? "Open" : "Cancelled"}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {!offer.isFulfilled && offer.isOpen && offer.seller !== userAddress && (
                    <button
                      onClick={() => handleBid(offer)}
                      className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Buy
                    </button>
                  )}
                  {!offer.isFulfilled && offer.isOpen && offer.seller === userAddress && (
                    <button
                      onClick={() => handleCancel(offer)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketplaceOffers;
