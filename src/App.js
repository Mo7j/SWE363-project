import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'; 
import Home from "./pages/Home";
import SearchReuset from "./pages/SearchReuset";
import MyRequests from "./pages/MyRequest";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-request" element={<SearchReuset />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
