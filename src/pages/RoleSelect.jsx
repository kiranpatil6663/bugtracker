import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-xl bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login As</h2>

        <button
          onClick={() => navigate("/login/manager")}
          aria-label="Login as manager"
          className="w-full py-3 mb-3 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Manager
        </button>

        <button
          onClick={() => navigate("/login/developer")}
          aria-label="Login as developer"
          className="w-full py-3 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Developer
        </button>
      </div>
    </div>
  );
}