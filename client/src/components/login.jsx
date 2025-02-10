import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

=======
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
>>>>>>> 84f2da2 (added ai and blockchain)

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
<<<<<<< HEAD
  const navigate = useNavigate();
  
=======
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

>>>>>>> 84f2da2 (added ai and blockchain)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
=======
  const handleSubmit = async (e) => {
>>>>>>> 84f2da2 (added ai and blockchain)
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
<<<<<<< HEAD
    console.log("Logging in with:", formData);
    navigate("/");
=======

    try {
      setLoading(true); // Start loading
      // Make POST request to backend login endpoint
      const response = await axios.post("http://localhost:3000/auth/login", formData);

      // Handle successful login
      const { token } = response.data; // Assuming your API returns the token
      console.log("Logged in successfully with token:", token);

      // Store token in localStorage or state
      localStorage.setItem("authToken", token);

      // Redirect to home or dashboard
      navigate("/");
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(err.response?.data?.msg || "Login failed, please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
>>>>>>> 84f2da2 (added ai and blockchain)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
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
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
<<<<<<< HEAD
          >
            Login
          </button>
=======
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="">
          <Link to="/register">New user? </Link>
          </p>
>>>>>>> 84f2da2 (added ai and blockchain)
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
