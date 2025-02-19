import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Logging in with:", formData);

    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        "https://todo-dapp3-2.onrender.com/login",
        formData
      );

      const { token } = response.data; // Assuming your API returns the token
      console.log("Logged in successfully with token:", token);

      // Store token in localStorage or state
      localStorage.setItem("authToken", token);

      // Redirect to home or dashboard
      navigate("/todo");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(err.response?.data?.msg || "Login failed, please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm mt-2">
            New user? <Link to="/register" className="text-blue-500">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
