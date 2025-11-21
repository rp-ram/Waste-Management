import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WasteForm from "./components/WasteForm";
import WasteList from "./components/WasteList";
import CreateOffer from "./components/CreateOffer";
import MarketplaceOffers from "./components/MarketplaceOffers";
import CollectorPanel from "./components/CollectorPanel";
import AdminPage from "./pages/Admin";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">GreenCity Waste Network</h1>
        <Routes>
          <Route path="/" element={
            <>
              <WasteForm />
              <WasteList />
              <CreateOffer />
              {/* <CollectorPanel /> */}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/marketplace" element={<MarketplaceOffers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
