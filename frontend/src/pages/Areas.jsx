import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getAreas,
  createArea,
  updateArea,
  deleteArea
} from "../services/areaService";

export default function Areas() {
  const { token } = useContext(AuthContext);
  const [areas, setAreas] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (token) getAreas(token).then(setAreas);
  }, [token]);

  const refresh = () => getAreas(token).then(setAreas);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createArea(form, token);
    if (created) {
      refresh();
      setForm({ name: "", location: "" });
    }
  };

  const startEdit = (area) => {
    setEditingId(area.id);
    setEditForm({ name: area.name, location: area.location });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const updated = await updateArea(editingId, editForm, token);
    if (updated) {
      setEditingId(null);
      setEditForm({});
      refresh();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta área?")) {
      const ok = await deleteArea(id, token);
      if (ok) refresh();
    }
  };

  return (
    <div>
      <h2>Gestión de Áreas</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="location" placeholder="Ubicación" value={form.location} onChange={handleChange} required />
        <button type="submit">Añadir</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((a) => (
            <tr key={a.id}>
              {editingId === a.id ? (
                <>
                  <td><input name="name" value={editForm.name} onChange={handleEditChange} /></td>
                  <td><input name="location" value={editForm.location} onChange={handleEditChange} /></td>
                  <td>
                    <button onClick={saveEdit}>Guardar</button>
                    <button onClick={cancelEdit}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{a.name}</td>
                  <td>{a.location}</td>
                  <td>
                    <button onClick={() => startEdit(a)}>Editar</button>
                    <button onClick={() => handleDelete(a.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
