"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const items = [
  "milk",
  "eggs",
  "juice",
  "bread",
  "chocolate",
  "cheese",
  "butter",
  "yogurt",
  "fruit",
  "vegetables",
];

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "primary.main",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 1, // padding 1 is 8px
        gap: 2,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          mt: 3,
          mb: 2,
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          color: "secondary.main",
        }}
      >
        Pantry Tracker
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 3,
          mb: 3,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "secondary.100",
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "secondary.100",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "tertiary.main",
                  },
                },
              }}
              fullWidth
              id="itemName"
              name="itemName"
              required
              placeholder="Enter item"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "secondary.100",
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "secondary.100",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "tertiary.main",
                  },
                },
              }}
              fullWidth
              id="itemQuantity"
              name="itemQuantity"
              defaultValue={1}
              placeholder="Enter quantity"
            />
          </Grid>
        </Grid>
        <IconButton aria-label="add" size="large">
          <IoIosAddCircle />
        </IconButton>
      </Box>

      {items.map((item) => (
        <Paper
          elevation={6}
          key={item}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "30vw",
            height: "10vh",
            p: 2,
            bgcolor: "secondary.main",
          }}
        >
          <Typography variant="h6" color="primary.main">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Typography>
          <IconButton aria-label="delete">
            <MdDelete />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
}
