export default function BlogSection() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "7rem 1.2rem 3rem",
        background: "#f3f3f0",
        color: "#16181b",
      }}
    >
      <section style={{ width: "min(900px, 100%)", textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            letterSpacing: "0.2em",
            fontSize: "0.78rem",
            color: "#95231c",
          }}
        >
          BLOG
        </p>
        <h1
          style={{
            margin: "0.8rem 0 0",
            fontSize: "clamp(2.1rem, 6vw, 4.4rem)",
            lineHeight: 1,
            fontWeight: 300,
            fontFamily: "var(--font-nohemi), sans-serif",
          }}
        >
          Historias, rutas y consejos de viaje
        </h1>
        <p
          style={{
            margin: "1rem auto 0",
            maxWidth: "58ch",
            fontSize: "clamp(1rem, 1.8vw, 1.18rem)",
            lineHeight: 1.6,
            color: "rgba(22,24,27,0.78)",
          }}
        >
          Esta seccion ya esta conectada al menu principal. Si quieres, en el
          siguiente paso te monto el listado real de articulos.
        </p>
      </section>
    </main>
  );
}

