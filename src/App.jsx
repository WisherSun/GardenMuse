import { useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {

  useEffect(() => {

    async function loadFlowers() {

      const { data, error } = await supabase
        .from("Flowers")
        .select("*");

      console.log("Flowers:", data);
      console.log("Error:", error);
    }

    loadFlowers();

  }, []);


  return (
    <h1>GardenMuse 🌷</h1>
  );
}

export default App;