import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/MHKarami97/exercises-dataset/main/images/0716-oQRJYkC.jpg";

const ExerciseCard = ({ exercise }) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = exercise?.gifUrl;

  const finalImage =
    imageUrl && !imageError
      ? imageUrl
      : FALLBACK_IMAGE;

  return (
    <Link
      className="exercise-card"
      to={`/exercise/${exercise.id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <img
        src={finalImage}
        alt={exercise.name}
        loading="lazy"
        onError={(e) => {
          console.error(
            "Image failed:",
            exercise.id,
            finalImage
          );

          if (e.currentTarget.src !== FALLBACK_IMAGE) {
            e.currentTarget.src = FALLBACK_IMAGE;
          }
        }}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "contain",
          display: "block",
        }}
      />

      <Stack
        direction="row"
        sx={{
          mt: "10px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#FFA9A9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
            minWidth: "auto",
            px: "14px",
          }}
        >
          {exercise.bodyPart}
        </Button>

        <Button
          sx={{
            color: "#fff",
            background: "#FCC757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
            minWidth: "auto",
            px: "14px",
          }}
        >
          {exercise.target}
        </Button>
      </Stack>

      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{
          fontSize: {
            lg: "24px",
            xs: "20px",
          },
          textTransform: "capitalize",
        }}
        mt="11px"
        pb="10px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};
export default ExerciseCard;