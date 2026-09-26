import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = exercise?.gifUrl;

  return (
    <Link
      className="exercise-card"
      to={`/exercise/${exercise.id}`}
      style={{
        textDecoration: "none",
      }}
    >
      {/* ================================= */}
      {/* EXERCISE IMAGE */}
      {/* ================================= */}

      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={exercise.name}
          loading="lazy"
          onError={(e) => {
            console.error(
              "Image failed:",
              exercise.id,
              imageUrl
            );

            setImageError(true);
          }}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5",
            color: "#777",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Image Not Available
        </div>
      )}

      {/* ================================= */}
      {/* TAGS */}
      {/* ================================= */}

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

      {/* ================================= */}
      {/* NAME */}
      {/* ================================= */}

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