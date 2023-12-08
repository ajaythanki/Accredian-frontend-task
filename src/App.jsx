import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./components/Layout";
import { setUser } from "./redux/features/auth/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user.email);

  useEffect(() => {
    if (!user) {
      const userData = JSON.parse(window.localStorage.getItem("authUser"));
      if (userData?.email) {
        dispatch(setUser(userData));
      } else {
        navigate("/login");
      }
    }
  }, []);
  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <Link href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </div>
      <h1 style={{ textAlign: "center" }}>Vite + React</h1>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p style={{ textAlign: "center" }}>
        Click on the Vite and React logos to learn more
      </p>
    </Layout>
  );
}

export default App;