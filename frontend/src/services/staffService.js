const BASE_URL = "http://localhost:8080/staff";

export async function getStaff(token) {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al obtener personal");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createStaff(data, token) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear personal");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deactivateStaff(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/deactivate/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function reactivateStaff(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/reactivate/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function updateStaff(id, data, token) {
  try {
    const res = await fetch(`http://localhost:8080/staff/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar staff");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteStaff(id, token) {
  try {
    const res = await fetch(`http://localhost:8080/staff/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}
