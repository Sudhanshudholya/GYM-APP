import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HeroBannerImage from "../assets/images/banner.png";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        mt: {
          lg: "120px",
          md: "80px",
          xs: "50px",
        },

        px: {
          lg: "40px",
          md: "30px",
          xs: "20px",
        },

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* HERO CONTENT */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          flexDirection: {
            xs: "column",
            lg: "row",
          },

          gap: {
            xs: "40px",
            lg: "20px",
          },

          width: "100%",
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "50%",
            },

            position: "relative",

            zIndex: 2,

            py: {
              lg: "60px",
              xs: "20px",
            },
          }}
        >
          <Typography
            color="#FF2625"
            fontWeight="600"
            sx={{
              fontSize: {
                xs: "20px",
                sm: "24px",
                lg: "26px",
              },
            }}
          >
            Fitness Club
          </Typography>

          <Typography
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "34px",
                sm: "40px",
                lg: "44px",
              },

              lineHeight: {
                xs: "1.2",
                lg: "1.25",
              },

              mt: "25px",
              mb: "20px",
            }}
          >
            Sweat, Smile
            <br />
            And Repeat
          </Typography>

          <Typography
            fontFamily="Alegreya"
            sx={{
              fontSize: {
                xs: "18px",
                lg: "22px",
              },

              lineHeight: {
                xs: "28px",
                lg: "35px",
              },

              maxWidth: "500px",
            }}
          >
            Check out the most effective exercises personalized to you
          </Typography>

          <Stack>
            <a
              href="#exercises"
              style={{
                marginTop: "40px",
                textDecoration: "none",
                width: "200px",
                textAlign: "center",
                background: "#FF2625",
                padding: "14px",
                fontSize: "20px",
                color: "white",
                borderRadius: "4px",
                display: "block",
              }}
            >
              Explore Exercises
            </a>
          </Stack>

          {/* BACKGROUND TEXT */}
          <Typography
            fontWeight={600}
            color="#FF2625"
            sx={{
              opacity: 0.08,
              position: "absolute",
              left: "0",
              top: "230px",
              fontSize: {
                lg: "180px",
                md: "140px",
              },
              display: {
                xs: "none",
                md: "block",
              },
              whiteSpace: "nowrap",
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            Exercise
          </Typography>
        </Box>

        {/* RIGHT SIDE IMAGE */}
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "50%",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={HeroBannerImage}
            alt="hero-banner"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              maxWidth: "100%",
              borderRadius: {
                xs: "0 0 0 50px",
                md: "0 0 0 70px",
                lg: "0 0 0 80px",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;