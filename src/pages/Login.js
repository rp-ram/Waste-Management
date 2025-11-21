import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWasteContract } from "../utils/contract";

const Login = () => {
  const [account, setAccount] = useState(null);
  const [adminAddress, setAdminAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const contract = await getWasteContract();
        const admin = await contract.admin(); // Fetch admin from contract
        setAdminAddress(admin.toLowerCase());
      } catch (error) {
        console.error("Error fetching admin address:", error);
      }
    };
    fetchAdmin();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0].toLowerCase();
        setAccount(userAddress);

        if (userAddress === adminAddress) {
          navigate("/admin"); // Redirect if user is admin
        } else {
          alert("Access Denied: You are not the admin.");
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is required!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <button
        onClick={connectWallet}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Connect Wallet
      </button>
      {account && <p className="mt-2 text-gray-700">Connected: {account}</p>}
      {account && <p className="mt-2 text-gray-700">Admin: {adminAddress}</p>}
    </div>
  );
};

export default Login;
