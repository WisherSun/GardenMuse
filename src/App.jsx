import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Flowers from "./pages/Flowers";
import FlowersAxios from "./pages/FlowersAxios";
import Admin from "./pages/Admin";



function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route 
                    path="/" 
                    element={<Home />}
                />

                <Route 
                    path="/flowers" 
                    element={<Flowers />}
                />

                <Route 
                    path="/aflowers" 
                    element={<FlowersAxios />}
                />

                <Route 
                    path="/admin" 
                    element={<Admin />}
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;