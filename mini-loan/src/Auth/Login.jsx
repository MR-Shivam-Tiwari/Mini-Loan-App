import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Store email and role in local storage upon successful login
      localStorage.setItem("email", email);
      localStorage.setItem("role", role); // Assuming the role is returned from the backend

      console.log(response.data); // Handle response as needed
      alert("Login Successfully");
      // Redirect based on user's role
      if (role === "admin") {
        navigate("/approval");
      } else {
        navigate("/apply");
      }
    } catch (error) {
      console.error(error.response.data); // Handle error response
      // Show error message to user
    }
  };

  return (
    <div>
      <div className="w-full px-4 py-6 space-y-6 md:max-w-3xl md:mx-auto md:px-10">
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Mini Loan</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Login to your account
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="m@example.com"
                required=""
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                required=""
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="role"
              >
                Role
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="role"
                value={role}
                onChange={(e) => setrole(e.target.value)}
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              className="inline-flex items-center bg-black text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-gray-100 h-[1px] w-full border-gray-200 dark:border-gray-800"
        ></div>
        <div className="space-y-4">
          <a
            className="flex items-center text-blue-600 font-bold justify-center w-full py-3 btn btn-outline btn-sm"
            href="/register"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
