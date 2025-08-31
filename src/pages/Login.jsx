import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const USERS = [
  { email: "manager@test.com", password: "1234", role: "manager", name: "Manager" },
  { email: "dev1@test.com", password: "1234", role: "developer", name: "Developer 1" },
  { email: "dev2@test.com", password: "1234", role: "developer", name: "Developer 2" },
  { email: "dev3@test.com", password: "1234", role: "developer", name: "Developer 3" },
];

export default function Login() {
  const { role } = useParams();
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    const user = USERS.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!user) {
      setErr("Invalid credentials for " + role);
      return;
    }

    login(user);
    if (user.role === "developer") {
      navigate("/my-tasks");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-xl bg-white"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login as {role}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {err && (
          <div className="text-red-600 text-sm mb-4 text-center">{err}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}