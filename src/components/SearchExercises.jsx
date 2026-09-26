import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  exerciseOptions,
  fetchData,
} from "../utils/fetchData";

import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setError("");

        const bodyPartsData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions
        );

        if (Array.isArray(bodyPartsData)) {
          setBodyParts(["all", ...bodyPartsData]);
        } else {
          setBodyParts([]);
          setError("Unable to load body parts.");
        }
      } catch (error) {
        console.error("Body Parts API Error:", error);

        setBodyParts([]);
        setError(
          "Unable to load body parts. Please check your RapidAPI key."
        );
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return;

    try {
      setError("");

      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );

      if (!Array.isArray(exercisesData)) {
        setExercises([]);
        setError("Unable to search exercises.");
        return;
      }

      const searchedExercises = exercisesData.filter((item) => {
        const name = item?.name?.toLowerCase() || "";
        const target = item?.target?.toLowerCase() || "";
        const equipment = item?.equipment?.toLowerCase() || "";
        const itemBodyPart = item?.bodyPart?.toLowerCase() || "";

        return (
          name.includes(searchValue) ||
          target.includes(searchValue) ||
          equipment.includes(searchValue) ||
          itemBodyPart.includes(searchValue)
        );
      });

      window.scrollTo({
        top: 1800,
        left: 100,
        behavior: "smooth",
      });

      setSearch("");
      setExercises(searchedExercises);
    } catch (error) {
      console.error("Search API Error:", error);

      setExercises([]);
      setError(
        "Unable to search exercises. Please check your RapidAPI access."
      );
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        mt: "37px",
        justifyContent: "center",
        p: "20px",
      }}
    >
      <Typography
        fontWeight={700}
        sx={{
          fontSize: {
            lg: "44px",
            xs: "30px",
          },
          textAlign: "center",
        }}
        mb="49px"
      >
        Awesome Exercises You
        <br />
        Should Know
      </Typography>

      <Box
        sx={{
          position: "relative",
          mb: "72px",
          width: {
            lg: "1170px",
            xs: "100%",
          },
        }}
      >
        <TextField
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "40px",

            "& input": {
              fontWeight: "700",
              border: "none",
            },

            "& fieldset": {
              border: "none",
            },
          }}
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase())
          }
          placeholder="Search Exercises"
          type="text"
        />

        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: {
              lg: "173px",
              xs: "80px",
            },
            height: "56px",
            position: "absolute",
            right: "0px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: {
              lg: "20px",
              xs: "14px",
            },
            borderRadius: "28px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {error && (
        <Typography
          sx={{
            color: "#FF2625",
            mb: 3,
            textAlign: "center",
          }}
        >
          {error}
        </Typography>
      )}

      {bodyParts.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            p: "20px",
          }}
        >
          <HorizontalScrollbar
            data={bodyParts}
            bodyParts
            setBodyPart={setBodyPart}
            bodyPart={bodyPart}
          />
        </Box>
      )}
    </Stack>
  );
};

export default SearchExercises;