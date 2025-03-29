import { useEffect, useState, useContext } from "react";
import {
  getUsers,
  deactivateUser,
  reactivateUser,
  updateUser,
} from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import UserForm from "../components/UserForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const data = await getUsers(token);
    setUsers(data);
    setLoading(false);
  }

  async function handleDeactivate(username) {
    const confirmed = window.confirm("Are you sure you want to deactivate this user?");
    if (!confirmed) return;
    await deactivateUser(username, token);
    fetchUsers();
  }

  async function handleReactivate(username) {
    await reactivateUser(username, token);
    fetchUsers();
  }

  async function handleChangeRole(username) {
    const newRole = prompt("Enter new role (ADMIN, USER, etc):");
    if (!newRole) return;
    await updateUser(username, { role: newRole }, token);
    fetchUsers();
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Users</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Create User
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-24">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <UserForm
              onSuccess={() => {
                fetchUsers();
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{u.username}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">
                    {u.active ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleChangeRole(u.username)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit Role
                    </button>
                    {u.active ? (
                      <button
                        onClick={() => handleDeactivate(u.username)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReactivate(u.username)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}