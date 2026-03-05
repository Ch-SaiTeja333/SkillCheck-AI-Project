import React from "react";
import {useAuthStore} from "../store/authStore.js";
import {Link} from 'react-router-dom';
function Profile() {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <h1 className="text-center mt-5">Profile</h1>
      {
        user ? (
          <div className="container text-center mt-5">
            <h2>Email: {user.email}</h2>
          </div>
        ) : (
          <div className="container text-center mt-5">
            <h2>Please login to view your profile</h2>
          </div>
        )
      }
     <div className="container text-center mt-5 fw-bold fs-1">   
      <Link to='/logout'> <button className='bg-success'>Logout</button> </Link>
     </div>
    </div>
  );
}

export default Profile;
