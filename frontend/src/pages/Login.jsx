import { useState } from "react";
import API from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { user,login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", formData);
      login(data);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  if(user?.token){
     return <Navigate to="/" replace />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-[400px] flex-col gap-4 rounded border p-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-black p-2 text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;
