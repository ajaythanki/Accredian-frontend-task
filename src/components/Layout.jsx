import { Box, CssBaseline, Link, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";

const Layout = ({children}) => {
  
  return (
    <>
      <NavBar/>
      <Toaster position="top-center" />
      <Container component="main" maxWidth="xs" style={{ paddingTop: "5rem", minHeight:'80vh'}}>
        <CssBaseline />
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout

function Footer(props) {
  return (
    <Box component={'div'} sx={{position:'sticky', bottom:0}}>

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ajaythanki/" target="_blank">
        Ajay Thanki
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Box>
  );
}