import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Modal } from "@mui/base";
import { Backdrop, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";
import axios from "axios";

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -35%)",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "20vw",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [first, setfirst] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [data, setdata] = useState([]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const onDelete = async (id) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/staff/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      
    };

    const resp = await axios.request(config);
    if (resp.status === 200) {
      window.location.reload();
    }
  };


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/staff/all",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };;
    

    const fun = async () => {
      const resp = await axios.request(config);
      if (resp.status === 200) {
        setdata(resp.data);
      }
    };
    fun();
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: "45px" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          setfirst(true)
        }}
      >
        All Staff
      </MenuItem>
      
      <MenuItem
        onClick={(e) => {
          handleMenuClose();
          setToken(null);
          setUser(null);
          navigate("/enter");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                width: "50vw",
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Modal
        open={first}
        onClose={() => setfirst(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Box
          sx={{
            ...style,
            outline: "none",
            borderRadius: "5px",
            width: "80vw",
            // height:"80rem",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
          className="ease-in-out overflow-y-scroll scrollbar-track-slate-100   snap-y scroll-smooth  h-fit"
        >
          <div className="  flex flex-col justify-center ">
            <h2
              id="snap-start parent-modal-title scroll-mt-10"
              className="text-2xl  mt-3 mb-2 mx-auto"
            >
              Staff details
            </h2>
            <div className="flex flex-row justify-end mb-2">
              <button className="p-2 text-white bg-black font-bold rounded-md mr-2" onClick={()=>{
                navigate('/new')
              }}>Add</button>
            </div>
            {
              data.map(staff=>{
                console.log(staff)
                return (
                  <div
                    className="bg-slate-200 p-3 rounded-md text-black font-medium my-2 flex flex-row justify-between"
                    key={staff.id}
                  >
                    <span>{staff.name}</span>
                    <span>{staff.specialization}</span>
                    <button
                      className="bg-red-500 p-2 text-white  font-bold rounded-md"
                      onClick={() => onDelete(staff.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            }

           </div>
        </Box>
      </Modal>
    </Box>
  );
}
