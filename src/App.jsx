// src/App.jsx
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("orders").select("");
      if (error) setError(error);
      else setData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Supabase Query</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
