// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import DaoInfo from "./pages/DaoInfo";
import Home from "./pages/Home";
import Proposals from "./pages/Proposals";
import CreateProposal from "./pages/CreateProposal";
import CreateAdminProposal from "./pages/CreateAdminProposal";
import ProposalDetail from "./pages/ProposalDetail";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/dao-info" element={<DaoInfo />} />
        <Route path="/" element={<Home />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/proposals/:id" element={<ProposalDetail />} />
        <Route path="/create-proposal" element={<CreateProposal />} />
        <Route path="/create-admin-proposal" element={<CreateAdminProposal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;







