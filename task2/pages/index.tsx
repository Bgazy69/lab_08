import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🏠 Lab 8.2 — SSR Dashboard</h1>
      <p style={{ color: "gray" }}>Выбери страницу для просмотра:</p>

      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
        <Link href="/dashboard" style={{
          padding: "1rem",
          background: "#0070f3",
          color: "white",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          👤 Dashboard (SSR) →
        </Link>



        <Link href="/about" style={{
          padding: "1rem",
          background: "#10b981",
          color: "white",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          📄 About (SSG) →
        </Link>

        <Link href="/about-ssr" style={{
          padding: "1rem",
          background: "#f59e0b",
          color: "white",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          🔄 About SSR (для сравнения) →
        </Link>
      </nav>
    </main>
  );
}