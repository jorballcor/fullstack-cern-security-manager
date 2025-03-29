import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.text())
      .then((data) => setMensaje(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Mensaje del backend: {mensaje}</p>
    </div>
  );
}

