import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearUser, setUser } from "../redux/features/auth/userSlice";
import { useLogoutMutation } from "../redux/features/auth/hooks/useAuth";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync } = useLogoutMutation();
  const user = useSelector((state) => state.user.user.email);

  useEffect(() => {
    if (!user) {
      const userData = JSON.parse(window.localStorage.getItem("authUser"));
      if (userData?.email) {
        dispatch(setUser(userData));
        navigate("/");
      }
    }
  }, []);

  const handleLogout = () => {
    mutateAsync();
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ":hover": { cursor: "pointer" } }}
          >
            Logo
          </Typography>
          {!user ? (
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              <NavLink
                to={"/login"}
                style={({ isActive }) => {
                  return {
                    textDecoration: "none",
                    color: "white",
                    borderBottom: `${isActive ? "2px solid white" : ""}`,
                  };
                }}
              >
                Login
              </NavLink>
              <NavLink
                to={"/signup"}
                style={({ isActive }) => {
                  return {
                    textDecoration: "none",
                    color: "white",
                    borderBottom: `${isActive ? "2px solid white" : ""}`,
                  };
                }}
              >
                Signup
              </NavLink>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
