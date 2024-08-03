"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Typewriter from "typewriter-effect"; // Import Typewriter effect

export default function LandingPage() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "primary.main",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, md: 4 }, // Responsive padding
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{
          mt: 3,
          mb: 1,
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          color: "secondary.main",
          transform: "translateZ(0)",
          transition: "transform 0.4s ease-out",
          "&:hover": {
            transform: "translateY(-7px) translateZ(0)",
          },
          letterSpacing: "2px",
          textAlign: "center", // Center align for better responsiveness
        }}
      >
        Welcome to Pantry Buddy!
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "secondary.main",
          mb: 5,
          letterSpacing: "2px",
          textAlign: "center",
        }}
      >
        Pantry Management made easy.
      </Typography>

      <Box
        sx={{
          width: "100%",
          mb: 10,
          display: "flex",
          justifyContent: "center",
          color: "tertiary.main", // Ensure color is visible
          fontSize: "2rem", // Adjust font size
        }}
      >
        <Typewriter
          options={{
            strings: [
              "Bid farewell to food waste with your ultimate pantry companion.",
              "Save time, save money.",
              "Plan meals with ease.",
            ],
            autoStart: true,
            loop: true,
            delay: 75, // Adjust typing speed
          }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: "400px",
          maxHeight: "400px",
          width: "100%", // Make it responsive
          height: "auto",
          transform: "translateZ(0)",
          transition: "transform 1s ease-out",
          "&:hover": {
            transform: "translateY(-10px) translateZ(0)",
          },
          mb: 5,
        }}
      >
        <Image
          src="/images/pantry.png"
          alt="pantry"
          width={512}
          height={512}
          className="responsive"
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{
          width: { xs: "80%", sm: "60%", md: "40%" }, // Responsive width
          minHeight: "5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 10,
          borderRadius: "10px",
          bgcolor: "secondary.main",
          "&:hover": {
            bgcolor: "tertiary.main",
          },
          color: "primary.main",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          "&:hover": {
            bgcolor: "tertiary.main",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
          },
        }}
      >
        Sign In
      </Button>
    </Box>
  );
}
