const BASE_URL = "http://localhost:8080/areas";

export async function getAreas(token) {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al obtener áreas");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createArea(data, token) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear área");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateArea(id, data, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar área");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteArea(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}
