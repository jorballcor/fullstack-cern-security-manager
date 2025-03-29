export async function login(username, password) {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      return null;
    }
  
    const data = await response.text();
    return data.token;
  }
  