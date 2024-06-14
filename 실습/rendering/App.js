import { useEffect, useState } from "react";

export default function App() {
  debugger;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setData({
        hello: "world",
      });

      setLoading(false);
    }, 3000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return <>{data ? JSON.stringify(data) : <div>first render</div>}</>;
}
