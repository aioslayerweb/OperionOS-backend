import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [decision, setDecision] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDecision() {
      try {
        const contractId = "a339bfce-1c19-4fd9-bf05-130ebf1b1a7e";

        // 🚨 TEMP DEBUG: NO AUTH HEADERS
        const response = await fetch(
          `https://operionos-backend-1.onrender.com/api/contracts/${contractId}/decision`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Backend error ${response.status}: ${errorText}`
          );
        }

        const data = await response.json();
        setDecision(data.decision);

      } catch (err) {
        console.error("Operion intelligence error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDecision();
  }, []);

  // ====================================
  // LOADING
  // ====================================

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl font-bold">
        Loading Operion Intelligence...
      </div>
    );
  }

  // ====================================
  // ERROR
  // ====================================

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-center p-10 text-xl">
        {error}
      </div>
    );
  }

  // ====================================
  // FALLBACK
  // ====================================

  if (!decision) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No decision data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Operion Executive Dashboard
            </h1>
            <p className="text-neutral-400 mt-3 text-lg">
              Aviation Decision Intelligence Platform
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-300 font-semibold">
            LIVE AI CONNECTED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
            <p className="text-neutral-400 text-sm uppercase">Health Score</p>
            <h2 className="text-6xl font-bold mt-4">
              {decision?.decision_summary?.overall_health_score || 0}
            </h2>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
            <p className="text-neutral-400 text-sm uppercase">Recommended Action</p>
            <h2 className="text-3xl font-bold mt-4">
              {decision?.decision_summary?.recommended_action || "-"}
            </h2>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
            <p className="text-neutral-400 text-sm uppercase">Urgency Level</p>
            <h2 className="text-3xl font-bold mt-4">
              {decision?.decision_summary?.urgency_level || "-"}
            </h2>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">Raw Decision Data</h2>
          <pre className="text-xs text-green-300 overflow-auto">
            {JSON.stringify(decision, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}
