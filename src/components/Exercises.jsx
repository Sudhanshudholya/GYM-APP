import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const MEDIA_DATA_URL =
  "https://raw.githubusercontent.com/MHKarami97/exercises-dataset/main/data/exercises.json";

const MEDIA_BASE_URL =
  "https://raw.githubusercontent.com/MHKarami97/exercises-dataset/main/";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercisesData = async () => {
      setLoading(true);
      setError("");
      setCurrentPage(1);

      try {
        let exercisesData;

        // GET EXERCISES FROM RAPIDAPI

        if (bodyPart === "all") {
          const bodyParts = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
            exerciseOptions,
          );

          const results = await Promise.all(
            bodyParts.map((part) =>
              fetchData(
                `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(
                  part,
                )}`,
                exerciseOptions,
              ),
            ),
          );

          exercisesData = results.flat();
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(
              bodyPart,
            )}`,
            exerciseOptions,
          );
        }

        if (!Array.isArray(exercisesData)) {
          throw new Error("Invalid exercises data");
        }

        // GET MEDIA DATA FROM GITHUB

        const mediaResponse = await fetch(MEDIA_DATA_URL);

        if (!mediaResponse.ok) {
          throw new Error("Unable to load exercise media data");
        }

        const mediaData = await mediaResponse.json();

        if (!Array.isArray(mediaData)) {
          throw new Error("Invalid media data");
        }

        // NORMALIZE EXERCISE NAME

        const normalizeName = (name = "") => {
          return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
        };

        //  CREATE ID -> MEDIA MAP

        const mediaMap = new Map(
          mediaData.map((item) => [String(item.id).padStart(4, "0"), item]),
        );

        //  CREATE NAME -> MEDIA MAP

        const mediaNameMap = new Map();

        mediaData.forEach((item) => {
          if (item.name) {
            mediaNameMap.set(normalizeName(item.name), item);
          }
        });

        // ADD GIF URL TO EXERCISES

        const exercisesWithImages = exercisesData.map((exercise) => {
          const exerciseId = String(exercise.id).padStart(4, "0");

          // First try ID matching
          let mediaItem = mediaMap.get(exerciseId);

          // If ID doesn't match, try name matching
          if (!mediaItem && exercise.name) {
            mediaItem = mediaNameMap.get(normalizeName(exercise.name));
          }

          let gifUrl = null;

          if (mediaItem?.gif_url) {
            gifUrl = `${MEDIA_BASE_URL}${mediaItem.gif_url}`;
          }

          return {
            ...exercise,
            gifUrl,
          };
        });

        setExercises(exercisesWithImages);
      } catch (err) {
        console.error("Exercises API Error:", err);
        setExercises([]);
        setError(err?.message || "Unable to load exercises. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // SAFE EXERCISES

  const safeExercises = Array.isArray(exercises) ? exercises : [];

  // PAGINATION

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = safeExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise,
  );

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 1800,
      behavior: "smooth",
    });
  };

  // LOADING

  if (loading) {
    return <Loader />;
  }

  // ERROR

  if (error) {
    return (
      <Box
        id="exercises"
        sx={{
          mt: { lg: "109px" },
          p: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#FF2625" }}>
          {error}
        </Typography>

        <Typography sx={{ mt: 2 }}>Please try again.</Typography>
      </Box>
    );
  }

  // EMPTY

  if (!safeExercises.length) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          mt: "100px",
        }}
      >
        No exercises found.
      </Typography>
    );
  }

  // UI

  return (
    <Box
      id="exercises"
      sx={{
        mt: { lg: "109px" },
        p: "20px",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontSize: {
            lg: "44px",
            xs: "30px",
          },
        }}
        mb="46px"
      >
        Showing Results
      </Typography>

      <Stack
        direction="row"
        sx={{
          gap: {
            lg: "107px",
            xs: "30px",
          },
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={exercise.id || idx} exercise={exercise} />
        ))}
      </Stack>

      <Stack
        sx={{
          mt: {
            lg: "114px",
            xs: "70px",
          },
          alignItems: "center",
        }}
      >
        {safeExercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(safeExercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
