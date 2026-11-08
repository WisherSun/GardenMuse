import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Flowers from "./pages/Flowers";
import FlowersAxios from "./Pages/FlowersAxios";
import Admin from "./pages/Admin";
import Auth from "./Pages/Auth";
import Cabinet from "./Pages/Cabinet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/flowers" element={<Flowers />} />

        <Route path="/aflowers" element={<FlowersAxios />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/cabinet" element={<Cabinet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
