export default function NotFound() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "80px", margin: "0", color: "#333" }}>404</h1>
      <h2 style={{ color: "#666" }}>Page introuvable</h2>
      <p style={{ color: "#888" }}>La page que vous cherchez n’existe pas.</p>

      <a
        href="/"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Retour à l'accueil
      </a>
    </div>
  );
}
