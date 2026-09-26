import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";

import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
  const { id } = useParams();

  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setLoading(true);

        const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";

        // =========================================
        // 1. EXERCISE DETAIL
        // =========================================

        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions,
        );

        console.log("Exercise Detail:", exerciseDetailData);

        // =========================================
        // 2. EXERCISE GIF
        // =========================================

        let gifUrl = "";

        try {
          const datasetResponse = await fetch(
            "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/data/exercises.json",
          );

          const dataset = await datasetResponse.json();

          const mediaExercise = dataset.find(
            (item) => String(item.id) === String(id),
          );

          if (mediaExercise?.gif_url) {
            gifUrl = `https://github.com/hasaneyldrm/exercises-dataset/raw/refs/heads/main/${mediaExercise.gif_url}`;

            console.log("GIF URL:", gifUrl);
          }
        } catch (error) {
          console.error("GIF Error:", error);
        }

        const finalExercise = {
          ...exerciseDetailData,
          gifUrl,
        };

        setExerciseDetail(finalExercise);

        // =========================================
        // 3. YOUTUBE VIDEOS
        // =========================================

        try {
          const apiKey = import.meta.env.VITE_YOUTUBE_RAPID_API_KEY;

          if (!apiKey) {
            throw new Error("VITE_YOUTUBE_RAPID_API_KEY is missing in .env");
          }

          const searchQuery = `${exerciseDetailData.name} exercise`;

          const youtubeUrl =
            "https://www.googleapis.com/youtube/v3/search" +
            `?part=snippet` +
            `&q=${encodeURIComponent(searchQuery)}` +
            `&type=video` +
            `&maxResults=4` +
            `&regionCode=IN` +
            `&key=${apiKey}`;

          console.log("YouTube URL:", youtubeUrl.replace(apiKey, "HIDDEN"));

          const response = await fetch(youtubeUrl);

          const youtubeData = await response.json();

          if (!response.ok) {
            console.error("YouTube API Error:", youtubeData);

            throw new Error(
              youtubeData?.error?.message || "YouTube API request failed",
            );
          }

          console.log("YouTube Data:", youtubeData);

          const formattedVideos = (youtubeData.items || []).map((item) => ({
            video: {
              videoId: item.id.videoId,

              title: item.snippet.title,

              thumbnails: [
                {
                  url:
                    item.snippet.thumbnails.high?.url ||
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url,
                },
              ],
            },
          }));

          setExerciseVideos(formattedVideos);
        } catch (error) {
          console.error("YouTube API Error:", error);

          setExerciseVideos([]);
        }

        // =========================================
        // 4. TARGET MUSCLE EXERCISES
        // =========================================

        try {
          const targetData = await fetchData(
            `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
            exerciseOptions,
          );

          const targetExercisesWithGif = await getExercisesWithGif(
            targetData || [],
          );

          setTargetMuscleExercises(targetExercisesWithGif);
        } catch (error) {
          console.error("Target Exercises Error:", error);

          setTargetMuscleExercises([]);
        }

        // =========================================
        // 5. EQUIPMENT EXERCISES
        // =========================================

        try {
          const equipmentData = await fetchData(
            `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
            exerciseOptions,
          );

          const equipmentExercisesWithGif = await getExercisesWithGif(
            equipmentData || [],
          );

          setEquipmentExercises(equipmentExercisesWithGif);
        } catch (error) {
          console.error("Equipment Exercises Error:", error);

          setEquipmentExercises([]);
        }
      } catch (error) {
        console.error("Exercise Detail Error:", error);

        setExerciseDetail(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExercisesData();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#FF2625" }} />
      </Box>
    );
  }

  // =========================================
  // NO DATA
  // =========================================

  if (!exerciseDetail) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          mt: "100px",
          fontSize: "24px",
          textTransform: "capitalize",
        }}
      >
        Exercise not found
      </Typography>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <Box
      sx={{
        mt: {
          lg: "96px",
          xs: "60px",
        },
      }}
    >
      <Detail exerciseDetail={exerciseDetail} />

      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />

      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;

const getExercisesWithGif = async (exercises) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/data/exercises.json",
    );

    if (!response.ok) {
      throw new Error("Exercise dataset could not be loaded");
    }

    const dataset = await response.json();

    return exercises.map((exercise) => {
      const mediaExercise = dataset.find(
        (item) => String(item.id) === String(exercise.id),
      );

      const gifUrl = mediaExercise?.gif_url
        ? `https://github.com/hasaneyldrm/exercises-dataset/raw/refs/heads/main/${mediaExercise.gif_url}`
        : "";

      return {
        ...exercise,
        gifUrl,
      };
    });
  } catch (error) {
    console.error("GIF mapping error:", error);

    return exercises;
  }
};
