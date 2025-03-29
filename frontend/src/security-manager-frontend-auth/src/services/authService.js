export async function login(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
}
