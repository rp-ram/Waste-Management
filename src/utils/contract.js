import { BrowserProvider, Contract } from "ethers";

// ✅ Deployed contract address
const CONTRACT_ADDRESS = "0xf4E3193FEcAd0531C31965D5270F4227c0498400";

// ✅ ABI from your Solidity contract (make sure it matches your deployed contract)
const CONTRACT_ABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "company",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "harmful",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "remarks",
          "type": "string"
        }
      ],
      "name": "CompanyAssessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "offerId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "OfferBid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "offerId",
          "type": "uint256"
        }
      ],
      "name": "OfferCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "offerId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "OfferCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "offerId",
          "type": "uint256"
        }
      ],
      "name": "OfferFulfilled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "company",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "wasteIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "wasteType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "WasteSubmitted",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_company",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_harmful",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "_remarks",
          "type": "string"
        }
      ],
      "name": "adminSetCompanyAssessment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "adminViewAllWastes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "wasteType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "company",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isAssessed",
              "type": "bool"
            }
          ],
          "internalType": "struct CircularWasteMarketplace.Waste[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_offerId",
          "type": "uint256"
        }
      ],
      "name": "bidOffer",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_offerId",
          "type": "uint256"
        }
      ],
      "name": "cancelOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_wasteIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "createOffer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllOffers",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "wasteIndex",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isOpen",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "isFulfilled",
              "type": "bool"
            }
          ],
          "internalType": "struct CircularWasteMarketplace.Offer[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_company",
          "type": "address"
        }
      ],
      "name": "getCompanyAssessment",
      "outputs": [
        {
          "internalType": "bool",
          "name": "harmful",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "assessed",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "remarks",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyWastes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "wasteType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "company",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isAssessed",
              "type": "bool"
            }
          ],
          "internalType": "struct CircularWasteMarketplace.Waste[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_offerId",
          "type": "uint256"
        }
      ],
      "name": "isOfferFulfilled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "offers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "wasteIndex",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isOpen",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isFulfilled",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_wasteType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "submitWaste",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

// 🔹 Get Ethereum object (MetaMask)
export const getEthereumObject = () => window.ethereum;

// 🔹 Connect to contract
export const getWasteContract = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.error("❌ MetaMask not found");
      return null;
    }
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } catch (error) {
    console.error("❌ Error connecting to contract:", error);
    return null;
  }
};

/* ======================================================
   🔹 WRITE FUNCTIONS (transaction → modifies blockchain)
   ====================================================== */

// Assign collector (only admin)
export const assignCollector = async (collectorAddress) => {
  try {
    const contract = await getWasteContract();
    const tx = await contract.assignCollector(collectorAddress);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("❌ Assign collector failed:", error);
    return false;
  }
};

// Collect waste (only authorized collector)
export const collectWaste = async (wasteIndex) => {
  try {
    const contract = await getWasteContract();
    const tx = await contract.collectWaste(wasteIndex);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("❌ Collect waste failed:", error);
    return false;
  }
};

// Process collected waste
export const processWaste = async (wasteIndex) => {
  try {
    const contract = await getWasteContract();
    const tx = await contract.processWaste(wasteIndex);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("❌ Processing waste failed:", error);
    return false;
  }
};

// Report illegal dumping
export const reportIllegalDumping = async (location) => {
  try {
    const contract = await getWasteContract();
    const tx = await contract.reportIllegalDumping(location);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("❌ Reporting illegal dumping failed:", error);
    return false;
  }
};

/* ======================================================
   🔹 READ FUNCTIONS (view → no gas, free calls)
   ====================================================== */

// Get all waste records
export const getAllWasteRecords = async () => {
  try {
    const contract = await getWasteContract();
    const allRecords = await contract.getLatestWasteRecords();

    return allRecords.map((record, index) => ({
      index,
      wasteType: record.wasteType,
      location: record.location,
      quantity: Number(record.quantity),
      disposer: record.disposer,
      timestamp: new Date(Number(record.timestamp) * 1000).toLocaleString(),
      isCollected: record.isCollected,
      isProcessed: record.isProcessed,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch waste records:", error);
    return [];
  }
};

// Get single waste record
export const getWasteByIndex = async (wasteIndex) => {
  try {
    const contract = await getWasteContract();
    return await contract.getWasteByIndex(wasteIndex);
  } catch (error) {
    console.error("❌ Failed to fetch waste details:", error);
    return null;
  }
};

// ✅ Use this instead of markWasteAsCollected
export const markWasteAsCollected = async (index) => {
  try {
    const contract = await getWasteContract();
    const tx = await contract.collectWaste(index);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("❌ Failed to collect waste:", error);
    return false;
  }
};


// Get total waste count
export const getTotalWasteCount = async () => {
  try {
    const contract = await getWasteContract();
    return Number(await contract.getTotalWasteCount());
  } catch (error) {
    console.error("❌ Failed to fetch total waste count:", error);
    return 0;
  }
};

// Get waste count by user
export const getUserWasteCount = async (userAddress) => {
  try {
    const contract = await getWasteContract();
    return Number(await contract.getUserWasteCount(userAddress));
  } catch (error) {
    console.error("❌ Failed to fetch user waste count:", error);
    return 0;
  }
};

export const getUserWasteRecords = async (userAddress) => {
  try {
    const contract = await getWasteContract();
    const userWasteCount = await contract.getUserWasteCount(userAddress);

    let records = [];
    for (let i = 0; i < Number(userWasteCount); i++) {
      const waste = await contract.getWasteByIndex(i);
      if (waste.user.toLowerCase() === userAddress.toLowerCase()) {
        records.push(waste);
      }
    }

    return records;
  } catch (error) {
    console.error("❌ Failed to fetch user waste records:", error);
    return [];
  }
};

// Get waste collected by a collector
export const getCollectedWasteCount = async (collectorAddress) => {
  try {
    const contract = await getWasteContract();
    return Number(await contract.getCollectedWasteCount(collectorAddress));
  } catch (error) {
    console.error("❌ Failed to fetch collected waste count:", error);
    return 0;
  }
};

// Get illegal dump reports count per user
export const getIllegalDumpReports = async (userAddress) => {
  try {
    const contract = await getWasteContract();
    return Number(await contract.getIllegalDumpReports(userAddress));
  } catch (error) {
    console.error("❌ Failed to fetch illegal dump reports:", error);
    return 0;
  }
};

// Check if user is a collector
export const isCollector = async (userAddress) => {
  try {
    const contract = await getWasteContract();
    return await contract.isCollector(userAddress);
  } catch (error) {
    console.error("❌ Failed to check collector:", error);
    return false;
  }
};

// Check if user is disposer
export const isWasteDisposer = async (userAddress) => {
  try {
    const contract = await getWasteContract();
    return await contract.isWasteDisposer(userAddress);
  } catch (error) {
    console.error("❌ Failed to check disposer:", error);
    return false;
  }
};

