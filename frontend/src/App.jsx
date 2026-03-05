import React, { useEffect } from "react";
import Login from "./pages/Login.jsx";
import axios from "axios";
import Routing from "./components/Routing.jsx";
import { useAuthStore } from "./store/authStore.js";

function App() {
  const setUser = useAuthStore((s) => s.setUser);
  async function me() {
    try {
      let res = await axios.get("http://localhost:8080/user-api/me", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(res.data.payload.user);
      }
    } catch (err) {
      console.log(err, "err in login submit form [FRONTEND]...");
    }
  }

  useEffect(() => {
    me();
  }, []);

  return (
    <div>
      <Routing></Routing>
    </div>
  );
}

export default App;
