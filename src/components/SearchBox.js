import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.up('xl')]: {
    marginLeft: theme.spacing(10),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
    [theme.breakpoints.up('md')]: {
      width: '50ch',
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
    [theme.breakpoints.up('lg')]: {
      width: '80ch',
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
    [theme.breakpoints.up('xl')]: {
      width: '100ch',
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
  },
}));


export default function SearchBox(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    // <form className="search" onSubmit={submitHandler} >
    //   <div className="row">
    //     <div className="form-group has-search">
    //       <span className="fa fa-search form-control-feedback"></span>
    //       <input type="text" className="form-control" placeholder="Search for Products,brands and more..." onChange={(e)=>setName(e.target.value)}></input>
    //       <button type="submit" className="search-submit"><i className="fa">Search</i></button>
    //     </div>
    //   </div>
    // </form>
    <form className="search" onSubmit={submitHandler} >
    <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search for Products,brands and more..."
      inputProps={{ "aria-label": "search" }} onChange={(e)=>setName(e.target.value)}
    />
  </Search>
  </form>
  );
}
