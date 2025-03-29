import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUser } from "../services/userService";

export default function UserForm({ onSuccess }) {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
    staff: {
      firstName: "",
      lastName: "",
      badgeNumber: "",
      accessLevel: "LOW",
      areaId: "",
    },
  });
  const [includeStaff, setIncludeStaff] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e, group = "user") => {
    const { name, value } = e.target;
    if (group === "user") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({
        ...form,
        staff: { ...form.staff, [name]: value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: form.username,
      password: form.password,
      role: form.role,
      staff: includeStaff ? form.staff : null,
    };
    const result = await createUser(payload, token);
    if (result) {
      onSuccess?.();
      setForm({
        username: "",
        password: "",
        role: "",
        staff: {
          firstName: "",
          lastName: "",
          badgeNumber: "",
          accessLevel: "LOW",
          areaId: "",
        },
      });
    } else {
      setError("Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold">Create New User</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="role"
        placeholder="Role (e.g., ADMIN)"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={includeStaff}
          onChange={() => setIncludeStaff(!includeStaff)}
        />
        <span>Include Staff Info</span>
      </label>

      {includeStaff && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.staff.firstName}
            onChange={(e) => handleChange(e, "staff")}
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.staff.lastName}
            onChange={(e) => handleChange(e, "staff")}
            className="border p-2 rounded"
          />
          <input
            name="badgeNumber"
            placeholder="Badge Number"
            value={form.staff.badgeNumber}
            onChange={(e) => handleChange(e, "staff")}
            className="border p-2 rounded"
          />
          <select
            name="accessLevel"
            value={form.staff.accessLevel}
            onChange={(e) => handleChange(e, "staff")}
            className="border p-2 rounded"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
          <input
            name="areaId"
            placeholder="Area ID"
            value={form.staff.areaId}
            onChange={(e) => handleChange(e, "staff")}
            className="border p-2 rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create User
      </button>
    </form>
  );
}
