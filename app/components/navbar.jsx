"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const theme = useTheme();
  const pathname = usePathname();

  //using this variables to determine when to show which links in the navbar
  const isHome = pathname?.includes("/home");
  const isProfile = pathname?.includes("/profile");
  const isLandingPage = pathname === "/";

  return (
    <Box
      sx={{
        height: 40,
        width: "100%",
        p: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "primary.main",
        borderBottom: "2px solid",
        borderColor: "secondary.main",
      }}
    >
      <ul style={{ display: "flex" }}>
        <li className="p-2 cursor-pointer">
          {!isHome && (
            <Link
              href="/home"
              style={{
                color: theme.palette.secondary.main,
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          )}
        </li>
        <li className="p-2 cursor-pointer">
          {!isProfile && (
            <Link
              href="/profile"
              style={{
                color: theme.palette.secondary.main,
                textDecoration: "none",
              }}
            >
              Profile
            </Link>
          )}
        </li>
      </ul>
      <ul className="flex">
        {isLandingPage && (
          <Button
            variant="contained"
            sx={{
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
        )}
      </ul>
    </Box>
  );
}
