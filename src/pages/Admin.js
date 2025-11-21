import { useEffect, useState } from "react";
import { getWasteContract } from "../utils/contract";

const AdminPage = () => {
  const [wasteRecords, setWasteRecords] = useState([]);
  const [totalWaste, setTotalWaste] = useState([]); // now array of {company, total}
  const [illegalDumpingReports, setIllegalDumpingReports] = useState([]);

  // Local state for remarks keyed by company address
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = await getWasteContract();
        const wastes = await contract.adminViewAllWastes();

        const normalized = wastes.map((waste, idx) => ({
          index: idx,
          wasteType: waste.wasteType,
          location: waste.location,
          quantity: waste.quantity.toString(),
          company: waste.company,
          timestamp: Number(waste.timestamp),
          isAssessed: waste.isAssessed,
        }));

        setWasteRecords(normalized);

        // Calculate total waste per company
        const totalByCompany = normalized.reduce((acc, item) => {
          acc[item.company] = (acc[item.company] || 0) + Number(item.quantity);
          return acc;
        }, {});

        // Convert to array for rendering
        const totalByCompanyArray = Object.entries(totalByCompany).map(
          ([company, total]) => ({
            company,
            total,
          })
        );

        setTotalWaste(totalByCompanyArray);

        setIllegalDumpingReports([]);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchData();
  }, []);

  // Assessment change handler
  const handleAssessmentChange = async (company, newAssessment) => {
    try {
      const contract = await getWasteContract();
      const txn = await contract.adminSetCompanyAssessment(company, newAssessment, "");
      await txn.wait();

      // Re-fetch wastes after update
      const wastes = await contract.adminViewAllWastes();
      const normalized = wastes.map((waste, idx) => ({
        index: idx,
        wasteType: waste.wasteType,
        location: waste.location,
        quantity: waste.quantity.toString(),
        company: waste.company,
        timestamp: Number(waste.timestamp),
        isAssessed: waste.isAssessed,
      }));
      setWasteRecords(normalized);

      // Recompute totals
      const totalByCompany = normalized.reduce((acc, item) => {
        acc[item.company] = (acc[item.company] || 0) + Number(item.quantity);
        return acc;
      }, {});
      const totalByCompanyArray = Object.entries(totalByCompany).map(
        ([company, total]) => ({ company, total })
      );
      setTotalWaste(totalByCompanyArray);

      alert(`Assessment updated to ${newAssessment ? "Yes" : "No"} for company ${company}`);
    } catch (error) {
      console.error("Failed to update assessment:", error);
      alert("Failed to update assessment.");
    }
  };

  // Update remark for a company
  const handleRemarkChange = (company, value) => {
    setRemarks((prev) => ({ ...prev, [company]: value }));
  };

  return (
    <div className="p-8">
      <div className="max-w-screen mx-auto space-y-6">
        {/* Summary Section */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">📊 Waste Quantity by Company</h2>
          {totalWaste.length === 0 ? (
            <p>No waste data available.</p>
          ) : (
            <ul>
              {totalWaste.map(({ company, total }) => (
                <li key={company}>
                  <strong>{company}:</strong> {total}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Illegal Dumping Reports */}
        {/* Uncomment if needed */}
        {/* <div className="p-6 bg-red-600 bg-opacity-90 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">🚨 Illegal Dumping Reports</h2>
          {illegalDumpingReports.length ? (
            <ul className="mt-2 space-y-2">
              {illegalDumpingReports.map((r, i) => <li key={i}>{r.location} - Reported by {r.reporter}</li>)}
            </ul>
          ) : (
            <p className="text-lg mt-2">No illegal dumping reports.</p>
          )}
        </div> */}

        {/* Waste Records Table */}
        {wasteRecords.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-center bg-white bg-opacity-20 rounded-lg shadow-lg overflow-hidden text-black">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Assessed</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wasteRecords.map((record) => (
                  <tr key={record.index} className="border-b border-gray-300 bg-white bg-opacity-70">
                    <td className="px-4 py-3">{record.wasteType}</td>
                    <td className="px-4 py-3">{record.location}</td>
                    <td className="px-4 py-3">{record.quantity}</td>
                    <td className="px-4 py-3">{record.company}</td>
                    <td className="px-4 py-3">{new Date(record.timestamp * 1000).toLocaleString()}</td>
                    <td className="px-4 py-3">{record.isAssessed ? "✅ Yes" : "❌ No"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleAssessmentChange(record.company, !record.isAssessed)}
                        className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                      >
                        Mark as {record.isAssessed ? "Not Assessed" : "Assessed"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-2xl text-black">No waste records available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
