// // pages/Login.jsx
// import axios from "axios";

// export default function Login() {
//   const submit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:5000/api/auth/login", {
//       email: e.target.email.value,
//       password: e.target.password.value
//     });
//     localStorage.setItem("token", res.data.token);
//     window.location.href = "/dashboard";
//   };

//   return (
//     <form onSubmit={submit} className="p-10">
//       <input name="email" placeholder="Email" />
//       <input name="password" type="password" />
//       <button>Login</button>
//     </form>
//   );
// }



import axios from "axios";
import {Link ,useNavigate } from "react-router-dom"; 


export default function Login() {
  const navigate = useNavigate();

const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: e.target.email.value,
      password: e.target.password.value,
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    
  }
};


  return (
    <div>
    <div className=" flex justify-between bg-red-500 ">
    
      <h1 className="text-3xl">📝Task Mangers</h1>
      <h1 className="text-2xl  font-bold text-white mr-2 ">CRUD OPEARATIONS</h1>

    </div>
  <div className="min-h-screen flex items-center justify-center bg-gray-400">
  
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5 border border-emerald-700"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login page
        </h2>
        <p className="text-center text-sm text-gray-500">
        Welcome back! Please login to manage your tasks.
      </p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-emerald-700"
        />
        <p className="text-xs text-gray-500 ">
          Enter your registered email
        </p>

        {/* <br/><br/> */}

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-emerald-700"
        />
        <p className="text-xs text-gray-500 ">
          Your password must be secure
        </p>
          {/* <br/><br/> */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition border border-emerald-700"
         
        >
          Login
        </button>
        
        <Link to="/register" className="text-right w-full">Create new <span className="text-purple-600">Register</span></Link>
      </form>
      
    </div>

    </div>
  );
}
