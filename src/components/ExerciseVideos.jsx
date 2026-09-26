import React from "react";
import { Box, Typography } from "@mui/material";

const ExerciseVideos = ({
  exerciseVideos,
  name,
}) => {
  return (
    <Box
      sx={{
        mt: {
          lg: "100px",
          xs: "50px",
        },
        px: {
          xs: "20px",
          lg: "80px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            lg: "44px",
            xs: "30px",
          },
          fontWeight: 700,
          mb: "40px",
          textAlign: "center",
        }}
      >
        Watch{" "}
        <span
          style={{
            color: "#FF2625",
            textTransform: "capitalize",
          }}
        >
          {name}
        </span>{" "}
        exercise videos
      </Typography>

      {exerciseVideos &&
      exerciseVideos.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: "30px",
          }}
        >
          {exerciseVideos.map(
            (item, index) => {
              const video =
                item?.video;

              if (!video?.videoId) {
                return null;
              }

              return (
                <Box
                  key={
                    video.videoId ||
                    index
                  }
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration:
                        "none",
                    }}
                  >
                    <img
                      src={
                        video
                          ?.thumbnails?.[0]
                          ?.url
                      }
                      alt={
                        video.title ||
                        name
                      }
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "12px",
                        display:
                          "block",
                      }}
                    />

                    <Typography
                      sx={{
                        mt: "12px",
                        fontSize:
                          "18px",
                        fontWeight: 600,
                        color:
                          "#000",
                      }}
                    >
                      {video.title}
                    </Typography>
                  </a>
                </Box>
              );
            }
          )}
        </Box>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            color: "#777",
            fontSize: "18px",
            py: "20px",
          }}
        >
          No exercise videos found.
        </Typography>
      )}
    </Box>
  );
};

export default ExerciseVideos;