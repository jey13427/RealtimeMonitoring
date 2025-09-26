import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState({ agents: [], alerts: [] });
  const [loading, setLoading] = useState(true);

  const API_ENDPOINT = "https://<your-api-gateway-endpoint>/live-agents";

  const fetchData = async () => {
    try {
      const res = await fetch(API_ENDPOINT);
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Amazon Connect Agent Dashboard</h1>

      {loading && <div>Loading agent data...</div>}

      {data.alerts && data.alerts.length > 0 && (
        <div style={{ backgroundColor: "red", color: "white", padding: "10px", marginBottom: "20px", borderRadius: "5px" }}>
          {data.alerts.map((alert, i) => <div key={i}>{alert}</div>)}
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Agent</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Activity</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>On Call</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Call Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.agents && data.agents.map((agent, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{agent.AgentLogin}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{agent.Activity}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{agent.OnCall}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{agent.CallDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}