"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Noch nicht verbunden");
  const [loading, setLoading] = useState(false);

  async function loadMessage() {
    setLoading(true);

    try {
      const response = await fetch("/backend/api/hello");
      if (!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage("Backend konnte nicht erreicht werden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>StudyHub</h1>

      <p>{message}</p>

      <button onClick={loadMessage} disabled={loading}>
        {loading ? "Lade..." : "Backend testen"}
      </button>
    </main>
  );
}