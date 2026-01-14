import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Registered Successfully");
  };

  return (
    <div>
    <div className=" flex justify-between bg-red-500 ">
    
      <h1 className="text-3xl">📝Task Mangers</h1>
      <h1 className="text-2xl  font-bold text-white mr-2 ">CRUD OPEARATIONS</h1>

    </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-400 border  border-emerald-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Register
        </h2>
        <p className="text-center text-sm text-gray-500">Create your account to start managing your tasks easily</p>

        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-emerald-600"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-emerald-600"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-emerald-600"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transitio border-emerald-600"
        >
          Register
        </button>
        <Link to="/login" > Successfully Register Go to <span className="text-purple-600">Login Pages...</span> </Link>
      </form>
    </div>
    </div>
  );
}

export default Register;
