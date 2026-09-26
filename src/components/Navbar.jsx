import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    <Stack
      component="nav"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: "100%",
        minHeight: { xs: "70px", md: "90px" },
        px: { xs: "18px", sm: "35px", md: "55px" },
        py: { xs: "12px", md: "16px" },
        background: "rgba(255, 255, 255, 0.96)",
        boxShadow: "0 4px 20px rgba(58, 18, 18, 0.06)",
        position: "relative",
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <img
          src={Logo}
          alt="Golds Gym"
          style={{
            width: "52px",
            height: "52px",
            objectFit: "contain",
          }}
        />
      </Link>

      {/* NAVIGATION */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          gap: { xs: "20px", sm: "30px", md: "45px" },
          fontFamily: "Alegreya",
          fontSize: { xs: "18px", sm: "21px", md: "24px" },
        }}
      >
        {/* HOME */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            padding: "8px 0",
            borderBottom: "3px solid #FF2625",
            transition: "0.3s ease",
          }}
        >
          Home
        </Link>

        {/* EXERCISES */}
        <a
          href="#exercises"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            padding: "8px 0",
            transition: "0.3s ease",
          }}
        >
          Exercises
        </a>
      </Stack>
    </Stack>
  );
};

export default Navbar;