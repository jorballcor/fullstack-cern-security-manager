import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getStaff,
  createStaff,
  deactivateStaff,
  reactivateStaff,
  updateStaff,
  deleteStaff
} from "../services/staffService";

export default function Staff() {
  const { token } = useContext(AuthContext);
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    badgeNumber: "",
    accessLevel: "LOW",
    areaId: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (token) getStaff(token).then(setStaffList);
  }, [token]);

  const refresh = () => getStaff(token).then(setStaffList);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createStaff(form, token);
    if (created) {
      refresh();
      setForm({ firstName: "", lastName: "", badgeNumber: "", accessLevel: "LOW", areaId: "" });
    }
  };

  const toggleActive = async (person) => {
    const ok = person.active
      ? await deactivateStaff(person.id, token)
      : await reactivateStaff(person.id, token);
    if (ok) refresh();
  };

  const startEdit = (person) => {
    setEditingId(person.id);
    setEditForm({
      firstName: person.firstName,
      lastName: person.lastName,
      badgeNumber: person.badgeNumber,
      accessLevel: person.accessLevel,
      areaId: person.areaAssigned?.id || ""
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    const updated = await updateStaff(editingId, editForm, token);
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
    if (window.confirm("¿Eliminar este registro permanentemente?")) {
      const ok = await deleteStaff(id, token);
      if (ok) refresh();
    }
  };

  return (
    <div>
      <h2>Gestión de Personal</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required />
        <input name="badgeNumber" placeholder="Acreditación" value={form.badgeNumber} onChange={handleChange} required />
        <select name="accessLevel" value={form.accessLevel} onChange={handleChange}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
        <input name="areaId" placeholder="ID Área" value={form.areaId} onChange={handleChange} required />
        <button type="submit">Añadir</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acreditación</th>
            <th>Nivel</th>
            <th>Área</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((s) => (
            <tr key={s.id}>
              {editingId === s.id ? (
                <>
                  <td><input name="firstName" value={editForm.firstName} onChange={handleEditChange} /></td>
                  <td><input name="lastName" value={editForm.lastName} onChange={handleEditChange} /></td>
                  <td><input name="badgeNumber" value={editForm.badgeNumber} onChange={handleEditChange} /></td>
                  <td>
                    <select name="accessLevel" value={editForm.accessLevel} onChange={handleEditChange}>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </td>
                  <td><input name="areaId" value={editForm.areaId} onChange={handleEditChange} /></td>
                  <td>{s.active ? "Sí" : "No"}</td>
                  <td>
                    <button onClick={saveEdit}>Guardar</button>
                    <button onClick={cancelEdit}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.badgeNumber}</td>
                  <td>{s.accessLevel}</td>
                  <td>{s.areaAssigned?.name || "—"}</td>
                  <td>{s.active ? "Sí" : "No"}</td>
                  <td>
                    <button onClick={() => startEdit(s)}>Editar</button>
                    <button onClick={() => toggleActive(s)}>
                      {s.active ? "Desactivar" : "Reactivar"}
                    </button>
                    <button onClick={() => handleDelete(s.id)}>Eliminar</button>
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
