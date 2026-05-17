async function loadDecision() {
  try {
    const contractId = "a339bfce-1c19-4fd9-bf05-130ebf1b1a7e";

    // 🔐 AUTH TOKEN (required for backend)
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://operionos-backend-1.onrender.com/api/contracts/${contractId}/decision`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        }
      }
    );

    if (!response.ok) {
      // 👇 this will now show real backend error instead of generic message
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
