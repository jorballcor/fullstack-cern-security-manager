const BASE_URL = "http://localhost:8080/users";

export async function getUsers(token) {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createUser(user, token) {
  try {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return await res.text();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateUser(username, data, token) {
  try {
    const res = await fetch(`${BASE_URL}/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deactivateUser(username, token) {
  try {
    const res = await fetch(`${BASE_URL}/${username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function reactivateUser(username, token) {
  try {
    const res = await fetch(`${BASE_URL}/reactivate/${username}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}
