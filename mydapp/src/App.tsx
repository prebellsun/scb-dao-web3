// mydapp/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import ProposalList from './components/ProposalList';
import ProposalDetail from './components/ProposalDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProposalList />} />
      <Route path="/proposal/:id" element={<ProposalDetail />} />
    </Routes>
  );
}

export default App;



