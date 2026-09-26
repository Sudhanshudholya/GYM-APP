import React, { useState } from "react";
import { Typography, Stack, Button } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const {
    bodyPart,
    gifUrl,
    name,
    target,
    equipment,
  } = exerciseDetail;

  const [imageError, setImageError] = useState(false);

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: {
          lg: "row",
          xs: "column",
          alignItems: "center",
        },
        p: "20px",
      }}
    >
      {/* ================= IMAGE ================= */}
      
      <Stack
        sx={{
          width: {
            xs: "100%",
            sm: "500px",
            lg: "500px",
          },
          height: {
            xs: "350px",
            sm: "450px",
            lg: "500px",
            alignItems: "center",
          },
          justifyContent: "center",
          flexShrink: 0,
          background: "#fff",
        }}
      >
        {gifUrl && !imageError ? (
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="detail-image"
            onError={() => {
              console.log("GIF failed:", gifUrl);
              setImageError(true);
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography
            sx={{
              color: "#777",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Exercise image unavailable
          </Typography>
        )}
      </Stack>

      {/* ================= DETAILS ================= */}

      <Stack
        sx={{
          gap: {
            lg: "35px",
            xs: "20px",
          },
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              lg: "64px",
              md: "50px",
              xs: "30px",
               textTransform: "capitalize",
     alignItems: "center",
            },
          }}
          fontWeight={700}
  
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              lg: "24px",
              xs: "18px",
            },
            color: "#4F4C4C",
          }}
        >
          Exercises keep you strong.{" "}
          <span style={{ textTransform: "capitalize" }}>
            {name}
          </span>{" "}
          is one of the best exercises to target your{" "}
          <span style={{ textTransform: "capitalize" }}>
            {target}
          </span>
          . It will help you improve your mood and gain energy.
        </Typography>

        {extraDetail.map((item, index) => (
          <Stack
            key={`${item.name}-${index}`}
            direction="row"
            gap="24px"
            sx={{
            alignItems: "center",
  }}
          >
            <Button
              sx={{
                background: "#FFF2DB",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                minWidth: "100px",
              }}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </Button>

            <Typography
              sx={{
                fontSize: {
                  lg: "30px",
                  xs: "20px",
                },
                textTransform: "capitalize"
              }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;