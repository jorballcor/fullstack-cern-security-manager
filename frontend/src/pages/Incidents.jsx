import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getIncidents,
  createIncident,
  deleteIncident,
  resolveIncident,
  updateIncident
} from "../services/incidentService";

export default function Incidents() {
  const { token } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null); // ID del incidente que se está editando
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (token) {
      getIncidents(token).then(setIncidents);
    }
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newIncident = await createIncident(description, token);
    if (newIncident) {
      setIncidents([...incidents, newIncident]);
      setDescription("");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este incidente?")) {
      const ok = await deleteIncident(id, token);
      if (ok) {
        setIncidents((prev) => prev.filter((i) => i.id !== id));
      }
    }
  };

  const handleResolve = async (incident) => {
    const updated = await resolveIncident(incident, token);
    if (updated) {
      setIncidents((prev) =>
        prev.map((i) => (i.id === incident.id ? updated : i))
      );
    }
  };

  const startEditing = (incident) => {
    setEditing(incident.id);
    setEditDescription(incident.description);
  };

  const cancelEditing = () => {
    setEditing(null);
    setEditDescription("");
  };

  const handleUpdate = async (id) => {
    const updated = await updateIncident(id, { description: editDescription }, token);
    if (updated) {
      setIncidents((prev) =>
        prev.map((i) => (i.id === id ? updated : i))
      );
      cancelEditing();
    }
  };

  return (
    <div>
      <h2>Gestión de Incidentes</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Descripción del incidente"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Crear incidente</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>
                {editing === incident.id ? (
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  incident.description
                )}
              </td>
              <td>{incident.status}</td>
              <td>{new Date(incident.createdAt).toLocaleString()}</td>
              <td>
                {editing === incident.id ? (
                  <>
                    <button onClick={() => handleUpdate(incident.id)}>Guardar</button>
                    <button onClick={cancelEditing}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(incident)}>Editar</button>
                    {incident.status !== "RESOLVED" && (
                      <button onClick={() => handleResolve(incident)}>Resolver</button>
                    )}
                    <button onClick={() => handleDelete(incident.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


