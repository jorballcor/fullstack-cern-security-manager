export async function getAccessLogs(token) {
    try {
      const response = await fetch("http://localhost:8080/api/access-logs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los logs");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }