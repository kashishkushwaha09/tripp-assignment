import { useState } from "react";
import API from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/users/register", formData);

      alert("Registration successful");

      navigate("/login");
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
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
        />

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

        <button className="bg-black p-2 text-white">Register</button>
      </form>
    </div>
  );
};

export default Register;
