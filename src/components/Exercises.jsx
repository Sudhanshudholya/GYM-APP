import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const MEDIA_DATA_URL =
  "https://raw.githubusercontent.com/MHKarami97/exercises-dataset/main/data/exercises.json";

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
        // ==========================================
        // 1. RAPIDAPI SE EXERCISES DATA
        // ==========================================

        let exercisesData;

        if (bodyPart === "all") {
          exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises",
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            exerciseOptions
          );
        }

        if (!Array.isArray(exercisesData)) {
          throw new Error("Invalid exercises data");
        }

        // ==========================================
        // 2. IMAGE/MEDIA DATA
        // ==========================================

        const mediaResponse = await fetch(MEDIA_DATA_URL);

        if (!mediaResponse.ok) {
          throw new Error("Unable to load exercise media data");
        }

        const mediaData = await mediaResponse.json();

        // ==========================================
        // 3. ID -> MEDIA ID MAP
        // ==========================================

        const mediaMap = new Map(
          mediaData.map((item) => [
            String(item.id),
            item.media_id,
          ])
        );

        // ==========================================
        // 4. RAPIDAPI DATA + IMAGE URL
        // ==========================================

        const exercisesWithImages = exercisesData.map((exercise) => {
          const exerciseId = String(exercise.id);

          const mediaId = mediaMap.get(exerciseId);

          return {
            ...exercise,

            mediaId,

            gifUrl: mediaId
              ? `https://raw.githubusercontent.com/MHKarami97/exercises-dataset/main/videos/${exerciseId}-${mediaId}.gif`
              : null,
          };
        });


        setExercises(exercisesWithImages);
      } catch (err) {
        console.error("Exercises API Error:", err);

        setExercises([]);

        setError(
          err.message ||
            "Unable to load exercises. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // ==========================================
  // SAFE EXERCISES
  // ==========================================

  const safeExercises = Array.isArray(exercises)
    ? exercises
    : [];

  // ==========================================
  // PAGINATION
  // ==========================================

  const indexOfLastExercise =
    currentPage * exercisesPerPage;

  const indexOfFirstExercise =
    indexOfLastExercise - exercisesPerPage;

  const currentExercises = safeExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({
      top: 1800,
      behavior: "smooth",
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <Loader />;
  }

  // ==========================================
  // ERROR
  // ==========================================

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
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#FF2625" }}
        >
          {error}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Please try again.
        </Typography>
      </Box>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (!safeExercises.length) {
    return <Loader />;
  }

  // ==========================================
  // UI
  // ==========================================

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
          <ExerciseCard
            key={exercise.id || idx}
            exercise={exercise}
          />
        ))}
      </Stack>

      <Stack
        sx={{
          mt: {
            lg: "114px",
            xs: "70px",
            alignItems: "center",
          },
        }}
      >
        {safeExercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(
              safeExercises.length / exercisesPerPage
            )}
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