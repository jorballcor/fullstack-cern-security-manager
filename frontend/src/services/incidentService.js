// src/services/incidentService.js
const BASE_URL = "http://localhost:8080/api/incidents";

export async function getIncidents(token) {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al obtener incidentes");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getIncidentById(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No se encontró el incidente");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createIncident(description, token) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ description })
    });
    if (!res.ok) throw new Error("Error al crear incidente");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateIncident(id, data, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar incidente");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteIncident(id, token) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error("Error al eliminar incidente");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function resolveIncident(incident, token) {
  return await updateIncident(incident.id, { ...incident, status: "RESOLVED" }, token);
}


