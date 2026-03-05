import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore.js";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
async function submitForm(data) {
  try {
    let res = await axios.post(
      "http://localhost:8080/user-api/login",
      data,
      { withCredentials: true }
    );

    if (res.status === 200) {
      toast.success(res.data.message);
      setUser(res.data.payload.user);
      navigate("/");
    }
  } catch (err) {
    if (err.response) {
      toast.error(err.response.data.message);
    }
    console.log(err, "err in login submit form [FRONTEND]...");
  }
}
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-50 mx-auto mt-5 p-3 border border-2 border-dark rounded"
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            className="form-control"
          />
          {errors.email && <p className="text-danger">Email is required</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            className="form-control"
          />
          {errors.password && (
            <p className="text-danger">Password is required</p>
          )}
        </div>
        <div className="text-center">
          <button className="bg-success" type="submit">
            Login
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <p className="text-center mt-3">Don't have an account ? </p>
          <Link to="/register" className="text-center d-block">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
