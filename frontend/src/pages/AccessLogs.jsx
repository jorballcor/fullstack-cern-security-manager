import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAccessLogs } from "../services/accessLogService";

export default function AccessLogs() {
  const { token } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (token) {
      getAccessLogs(token).then(setLogs);
    }
  }, [token]);

  return (
    <div>
      <h2>Logs de Acceso</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.username}</td>
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}