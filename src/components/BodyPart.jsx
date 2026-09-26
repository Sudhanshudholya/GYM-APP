import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../assets/icons/gym.png";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isActive = bodyPart === item;

  return (
    <Stack
    className="bodyPart-card"
    sx={{
        alignItems:"center",
        background: "#fff",
        justifyContent:"center",
        borderRadius: "20px",
        width: { xs: "180px", sm: "220px", md: "250px" },
        height: { xs: "200px", sm: "230px", md: "250px" },
        cursor: "pointer",
        gap: "25px",
        borderTop: isActive
          ? "5px solid #FF2625"
          : "5px solid transparent",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        },
      }}
      onClick={() => {
        setBodyPart(item);

        window.scrollTo({
          top: 1800,
          left: 100,
          behavior: "smooth",
        });
      }}
    >
      <img
        src={Icon}
        alt="gym"
        style={{
          width: "70px",
          height: "70px",
          objectFit: "contain",
        }}
      />

      <Typography
        sx={{
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: "bold",
          fontFamily: "Alegreya",
          color: "#3A1212",
          textTransform: "capitalize",
        }}
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;