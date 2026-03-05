import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {useAuthStore} from '../store/authStore';
function Register() {
  const navigate=useNavigate();
  let {register,handleSubmit,formState:{errors}}=useForm();
  const {setUser} = useAuthStore();

  async function submitForm(data) {
    try {
      let res=await axios.post('http://localhost:8080/user-api/register',data);
      if(res.status == 201) {
          toast.success(res.data.message);
          setUser(res.data.payload);
          navigate('/');
      } 
    }
    catch (err) {  
      if(err.response){
        console.log("sgfghh")
        toast.error(err.response.data.message);
      }
      console.log(err.message,'err in register submit form [FRONTEND]...');
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
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            {...register("userName", { required: true })}
            id="username"
            className="form-control"
          />
          {errors.userName && <p className="text-danger">Username is required</p>}
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
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
